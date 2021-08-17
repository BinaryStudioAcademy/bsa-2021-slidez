import React from 'react'
import {
    CLASS_NAME_PUNCH_PRESENT_IFRAME,
    CLASS_NAME_PUNCH_VIEWER_PAGE_WRAPPER_CONTAINER,
} from '../dom/dom-constants'
import { queryElement, queryElementAsync } from '../dom/dom-helpers'
import Poll from '../components/poll/Poll'
import { poll } from '../components/poll/dto/pollDtoMock'
import ReactDOM from 'react-dom'
import CurrentSlideWatcher from './current-slide-watcher/current-slide-watcher'

class PresentMode {
    private iframe?: HTMLIFrameElement

    private presentModeStartMutationObserver?: MutationObserver
    private presentModeEndMutationObserver?: MutationObserver

    private currentSlideWatcher?: CurrentSlideWatcher

    get document() {
        return this.iframe?.contentDocument
    }

    get window() {
        return this.iframe?.contentWindow
    }

    get active() {
        return Boolean(
            this.iframe?.contentDocument && this.iframe.contentWindow
        )
    }

    init() {
        if (document.querySelector('.' + CLASS_NAME_PUNCH_PRESENT_IFRAME)) {
            this.onPresentModeInit()
        } else {
            this.watchPresentModeStart()
        }
    }

    destroy() {
        this.presentModeStartMutationObserver?.disconnect()
        this.presentModeEndMutationObserver?.disconnect()
    }

    private onPresentModeInit() {
        this.iframe = queryElement<HTMLIFrameElement>(
            document,
            '.' + CLASS_NAME_PUNCH_PRESENT_IFRAME
        )
        this.watchPresentModeEnd()

        const alreadyLoaded =
            this.document!.readyState === 'complete' &&
            this.window!.location.href !== 'about:blank'
        if (alreadyLoaded) {
            this.currentSlideWatcher = new CurrentSlideWatcher(this.document!)
            this.onPresentModeLoad()
        } else {
            this.iframe!.onload = () => {
                this.currentSlideWatcher = new CurrentSlideWatcher(
                    this.document!
                )
                this.onPresentModeLoad()
            }
        }
    }

    private createPollContainerAndPutOnTopOfSlide() {
        ;(async () => {
            const slideContent = await queryElementAsync<HTMLElement>(
                this.document!,
                '.' + CLASS_NAME_PUNCH_VIEWER_PAGE_WRAPPER_CONTAINER
            )
            const div = document.createElement('div')
            div.style.height = '100%'
            div.style.width = '100%'
            slideContent.style.display = 'none'
            slideContent.insertAdjacentElement('afterend', div)
            ReactDOM.render(<Poll poll={poll} />, div)
        })()
    }

    private onPresentModeLoad() {
        ;(async () => {
            this.injectStyles()
            this.createPollContainerAndPutOnTopOfSlide()
            // throw new Event
            console.log('Present mode started')
        })()
    }

    private onPresentModeEnd() {
        this.currentSlideWatcher!.destroy()
        this.watchPresentModeStart()
        // throw new Event
        console.log('Present mode ended')
    }

    private watchPresentModeStart() {
        this.presentModeStartMutationObserver = new MutationObserver(
            async (mutations) => {
                for (const mutation of mutations) {
                    for (const addedNode of Array.from(mutation.addedNodes)) {
                        if (
                            (addedNode as Element).className ===
                            CLASS_NAME_PUNCH_PRESENT_IFRAME
                        ) {
                            this.presentModeStartMutationObserver?.disconnect()
                            this.presentModeStartMutationObserver = undefined
                            this.onPresentModeInit()
                            return
                        }
                    }
                }
            }
        )

        this.presentModeStartMutationObserver.observe(
            document.documentElement,
            {
                childList: true,
                subtree: true,
            }
        )
    }

    private watchPresentModeEnd() {
        this.presentModeEndMutationObserver = new MutationObserver(
            async (mutations) => {
                for (const mutation of mutations) {
                    for (const removedNode of Array.from(
                        mutation.removedNodes
                    )) {
                        if (
                            (removedNode as Element).className ===
                            CLASS_NAME_PUNCH_PRESENT_IFRAME
                        ) {
                            this.presentModeEndMutationObserver?.disconnect()
                            this.presentModeEndMutationObserver = undefined
                            this.onPresentModeEnd()
                            return
                        }
                    }
                }
            }
        )

        this.presentModeEndMutationObserver.observe(document.documentElement, {
            childList: true,
            subtree: true,
        })
    }

    private injectStyles() {
        //WARNING: leaving console.log for debug purposes, stylesheets are a bit unstable
        console.log('Injecting css')
        const style = document.createElement('link')
        style.rel = 'stylesheet'
        style.type = 'text/css'
        style.href = chrome.extension.getURL('static/css/content_script.css')
        console.log('Appending style', style)
        const mount = this.document!.head ?? this.document!.documentElement
        console.log('Appending to', mount)
        mount.appendChild(style)
    }
}

export default new PresentMode()
