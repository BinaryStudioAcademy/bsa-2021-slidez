import React from 'react'
import { NavLink } from 'react-router-dom'
import './sign-form.css'
import { AppRoute } from '../common/routes/app-route'

type LoginProps = {
  onLogin: Function
  onForgotPassword: Function
}

const LoginForm = ({ onLogin, onForgotPassword }: LoginProps) => {
  return (
    <div className='sign-form'>
      <div className='form-row'>Log In</div>
      <div className='form-row'>
        <div className='no-account'>No account?</div>
        <NavLink exact to={AppRoute.REGISTRATION} className='link'>
          Sign Up
        </NavLink>
      </div>
      <div className='form-row'>
        <input className='form-input' placeholder='Enter your email' />
      </div>
      <button>Login</button>
    </div>
  )
}

export default LoginForm
