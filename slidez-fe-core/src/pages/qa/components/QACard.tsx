import * as React from 'react'
import unlikedIconRegular from '../../../assets/svgs/thumbs-up-regular.svg'
import likedIconSolid from '../../../assets/svgs/thumbs-up-solid.svg'
import './QACard.scss'
import { MouseEventHandler } from 'react'

type QACardProps = {
    children: string
    author: string
    likes: number
    likeClick: MouseEventHandler
    isLiked: boolean
}

export default function QACard(props: QACardProps) {
    const { children, author, likes, likeClick, isLiked } = props
    const iconImage = isLiked ? likedIconSolid : unlikedIconRegular
    const iconClasss = isLiked ? 'liked-icon' : 'unliked-icon'

    return (
        <div className='card'>
            <div>
                <div className='author'>{author}</div>
                <div className='pool-content'>{children}</div>
            </div>
            <div className='reaction'>
                <button onClick={likeClick} className='like-btn'>
                    <img className={iconClasss} src={iconImage}></img>
                    {likes}
                </button>
            </div>
        </div>
    )
}
