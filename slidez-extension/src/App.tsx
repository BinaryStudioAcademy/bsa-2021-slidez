import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

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
        </div>
    )
}

export default App
