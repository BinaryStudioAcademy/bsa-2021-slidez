import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { EventBusConnectionStatus, useEventBus } from './hooks'
import { EXTENSION_ID, IFRAME_HOST } from './env'
import { runGoogleScript } from './helpers'
import Loader from 'slidez-fe-core/src/common/components/loader/Loader'
import './App.scss'

const App = () => {
    const eventBus = useEventBus()
    const [presentationId, setPresentationId] = useState<string | null>(null)
    useEffect(() => {
        runGoogleScript<string>('getPresentationId', null).then(
            setPresentationId
        )
    })
    if (eventBus.connected === EventBusConnectionStatus.FAILED) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    minHeight: '600px',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                Failed to connect to extension, please install extension first
            </div>
        )
    }
    if (eventBus.connected !== EventBusConnectionStatus.CONNECTED) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    minHeight: '600px',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                <Loader />
                Connecting to extension, please wait..
            </div>
        )
    }
    if (!presentationId) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    minHeight: '600px',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                <Loader />
                Connecting to extension, please wait....
            </div>
        )
    }
    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <iframe
                style={{
                    flexGrow: 1,
                    border: 'none',
                    margin: 0,
                    padding: 0,
                    minHeight: '600px',
                }}
                src={`${IFRAME_HOST}/#/addon?presentationId=${presentationId}&extensionId=${EXTENSION_ID}`}
            ></iframe>
        </div>
    )
}

export default App
