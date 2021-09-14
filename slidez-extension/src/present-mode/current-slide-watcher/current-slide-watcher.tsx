import React from 'react'
import ReactDOM from 'react-dom'
import {
    CLASS_NAME_PUNCH_VIEWER_SVGPAGE,
    CLASS_NAME_PUNCH_VIEWER_CONTENT,
    CLASS_NAME_PUNCH_VIEWER_SVGPAGE_SVGCONTAINER,
    INTERACTIVE_PATTERN,
} from '../../dom/dom-constants'
import { queryElement } from '../../dom/dom-helpers'
import SlideIframe from '../../components/slide-iframe/SlideIframe'
import ReactionOverlayIframe from '../../components/slide-iframe/ReactionOverlayFrame'
import { IFRAME_HOST_BASE } from '../../env'
import { SLIDE_CHANGE_EVENT } from 'slidez-shared'

class CurrentSlideWatcher {
    constructor(
        private readonly document: Document,
        private readonly eventCode: string,
        private readonly presentationId: string
    ) {}

    public currentSlideId?: string
    private slideSwitchMutationObserver?: MutationObserver

    init() {
        const reactionMountBase = queryElement(
            this.document,
            `.${CLASS_NAME_PUNCH_VIEWER_CONTENT}`
        )
        if (reactionMountBase) {
            const reactionMount = document.createElement('div')
            reactionMount.className = 'react-reaction-mount'
            reactionMount.style.width = '100%'
            reactionMount.style.height = '100%'
            reactionMount.style.position = 'absolute'
            reactionMountBase.appendChild(reactionMount)
            ReactDOM.render(
                <ReactionOverlayIframe
                    sourceUrl={`${IFRAME_HOST_BASE}/#/reaction-overlay/${this.eventCode}`}
                />,
                reactionMount
            )
        } else {
            console.error(
                'Failed to init reaction overlay, no mounting point available!'
            )
        }
        const svgContainerElem = this.getSvgContainerElem()!
        const gElem = this.getGElem(svgContainerElem)
        this.currentSlideId = gElem.id
        this.replaceContentIfNeeded(svgContainerElem)
        this.tryNotifySlideChange()
        this.slideSwitchMutationObserver = new MutationObserver(
            async (mutations) => {
                for (const mutation of mutations) {
                    for (const addedNode of Array.from(mutation.addedNodes)) {
                        const node = addedNode as Element
                        if (
                            node.className === CLASS_NAME_PUNCH_VIEWER_SVGPAGE
                        ) {
                            const svgContainerElem =
                                this.getSvgContainerElemWithParent(node)
                            const gElem = this.getGElem(svgContainerElem)
                            this.currentSlideId = gElem.id
                            this.tryNotifySlideChange()
                            this.replaceContentIfNeeded(svgContainerElem)
                        }
                    }
                }
            }
        )

        this.slideSwitchMutationObserver.observe(
            this.document.documentElement,
            {
                childList: true,
                subtree: true,
            }
        )
    }

    destroy() {
        this.currentSlideId = undefined
        this.slideSwitchMutationObserver?.disconnect
    }

    private getSvgContainerElem() {
        const svgContainerElem = queryElement<Element>(
            this.document,
            '.' + CLASS_NAME_PUNCH_VIEWER_SVGPAGE_SVGCONTAINER
        )

        return svgContainerElem
    }

    private getSvgContainerElemWithParent(parentNode: Element) {
        const svgContainerElem = parentNode.getElementsByClassName(
            CLASS_NAME_PUNCH_VIEWER_SVGPAGE_SVGCONTAINER
        )[0]

        return svgContainerElem
    }

    private getGElem(svgContainerElem: Element) {
        const svgElem = svgContainerElem.firstChild
        return svgElem?.firstChild?.nextSibling as Element
    }

    private isInteractiveSlide() {
        return Boolean(
            this.currentSlideId?.match(new RegExp(INTERACTIVE_PATTERN))
        )
    }

    private replaceIneractiveSlide(svgContainer: Element) {
        if (!this.currentSlideId) {
            return
        }

        ReactDOM.render(
            <SlideIframe
                sourceUrl={`${IFRAME_HOST_BASE}/#/present/${this.eventCode}`}
                slideId={this.currentSlideId}
                presentationId={this.presentationId}
            />,
            svgContainer
        )
    }

    private replaceContentIfNeeded(svgContainer: Element) {
        if (this.isInteractiveSlide()) {
            this.replaceIneractiveSlide(svgContainer)
        }
    }

    private tryNotifySlideChange() {
        const iframe = this.document!.getElementById('reaction-frame')
        const slideId = this.currentSlideId
        if (!iframe || !slideId) {
            return
        }

        ;(iframe as any).contentWindow.postMessage(slideId, '*')
    }
}

export default CurrentSlideWatcher
