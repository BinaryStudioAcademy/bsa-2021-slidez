import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { EventBusConnectionStatus, useEventBus } from '../../hooks/event-bus'
import { RootState } from '../../store'
import Menu from './Menu'
import PollEditor from './PollEditor'
import { EditorTab, loadActiveSession, preloadState } from './store'
import styles from './addonstyles.module.scss'
import Loader from '../../common/components/loader/Loader'
import CreateQA from '../qa-session/QASession'

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
        return (
            <div
                className={styles.loadingPage}
                style={{ height: window.innerHeight }}
            >
                <Loader width='100%' height='200px' />
                <p>Connecting to extension, please wait...</p>
            </div>
        )
    }

    let tab: JSX.Element = <Menu />
    switch (activeTab) {
        case null || EditorTab.MENU:
            tab = <Menu />
            break
        case EditorTab.POLL:
            tab = <PollEditor />
            break
        case EditorTab.QA:
            tab = <CreateQA />
            break
        case EditorTab.QUIZ:
            tab = <>Not supported yet</>
            break
    }
    return <div>{tab}</div>
}

export default Addon
