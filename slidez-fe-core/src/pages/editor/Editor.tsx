import React from 'react'
import PollEditor from '../../containers/poll-editor/PollEditor'
import { EventBusConnectionStatus, useEventBus } from '../../hooks/event-bus'

const Editor = () => {
    const eventBus = useEventBus()
    if (eventBus.connected === EventBusConnectionStatus.FAILED) {
        return 'Failed to connect to extension, please install extension first'
    }
    if (eventBus.connected !== EventBusConnectionStatus.CONNECTED) {
        return 'Connecting to extension, please wait...'
    }
    return <PollEditor />
}

export default Editor
