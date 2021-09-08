import React from 'react'
import { CLASS_NAME_INTERACTIVE_SLIDE_IFRAME } from '../../dom/dom-constants'
import './SlideIframe.scss'

type ReactionOverlayFrameProps = {
    sourceUrl: string
}

function SlideIframe({ sourceUrl }: ReactionOverlayFrameProps) {
    return (
        <iframe
            className={CLASS_NAME_INTERACTIVE_SLIDE_IFRAME}
            src={sourceUrl}
            title='Reaction overlay element'
            allowTransparency
        ></iframe>
    )
}

export default SlideIframe
