import React from 'react'
import * as WebSocketService from '../../../services/ws/ws-service'

const SampleComponent = () => {
    WebSocketService.helloConnect()
    return <div>Hello</div>
}

export default SampleComponent
