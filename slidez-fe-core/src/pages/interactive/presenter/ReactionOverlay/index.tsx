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

export const ReactionOverlay = () => {
    const { link } = useParams<{ link: string }>()
    const { connectionStatus, reactions } = useSelector(
        (state: RootState) => state.reactions
    )
    const dispatch = useDispatch()
    const [currentReaction, setCurrentReaction] = useState<Reactions | null>(
        null
    )

    useEffect(() => {
        dispatch(initReactionWebSocketSession(link))
    }, [])

    useEffect(() => {
        //if we have a reaction - don't poll
        if (currentReaction || reactions.length === 0) {
            return
        }

        setCurrentReaction(reactions[0])
        dispatch(pullReaction())
        setTimeout(() => {
            setCurrentReaction(null)
        }, 1300)
    }, [reactions, currentReaction])

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

    let body: JSX.Element | null = null
    switch (currentReaction) {
        case Reactions.LIKE:
            body = <ThumbUp />
            break
        case Reactions.LOVE:
            body = <Like />
            break
    }

    return (
        <div className={styles.reactionOverlay}>
            <div className={`${styles.reactionContainer} fadeOut`}>{body}</div>
        </div>
    )
}
