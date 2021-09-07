import React from 'react'
import { useDispatch } from 'react-redux'
import { createAddReactionEvent } from '../../../../containers/session/event/FrontendEvent'
import { addReaction } from '../../../../containers/session/store/store'
import { Reactions } from '../../../../types/reactions'

export type ParticipantReactionProps = {
    link: string
}

const makeReactionHandler =
    (dispatch: any, link: string, reaction: Reactions, username: string) =>
    () => {
        dispatch(addReaction(createAddReactionEvent(link, reaction, username)))
    }

const ParticipantReactionButton: React.FC<ParticipantReactionProps> = ({
    // eslint-disable-next-line react/prop-types
    link,
}) => {
    const dispatch = useDispatch()
    const handleLikeClick = React.useCallback(
        makeReactionHandler(dispatch, link, Reactions.LIKE, ''),
        [dispatch, link]
    )
    const handleLoveClick = React.useCallback(
        makeReactionHandler(dispatch, link, Reactions.LOVE, ''),
        [dispatch, link]
    )
    //TODO: Add disabling input for one minute after sending a reaction
    return (
        <div>
            <button onClick={handleLikeClick}>👍</button>
            <button onClick={handleLoveClick}>❤️</button>
        </div>
    )
}

export default ParticipantReactionButton
