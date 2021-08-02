import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './common/routes/PrivateRoute'

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
