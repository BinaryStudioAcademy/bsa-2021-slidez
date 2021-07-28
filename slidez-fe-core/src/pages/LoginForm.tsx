import React from 'react'
import { NavLink } from 'react-router-dom'
import './sign-form.css'
import { AppRoute } from '../common/routes/app-route'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

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
      <div className='form-row form-input-holder'>
        <label htmlFor='sign-in-email-input' className='label'>
          Email
        </label>
        <input
          id='sign-in-email-input'
          className='form-input'
          placeholder='Enter your email'
        />
      </div>
      <div className='form-row form-input-holder'>
        <div className='row-with-components-on-opposite-sides'>
          <label htmlFor='sign-in-password-input' className='label'>
            Password
          </label>
          <NavLink exact to={AppRoute.RESTORE_PASSWORD} className='link'>
            Forgot password?
          </NavLink>
        </div>
        <div className='input-with-icon-holder'>
          <input
            id='sign-in-password-input'
            type='password'
            className='form-input input-with-icon'
            placeholder='Enter your password'
          />
          <FontAwesomeIcon icon={faEyeSlash} className='input-icon' />
        </div>
      </div>
      <div className='form-row'>
        <button className='form-button login-button'>Log In</button>
      </div>
      <div className='form-row button-divider'>or</div>
      <div className='form-row'>
        <button className='form-button login-with-google-button'>
          Log In with Google
        </button>
      </div>
    </div>
  )
}

export default LoginForm
