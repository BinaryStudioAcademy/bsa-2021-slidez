import * as React from 'react'
import unlikedIconRegular from '../../../assets/svgs/thumbs-up-regular.svg'
import likedIconSolid from '../../../assets/svgs/thumbs-up-solid.svg'
import './QACard.scss'
import { MouseEventHandler } from 'react'

type QACardProps = {
    children: string
    author: string
    likeCount: number
    likeClick: MouseEventHandler
    isLiked: boolean
}

export default function QACard({
    children,
    author,
    likeCount,
    likeClick,
    isLiked,
}: QACardProps) {
    const iconImage = isLiked ? likedIconSolid : unlikedIconRegular
    const iconClasss = isLiked ? 'liked-icon' : 'unliked-icon'

    return (
        <div className='card'>
            <div>
                <div className='author'>{author.trim() || 'Anonymous'}</div>
                <div className='qa-question-content'>{children}</div>
            </div>
            <div className='reaction'>
                <button onClick={likeClick} className='like-btn'>
                    <img className={iconClasss} src={iconImage} />
                    {likeCount}
                </button>
            </div>
        </div>
    )
}
