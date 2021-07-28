import React from 'react'
import { AppRoute } from '../common/routes/app-route'
import { useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'

const SignPage = () => {
  const { pathname } = useLocation()

  const handleLogin = () => {}

  const handleForgotPasswordClick = () => {}

  const handleRegister = () => {}

  const getForm = (path: string) => {
    switch (path) {
      case AppRoute.LOGIN: {
        return (
          <LoginForm
            onLogin={handleLogin}
            onForgotPassword={handleForgotPasswordClick}
          />
        )
      }
      case AppRoute.REGISTRATION: {
        return <RegistrationForm onRegister={handleRegister} />
      }
      default: {
        return null
      }
    }
  }

  return (
    <div>
      Hello, world!
      <div>{getForm(pathname)}</div>
    </div>
  )
}

export default SignPage
