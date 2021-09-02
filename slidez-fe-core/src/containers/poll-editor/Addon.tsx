import React from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { QandA } from '../../common/components/interactive-elements/q-and-a/QandA'
import { EventBusConnectionStatus, useEventBus } from '../../hooks/event-bus'
import { RootState } from '../../store'
import Menu from './Menu'
import PollEditor from './PollEditor'
import { EditorTab, loadActiveSession, preloadState } from './store'

const useEditorParams = () => {
    const params = new URLSearchParams(useLocation().search)

    return {
        presentationId: params.get('presentationId') ?? '',
        extensionId: params.get('extensionId') ?? '',
    }
}

const Addon = () => {
    const dispatch = useDispatch()
    const { activeTab } = useSelector((state: RootState) => state.editor)

    const { extensionId, presentationId } = useEditorParams()

    useEffect(() => {
        dispatch(preloadState(presentationId))
        dispatch(loadActiveSession(presentationId))
    }, [])

    const eventBus = useEventBus(extensionId)
    if (eventBus.connected === EventBusConnectionStatus.FAILED) {
        return 'Failed to connect to extension, please install extension first'
    }
    if (eventBus.connected !== EventBusConnectionStatus.CONNECTED) {
        return 'Connecting to extension, please wait...'
    }

    let tab: JSX.Element
    switch (activeTab) {
        case null:
            tab = <Menu />
            break
        case EditorTab.POLL:
            tab = <PollEditor />
            break
        case EditorTab.QA:
            tab = <QandA />
            break
        case EditorTab.QUIZ:
            tab = <>Not supported yet</>
            break
    }
    return <div>{tab}</div>
}

export default Addon
