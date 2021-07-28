import React from 'react'
import { AppRoute } from '../common/routes/app-route'
import { useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import './sign-page.css'

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
    <div className='signPage'>
      <div>
        <img
          src='http://i.piccy.info/i9/b444f9c17363dd803519567805706967/1627469540/39479/1437067/welcome.jpg'
          alt='Piccy.info - Free Image Hosting'
          className='welcome-image'
        />
      </div>
      <div className='form-holder'>{getForm(pathname)}</div>
    </div>
  )
}

export default SignPage
