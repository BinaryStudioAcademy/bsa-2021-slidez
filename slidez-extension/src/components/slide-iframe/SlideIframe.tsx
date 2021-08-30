import React, { useEffect } from 'react'
import {
    CLASS_NAME_INTERACTIVE_SLIDE_IFRAME,
    CLASS_NAME_PUNCH_PRESENT_IFRAME,
} from '../../dom/dom-constants'
import { insertStyles, queryElement } from '../../dom/dom-helpers'
import './SlideIframe.scss'

type SlideIframeProps = {
    sourceUrl: string
    slideId: string
    presentationId: string
}

function SlideIframe({ sourceUrl, slideId, presentationId }: SlideIframeProps) {
    useEffect(() => {
        const slideIframeDoc = queryElement<HTMLIFrameElement>(
            document,
            '.' + CLASS_NAME_PUNCH_PRESENT_IFRAME
        )?.contentDocument

        const contentIframeDoc = queryElement<HTMLIFrameElement>(
            slideIframeDoc!,
            '.' + CLASS_NAME_INTERACTIVE_SLIDE_IFRAME
        )?.contentDocument

        insertStyles(contentIframeDoc!)
    }, [])

    return (
        <iframe
            className={CLASS_NAME_INTERACTIVE_SLIDE_IFRAME}
            src={`${sourceUrl}?presentationId=${presentationId}&slideId=${slideId}`}
            title='Interactive element'
        ></iframe>
    )
}

export default SlideIframe
