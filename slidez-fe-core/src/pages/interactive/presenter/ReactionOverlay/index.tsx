import React, { CSSProperties, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    ThumbUpDom,
    LikeDom,
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

const getLeftOffset = () => {
    const sign = Math.floor(Math.random() * 3 - 1)
    if (sign == -1) {
        return Math.floor(Math.random() * 130) * -1
    }
    if (sign == 0) {
        return 0
    }

    return Math.floor(Math.random() * 130)
}

const getLeftPosition = () => {
    return Math.random() * 25 + 48
}

const getTopOffset = () => {
    return Math.random() * 100 - 50
}

export const ReactionOverlay = () => {
    const { link } = useParams<{ link: string }>()
    const { connectionStatus, reactions } = useSelector(
        (state: RootState) => state.reactions
    )
    const overlayContainer = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch()

    const createReactionDomElement = (
        reaction: Reactions,
        leftPosition: string,
        leftOffset: string,
        topOffset: string
    ) => {
        const divElement = document.createElement('div')
        divElement.className = styles.reactionContainer
        divElement.style.left = leftPosition
        console.log(leftOffset)
        const style: CSSProperties = {
            left: leftOffset,
            marginTop: topOffset,
        }

        const reactionElement =
            reaction !== Reactions.LIKE ? LikeDom(style) : ThumbUpDom(style)
        divElement.appendChild(reactionElement)
        return divElement
    }

    useEffect(() => {
        dispatch(initReactionWebSocketSession(link))
    }, [])

    //web socket effects
    const processReaction = () => {
        const currentReaction = reactions[0]
        dispatch(pullReaction())

        const reactionElement = createReactionDomElement(
            currentReaction,
            `${getLeftPosition()}%`,
            `${getLeftOffset()}%`,
            `${getTopOffset()}px`
        )

        overlayContainer.current?.appendChild(reactionElement)

        setTimeout(() => {
            overlayContainer.current?.removeChild(reactionElement)
        }, 3000)
    }

    useEffect(() => {
        if (reactions.length === 0) {
            return
        }

        processReaction()
    }, [reactions])

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

    return <div className={styles.reactionOverlay} ref={overlayContainer} />
}
