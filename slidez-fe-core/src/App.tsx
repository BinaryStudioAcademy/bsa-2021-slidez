import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import AuthenticationRoute from './common/routes/AuthenticationRoute'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './common/routes/PrivateRoute'
import { AppRoute } from './common/routes/app-route'
import SignPage from './pages/sign/SignPage'
import EventPage from './pages/event/EventPage'

function App() {
    return (
        <div>
            <HashRouter>
                <Switch>
                    <AuthenticationRoute
                        exact
                        path={[AppRoute.LOGIN, AppRoute.REGISTRATION]}
                        component={SignPage}
                    />
                    <Route path={AppRoute.EVENT} component={EventPage} />
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
