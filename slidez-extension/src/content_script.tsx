import React from 'react'
import ReactDOM from 'react-dom'
import Poll from 'slidez-shared/src/components/poll/Poll'
import { poll } from 'slidez-shared/src/components/poll/dto/pollDtoMock'

ReactDOM.render(
    <React.StrictMode>
        <Poll poll={poll} />
    </React.StrictMode>,
    document.getElementById('root')
)

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.color) {
        console.log('Receive color = ' + msg.color)
        document.body.style.backgroundColor = msg.color
        sendResponse('Change color to ' + msg.color)
    } else {
        sendResponse('Color message is none.')
    }
})

//Isolated modules hack
export {}
