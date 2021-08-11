import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Login from './Login'
import './index.css'

const Popup = () => {
    return <Login />
}

ReactDOM.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    document.getElementById('root')
)
