import * as React from 'react'
import like_icon from '../../../assets/svgs/thumbs-up-regular.svg'
import like_icon_solid from '../../../assets/svgs/thumbs-up-solid.svg'
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
    const icon = isLiked ? like_icon_solid : like_icon
    return (
        <div className='card'>
            <div>
                <div className='author'>{author}</div>
                <div className='pool-content'>{children}</div>
            </div>
            <div className='reaction'>
                <button onClick={likeClick} className='like-btn'>
                    <a href=''>
                        <img className='like-icon' src={icon}></img>
                    </a>
                    {likes}
                </button>
            </div>
        </div>
    )
}
