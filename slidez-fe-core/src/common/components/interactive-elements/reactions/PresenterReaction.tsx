import React from 'react'
import like from '../../../../assets/svgs/like_reaction.svg'
import thumb_up from '../../../../assets/svgs/thumb_up_reaction.svg'
import './reaction.scss'
import 'animate.css'

const reaction = (src: string) => (
    <img src={src} className='animate__animated animate__slideInUp' />
)

export const Like = () => reaction(like)

export const ThumbUp = () => reaction(thumb_up)
