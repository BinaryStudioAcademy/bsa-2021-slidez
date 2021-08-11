import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { CLASS_NAME_PUNCH_PRESENT_IFRAME } from './dom/dom-constants'
import { queryElementAsync } from './dom/dom-helpers'

const App = () => {
    const [url, setUrl] = useState<string>('')

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
            'iframe[class=' + CLASS_NAME_PUNCH_PRESENT_IFRAME + ']'
        ).then((el) => console.log('done'))
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
                <button
                    onClick={() => {
                        const container =
                            document.getElementsByClassName('container')[0]
                        const iframe = document.createElement('iframe')
                        iframe.classList.add(CLASS_NAME_PUNCH_PRESENT_IFRAME)
                        if (
                            !document.getElementsByClassName(
                                CLASS_NAME_PUNCH_PRESENT_IFRAME
                            )[0]
                        ) {
                            container?.append(iframe)
                        }
                    }}
                >
                    append iframe
                </button>
                <button
                    onClick={() => {
                        const iframe = document.getElementsByClassName(
                            CLASS_NAME_PUNCH_PRESENT_IFRAME
                        )[0]
                        if (iframe) {
                            const container =
                                document.getElementsByClassName('container')[0]
                            container?.removeChild(iframe)
                        }
                    }}
                >
                    remove iframe
                </button>
            </div>
            <div className='container'></div>
        </div>
    )
}

export default App
