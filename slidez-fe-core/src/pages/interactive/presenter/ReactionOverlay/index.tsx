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
import { SLIDE_CHANGE_EVENT } from 'slidez-shared'
import { requestEndCurrentInteraction } from '../../../../containers/session/store/store'
import { createEndInteractionRequest } from '../../../../containers/session/event/FrontendEvent'

export const ReactionOverlay = () => {
    const { link } = useParams<{ link: string }>()
    const { connectionStatus, reactions } = useSelector(
        (state: RootState) => state.reactions
    )
    const [left, setLeft] = useState(Math.random() * 17 + 51)

    const dispatch = useDispatch()
    const [currentReaction, setCurrentReaction] = useState<Reactions | null>(
        null
    )

    useEffect(() => {
        dispatch(initReactionWebSocketSession(link))
    }, [])

    //web socket effects
    useEffect(() => {
        //if we have a reaction - don't poll
        if (currentReaction || reactions.length === 0) {
            return
        }
        console.log('au', currentReaction)
        setCurrentReaction(reactions[0])
        dispatch(pullReaction())
        setTimeout(() => {
            setLeft(Math.random() * 20 + 50)
            setCurrentReaction(null)
        }, 1300)
    }, [reactions, currentReaction])

    //DOM effects
    useEffect(() => {
        const bgColor = document.body.style.backgroundColor
        const overflow = document.body.style.overflow
        document.body.style.backgroundColor = 'transparent'
        document.body.style.overflow = 'hidden'

        window.addEventListener('message', (event) => {
            const slideId = event.data
            console.log(event)
            if (typeof slideId !== 'string') {
                return
            }

            //don't emit end event if new slide is slidez to not end freshly started event
            if (slideId.startsWith('slidez')) {
                return
            }

            dispatch(
                requestEndCurrentInteraction(createEndInteractionRequest(link))
            )
        })

        return () => {
            document.body.style.backgroundColor = bgColor
            document.body.style.overflow = overflow
        }
    }, [])

    let body: JSX.Element | null = null
    switch (currentReaction) {
        case Reactions.LIKE:
            body = (
                <div className={`${styles.reactionContainer}`}>
                    <ThumbUp />
                </div>
            )
            break
        case Reactions.LOVE:
            body = (
                <div
                    className={`${styles.reactionContainer}`}
                    style={{ left: `${left}%` }}
                >
                    <Like />
                </div>
            )
            break
    }

    return <div className={styles.reactionOverlay}>{body}</div>
}
