import presentMode from './present-mode/present-mode'

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.color) {
        console.log('Receive color = ' + msg.color)
        document.body.style.backgroundColor = msg.color
        sendResponse('Change color to ' + msg.color)
    } else {
        sendResponse('Color message is none.')
    }
})

function init() {
    presentMode.init()
}

init()

//Isolated modules hack
export {}
