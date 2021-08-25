import React from 'react'
import { useLocation } from 'react-router-dom'
import PollEditor from '../../containers/poll-editor/PollEditor'
import { EventBusConnectionStatus, useEventBus } from '../../hooks/event-bus'

const useEditorParams = () => {
    const params = new URLSearchParams(useLocation().search)

    return {
        presentationId: params.get('presentationId') ?? '',
        extensionId: params.get('extensionId') ?? '',
    }
}

const Editor = () => {
    const { extensionId, presentationId } = useEditorParams()
    const eventBus = useEventBus(extensionId)
    if (eventBus.connected === EventBusConnectionStatus.FAILED) {
        return 'Failed to connect to extension, please install extension first'
    }
    if (eventBus.connected !== EventBusConnectionStatus.CONNECTED) {
        return 'Connecting to extension, please wait...'
    }
    return <PollEditor />
}

export default Editor
