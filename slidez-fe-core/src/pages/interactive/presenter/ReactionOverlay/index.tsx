import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Like,
    ThumbUp,
} from '../../../../common/components/interactive-elements/reactions/PresenterReaction'
import { initReactionWebSocketSession } from './store'
import { RootState } from '../../../../store'
import { Reactions } from '../../../../types/reactions'
import { pullReaction } from './store'
import styles from './reactionOverlayPage.module.scss'
import { useParams } from 'react-router-dom'

const getLeftOffset = () => {
    const sign = Math.floor(Math.random() * 3 - 1)
    if (sign == -1) {
        return Math.floor(Math.random() * 100) * -1
    }
    if (sign == 0) {
        return 0
    }

    return Math.floor(Math.random() * 100)
}

const getLeftPosition = () => {
    return Math.random() * 25 + 48
}

const getMargin = () => {
    return Math.random() * 100 - 50
}

export const ReactionOverlay = () => {
    const { link } = useParams<{ link: string }>()
    const { connectionStatus, reactions } = useSelector(
        (state: RootState) => state.reactions
    )
    const [reactionElements, setReactionElements] = useState<JSX.Element[]>([])
    const [counter, setCounter] = useState<number>(1)

    const dispatch = useDispatch()

    const getJSXElementForReaction = (
        reaction: Reactions,
        key: number,
        leftAnimation: string,
        leftPosition: string,
        topOffset: string
    ): JSX.Element => {
        switch (reaction) {
            case Reactions.LIKE:
                return (
                    <div
                        className={`${styles.reactionContainer}`}
                        id='reaction'
                        style={{ left: leftPosition }}
                        key={key}
                    >
                        <ThumbUp
                            styles={{
                                left: leftAnimation,
                                top: topOffset,
                            }}
                        />
                    </div>
                )
            // case Reactions.LOVE: // Uncomment if there will be more reactions
            default:
                return (
                    <div
                        className={`${styles.reactionContainer}`}
                        style={{ left: leftPosition }}
                        key={key}
                    >
                        <Like
                            styles={{
                                left: leftAnimation,
                                top: topOffset,
                            }}
                        />
                    </div>
                )
        }
    }

    useEffect(() => {
        dispatch(initReactionWebSocketSession(link))
    }, [])

    const processReaction = () => {
        const number = counter
        setCounter(counter + 1)
        const currentReaction = reactions[0]
        dispatch(pullReaction())
        const element = getJSXElementForReaction(
            currentReaction,
            counter,
            `${getLeftOffset()}%`,
            `${getLeftPosition()}%`,
            `${getMargin()}px`
        )
        setReactionElements([...reactionElements, element])

        setTimeout(() => {
            const stayedReactions = reactionElements.filter(
                (el) => el.key != number
            )
            console.log(number, reactionElements.length, stayedReactions.length)
            // !!!! Here reactions should be deleted
            // setReactionElements(stayedReactions)
        }, 3000)
    }

    useEffect(() => {
        if (reactions.length === 0) {
            return
        }

        processReaction()
    }, [reactions])

    useEffect(() => {
        const bgColor = document.body.style.backgroundColor
        const overflow = document.body.style.overflow
        document.body.style.backgroundColor = 'transparent'
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.backgroundColor = bgColor
            document.body.style.overflow = overflow
        }
    })

    return <div className={styles.reactionOverlay}>{reactionElements}</div>
}
