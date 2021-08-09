import React, { useEffect, useState } from 'react'
import './login.css'

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleLogin = () => {
        if (email !== '' &&  password !== '') {
        }
    }

    return (
        <div className='login-extension'>
            <form className='form-container'>
                <h1>Login</h1>

                <label>
                    <b>Email</b>
                </label>
                <input placeholder='Enter Email' name='email' required />

                <label>
                    <b>Password</b>
                </label>
                <input
                    type='password'
                    placeholder='Enter Password'
                    name='psw'
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
