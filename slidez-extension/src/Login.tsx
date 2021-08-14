import React, { useEffect, useState } from 'react'
import './login.css'
import Main from './MainPage'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        chrome.runtime.sendMessage(
            { message: 'login', payload: { email: email, password: password } },
            function (response) {
                if (response === 'success') {
                    return <Main />
                }
            }
        )
    }

    return (
        <div className='login-extension'>
            <form className='form-container'>
                <h1>Login</h1>

                <label>
                    <b>Email</b>
                </label>
                <input
                    value={email}
                    type='email'
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='Enter Email'
                    required
                />

                <label>
                    <b>Password</b>
                </label>
                <input
                    value={password}
                    type='password'
                    placeholder='Enter Password'
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <button type='submit' className='btn' onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
