import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAddReactionEvent } from '../../../../containers/session/event/FrontendEvent'
import { addReaction } from '../../../../containers/session/store/store'
import { Reactions } from '../../../../types/reactions'
import styles from './styles.module.scss'
import { ReactComponent as HeartIcon } from '../../../../assets/svgs/reactions/heart.svg'
import { ReactComponent as ThumbUpIcon } from '../../../../assets/svgs/reactions/thumbUp.svg'
import { useDetectOutsideClick } from '../../../../pages/dashboard/useDetectOutsideClick'

export type ParticipantReactionProps = {
    link: string
}

const makeReactionHandler =
    (dispatch: any, link: string, reaction: Reactions, username: string) =>
    () => {
        dispatch(addReaction(createAddReactionEvent(link, reaction, username)))
    }

const ParticipantReactionButton: React.FC<ParticipantReactionProps> = ({
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

    const openedBlockRef = useRef<HTMLInputElement>(null)
    const [isOpened, setIsOpened] = useDetectOutsideClick(openedBlockRef, false)
    const isDesktop = window.innerWidth > 800

    const toggleOpenClick = () => {
        openedBlockRef.current?.blur()
        setIsOpened(true)
    }

    const defaultIconSize = 20
    //TODO: Add disabling input for one minute after sending a reaction
    return (
        <div className={styles.reactions}>
            {isOpened || isDesktop ? (
                <div className={styles.openedBlock} ref={openedBlockRef}>
                    <button onClick={handleLikeClick}>
                        <ThumbUpIcon
                            width={defaultIconSize}
                            height={defaultIconSize}
                        />
                    </button>
                    <button onClick={handleLoveClick}>
                        <HeartIcon
                            width={defaultIconSize}
                            height={defaultIconSize}
                        />
                    </button>
                </div>
            ) : (
                ''
            )}
            <div
                className={`${styles.closedBlock} ${
                    isOpened || isDesktop ? styles.hidden : ''
                }`}
                onClick={toggleOpenClick}
            >
                <HeartIcon width={defaultIconSize} height={defaultIconSize} />
            </div>
        </div>
    )
}

export default ParticipantReactionButton
