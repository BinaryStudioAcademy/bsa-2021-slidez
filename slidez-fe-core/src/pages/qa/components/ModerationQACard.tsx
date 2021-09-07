import React from 'react'
import unlikedIconRegular from '../../../assets/svgs/thumbs-up-regular.svg'
import './QACard.scss'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type QACardProps = {
    children: string
    author: string
    likeCount: number
    isVisible: boolean
    onRevealClick: () => void
}

const ModerationQACard = ({
    children,
    author,
    likeCount,
    isVisible,
    onRevealClick,
}: QACardProps) => {
    return (
        <div className='card'>
            <div>
                <div className='author'>{author.trim() || 'Anonymous'}</div>
                <div className='qa-question-content'>{children}</div>
            </div>
            <div className='element-in-stack-holder'>
                <FontAwesomeIcon
                    className='change-visibility-icon'
                    icon={isVisible ? faEyeSlash : faEye}
                    onClick={onRevealClick}
                />
                <div className='moderation-like-count-holder'>
                    <img className='unliked-icon' src={unlikedIconRegular} />
                    {` ${likeCount}`}
                </div>
            </div>
        </div>
    )
}

export default ModerationQACard
