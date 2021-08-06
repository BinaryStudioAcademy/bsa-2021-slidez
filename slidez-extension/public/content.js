//This line opens up a long-lived connection to your background page.
const port = chrome.runtime.connect({ name: 'mycontentscript' })
port.onMessage.addListener((message, sender) => {
    if (message.greeting === 'hello') {
        alert(message.greeting)
    }
})
