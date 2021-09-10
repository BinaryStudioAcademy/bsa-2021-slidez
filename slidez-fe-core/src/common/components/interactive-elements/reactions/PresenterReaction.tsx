import React, { CSSProperties } from 'react'
import like from '../../../../assets/svgs/reactions/heart.svg'
import thumb_up from '../../../../assets/svgs/reactions/thumbUp.svg'
import 'animate.css'

interface ReactionStyles {
    styles: CSSProperties
}

const reaction = (src: string, styles: CSSProperties) => (
    <img src={src} width={50} style={styles} />
)

export const Like = ({ styles }: ReactionStyles) => reaction(like, styles)

export const ThumbUp = ({ styles }: ReactionStyles) =>
    reaction(thumb_up, styles)

const createReactionDom = (imgSrc: string) => (styles: CSSProperties) => {
    const element = document.createElement('img')
    element.src = imgSrc
    element.width = 50
    element.style.left = String(styles.left)
    element.style.top = String(styles.marginTop)
    return element
}

export const ThumbUpDom = createReactionDom(thumb_up)
export const LikeDom = createReactionDom(like)
