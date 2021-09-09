import React, { CSSProperties } from 'react'
import like from '../../../../assets/svgs/reactions/heart.svg'
import thumb_up from '../../../../assets/svgs/reactions/thumbUp.svg'
import 'animate.css'

interface ReactionStyles {
    left: string
}

const reaction = (src: string, left: string) => (
    <img src={src} width={50} style={{ left: left }} />
)

export const Like = ({ left }: ReactionStyles) => reaction(like, left)

export const ThumbUp = ({ left }: ReactionStyles) => reaction(thumb_up, left)
