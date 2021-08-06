import React from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import PublicRoute from './common/routes/PublicRoute'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './common/routes/PrivateRoute'
import { AppRoute } from './common/routes/app-route'
import SignPage from './pages/sign/SignPage'

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
                    <PrivateRoute
                        exact
                        path={AppRoute.DASHBOARD}
                        component={Dashboard}
                    />
                </Switch>
            </HashRouter>
        </div>
    )
}

export default App
