import React from 'react'
import { AppRoute } from '../../common/routes/app-route'
import { useLocation } from 'react-router-dom'
import LoginForm from '../../common/components/forms/LoginForm'
import RegistrationForm from '../../common/components/forms/RegistrationForm'
import './sign-page.css'

const SignPage = () => {
  const { pathname } = useLocation()

  const handleLogin = () => {}

  const handleLoginWithGoogle = () => {}

  const handleRegister = () => {}

  const handleRegisterWithGoogle = () => {}

  const getForm = (path: string) => {
    switch (path) {
      case AppRoute.LOGIN: {
        return (
          <LoginForm
            onLogin={handleLogin}
            onLoginWithGoogle={handleLoginWithGoogle}
          />
        )
      }
      case AppRoute.REGISTRATION: {
        return (
          <RegistrationForm
            onRegister={handleRegister}
            onRegisterWithGoogle={handleRegisterWithGoogle}
          />
        )
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
