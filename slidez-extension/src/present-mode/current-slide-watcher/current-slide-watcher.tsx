import React from 'react'
import ReactDOM from 'react-dom'
import {
    CLASS_NAME_PUNCH_VIEWER_SVGPAGE,
    CLASS_NAME_PUNCH_VIEWER_SVGPAGE_SVGCONTAINER,
} from '../../dom/dom-constants'
import { queryElement, queryElementAsync } from '../../dom/dom-helpers'
import Poll from '../../components/poll/Poll'
import { poll } from '../../components/poll/dto/pollDtoMock'

class CurrentSlideWatcher {
    constructor(document: Document) {
        this.document = document
    }

    private document: Document
    public currentSlideId?: string

    private slideSwitchMutationObserver?: MutationObserver

    init() {
        const svgContainerElem = this.getSvgContainerElem()
        const gElem = this.getGElem(svgContainerElem!)
        this.currentSlideId = gElem.id
        this.changeContentIfNeeded()

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
                            this.changeContentIfNeeded()
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
        const gElem = svgElem?.firstChild?.nextSibling as Element

        return gElem
    }

    private isInteractiveSlide() {
        if (this.currentSlideId?.match(/SLIDES_API/)) {
            return true
        } else {
            return false
        }
    }

    private changeContentToPoll() {
        if (!this.currentSlideId) {
            return
        }

        const svgContainer = this.getSvgContainerElem()!
        while (svgContainer.firstChild) {
            svgContainer.removeChild(svgContainer.firstChild)
        }
        ReactDOM.render(<Poll poll={poll} />, svgContainer)
    }

    private changeContentIfNeeded() {
        if (this.isInteractiveSlide()) {
            this.changeContentToPoll()
        }
    }
}

export default CurrentSlideWatcher
