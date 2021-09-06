import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Like,
    ThumbUp,
} from '../../../../common/components/interactive-elements/reactions/PresenterReaction'
import { RootState } from '../../../../store'
import { Reactions } from '../../../../types/reactions'
import { pullReaction } from './store'

export const ReactionOverlay = () => {
    const { connectionStatus, reactions } = useSelector(
        (state: RootState) => state.reactions
    )
    const dispatch = useDispatch()
    const [currentReaction, setCurrentReaction] = useState<Reactions | null>(
        null
    )

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentReaction(null)
            if (reactions.length > 0) {
                setCurrentReaction(reactions[0])
                dispatch(pullReaction())
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    let body: JSX.Element | null = null
    switch (currentReaction) {
        case Reactions.LIKE:
            body = <ThumbUp />
            break
        case Reactions.LOVE:
            body = <Like />
            break
    }

    return <div className='reaction-overlay'>{body}</div>
}
