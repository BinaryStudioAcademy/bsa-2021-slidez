import React from 'react'
import { revealPassword } from './form-utils'
import validator from 'validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

type RegistrationProps = {
  onRegister: Function
  onRegisterWithGoogle: Function
}

const RegistrationForm = ({
  onRegister,
  onRegisterWithGoogle,
}: RegistrationProps) => {
  const [isPasswordRevealed, setIsPasswordRevealed] = React.useState(false)
  const [isConfirmPasswordRevealed, setIsConfirmPasswordRevealed] =
    React.useState(false)
  const [email, setEmail] = React.useState('')
  const [isEmailValid, setIsEmailValid] = React.useState(true)
  const [password, setPassword] = React.useState('')
  const [isPasswordValid, setIsPasswordValid] = React.useState(true)
  const [confirmedPassword, setConfirmedPassword] = React.useState('')
  const [passwordsMatch, setPasswordsMatch] = React.useState(true)

  const onRevealPasswordClick = () => {
    setIsPasswordRevealed(!isPasswordRevealed)
    revealPassword('register-password-input')
  }

  const onRevealConfirmedPasswordClick = () => {
    setIsConfirmPasswordRevealed(!isConfirmPasswordRevealed)
    revealPassword('register-password-confirm-input')
  }

  const validatePassword = () => {
    setPasswordsMatch(password === confirmedPassword)
    setIsPasswordValid(true)
  }

  const handleRegister = () => {
    if (isEmailValid && isPasswordValid && passwordsMatch) {
      onRegister(email, password)
    }
  }

  const handleRegisterWithGoogle = () => {
    onRegisterWithGoogle()
  }

  return (
    <div className='sign-form'>
      <div className='form-row'>Sign Up</div>
      <div className='form-row form-input-holder'>
        <label htmlFor='register-email-input' className='label'>
          Email
        </label>
        <input
          id='register-email-input'
          className={`form-input ${isEmailValid ? '' : 'error-input'}`}
          placeholder='Enter your email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setIsEmailValid(validator.isEmail(email))}
        />
      </div>
      <div className='form-row form-input-holder'>
        <label htmlFor='register-password-input' className='label'>
          Password
        </label>
        <div className='input-with-icon-holder'>
          <input
            id='register-password-input'
            type='password'
            className={`form-input input-with-icon ${
              isPasswordValid ? '' : 'error-input'
            }`}
            placeholder='Enter your password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => validatePassword()}
          />
          {isPasswordRevealed ? (
            <FontAwesomeIcon
              icon={faEye}
              className='input-icon'
              onClick={onRevealPasswordClick}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className='input-icon'
              onClick={onRevealPasswordClick}
            />
          )}
        </div>
      </div>
      <div className='form-row form-input-holder'>
        <label htmlFor='register-password-confirm-input' className='label'>
          Confirm Password
        </label>
        <div className='input-with-icon-holder'>
          <input
            id='register-password-confirm-input'
            type='password'
            className={`form-input input-with-icon ${
              passwordsMatch ? '' : 'error-input'
            }`}
            placeholder='Confirm password'
            value={confirmedPassword}
            onChange={(event) => setConfirmedPassword(event.target.value)}
            onBlur={() => setPasswordsMatch(password === confirmedPassword)}
          />
          {isConfirmPasswordRevealed ? (
            <FontAwesomeIcon
              icon={faEye}
              className='input-icon'
              onClick={onRevealConfirmedPasswordClick}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className='input-icon'
              onClick={onRevealConfirmedPasswordClick}
            />
          )}
        </div>
      </div>
      <div className='form-row' />
      <div className='form-row'>
        <button className='form-button login-button' onClick={handleRegister}>
          Sign Up
        </button>
      </div>
      <div className='form-row button-divider'>or</div>
      <div className='form-row'>
        <button
          className='form-button login-with-google-button'
          onClick={handleRegisterWithGoogle}
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  )
}

export default RegistrationForm
