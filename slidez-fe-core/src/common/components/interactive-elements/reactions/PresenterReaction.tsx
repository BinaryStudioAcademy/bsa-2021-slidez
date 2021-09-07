import React from 'react'
import like from '../../../../assets/svgs/reactions/heart.svg'
import thumb_up from '../../../../assets/svgs/reactions/thumbUp.svg'
import 'animate.css'

const reaction = (src: string) => <img src={src} width={50} />

export const Like = () => reaction(like)

export const ThumbUp = () => reaction(thumb_up)
