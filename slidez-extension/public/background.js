chrome.runtime.onConnect.addListener((port) => {
    port.postMessage({ greeting: 'hello' })
})
