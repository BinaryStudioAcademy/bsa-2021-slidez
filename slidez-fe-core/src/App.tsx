import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import logo from './logo.svg'
import { Counter } from './containers/counter/Counter'
import './App.css'
import PublicRoute from './common/routes/public-route'
import { AppRoute } from './common/routes/app-route'
import SignPage from './pages/sign/SignPage'

const DefaultApp = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Counter />
      </header>
    </div>
  )
}

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <PublicRoute
            exact
            path={[AppRoute.LOGIN, AppRoute.REGISTRATION]}
            component={SignPage}
          />
          <Route path={AppRoute.ANY} exact component={DefaultApp} />
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
