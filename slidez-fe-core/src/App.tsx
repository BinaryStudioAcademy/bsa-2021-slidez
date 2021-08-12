import React from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import PublicRoute from './common/routes/PublicRoute'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './common/routes/PrivateRoute'
import { AppRoute } from './common/routes/app-route'
import SignPage from './pages/sign/SignPage'
import { UpdatePage } from './pages/update/UpdatePage'

function App() {
    return (
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
                <PrivateRoute
                    exact
                    path={AppRoute.UPDATE_USER}
                    component={UpdatePage}
                />
            </Switch>
        </HashRouter>
    )
}

export default App
