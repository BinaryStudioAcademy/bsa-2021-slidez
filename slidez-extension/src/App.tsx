import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { CLASS_NAME_PUNCH_PRESENT_IFRAME } from './dom/dom-constants'
import { queryElementAsync } from './dom/dom-helpers'
import presentMode from './present-mode/present-mode'

const Iframe = () => {
    return <iframe className={CLASS_NAME_PUNCH_PRESENT_IFRAME}></iframe>
}

const App = () => {
    const [url, setUrl] = useState<string>('')
    const [iframePresent, setIframePresent] = useState(false)

    /**
     * Get current URL
     */
    useEffect(() => {
        const queryInfo = { active: true, lastFocusedWindow: true }

        chrome.tabs &&
            chrome.tabs.query(queryInfo, (tabs) => {
                const url = tabs[0].url
                // @ts-ignore
                setUrl(url)
            })

        queryElementAsync<HTMLElement>(
            document,
            '.' + CLASS_NAME_PUNCH_PRESENT_IFRAME
        ).then(() => console.log('done'))

        presentMode.init()
    }, [])

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>Current URL: {url}</p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Learn React
                </a>
            </header>
            <div style={{ padding: '25px' }}>
                <button onClick={() => setIframePresent(true)}>
                    append iframe
                </button>
                <button onClick={() => setIframePresent(false)}>
                    remove iframe
                </button>
            </div>
            <div className='container'>{iframePresent && <Iframe />}</div>
        </div>
    )
}

export default App
