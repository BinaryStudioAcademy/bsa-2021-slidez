export function queryElement<T extends Element>(
    parent: Document | HTMLElement,
    selector: string,
    onlyEmpty?: boolean
) {
    const element = parent.querySelector<T>(selector)

    if (!element) {
        // throw new ElementNotFoundError(selector)
        return
    }

    if (onlyEmpty !== undefined) {
        if (onlyEmpty && element.hasChildNodes()) {
            // throw new AssertionError(`Element ${selector} found, but already filled.`)
            return
        }
    }

    return element
}

export function queryElementAsync<T extends Element>(
    parent: Document | HTMLElement,
    selector: string
): Promise<T> {
    return new Promise((resolve, reject) => {
        // If already present, resolve immediately
        const element = parent.querySelector<T>(selector)
        if (element) {
            resolve(element)
            return
        }

        function destroyObserver() {
            mutationObserver?.disconnect()
        }

        // Define observer
        const mutationObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (parent.querySelector(selector)) {
                    destroyObserver()
                    resolve(mutation.target as T)
                    return
                }

                for (const addedNode of Array.from(mutation.addedNodes)) {
                    if (parent.querySelector(selector)) {
                        destroyObserver()
                        resolve(addedNode as T)
                        return
                    }
                }
            }

            // Might've been among the children of added elements
            if (mutations.some((mutation) => mutation.addedNodes.length > 0)) {
                const element = parent.querySelector(selector)
                if (element) {
                    destroyObserver()
                    resolve(element as T)
                }
            }
        })

        // Start observer
        mutationObserver.observe(parent, {
            attributes: true,
            childList: true,
            subtree: true,
        })
    })
}
