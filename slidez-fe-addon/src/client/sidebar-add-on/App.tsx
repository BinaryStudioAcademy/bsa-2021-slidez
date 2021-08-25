import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { EventBusConnectionStatus, useEventBus } from './hooks';
import { EXTENSION_ID, IFRAME_HOST } from './env';
import { runGoogleScript } from './helpers';

const App = () => {
    const eventBus = useEventBus();
    const [presentationId, setPresentationId] = useState<string | null>(null);
    useEffect(() => {
        runGoogleScript<string>('getPresentationId', null).then(
            setPresentationId
        );
    });
    if (eventBus.connected === EventBusConnectionStatus.FAILED) {
        return (
            <>Failed to connect to extension, please install extension first</>
        );
    }
    if (eventBus.connected !== EventBusConnectionStatus.CONNECTED) {
        return <>Connecting to extension, please wait...</>;
    }
    if (!presentationId) {
        return <>Loading presentation info</>;
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
                src={`http://localhost:3000/#/addon?presentationId=${presentationId}&extensionId=${EXTENSION_ID}`}
            ></iframe>
        </div>
    );
};

export default App;
