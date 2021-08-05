import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import PublicRoute from './common/routes/public-route'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './common/routes/private-route'
import { AppRoute } from './common/routes/app-route'
import SignPage from './pages/sign/SignPage'

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute
                        exact
                        path={AppRoute.DASHBOARD}
                        component={Dashboard}
                    />
                    <PublicRoute
                        exact
                        path={[AppRoute.LOGIN, AppRoute.REGISTRATION]}
                        component={SignPage}
                    />
                    <Route exact strict path={AppRoute.ANY}>
                        <Redirect to={AppRoute.LOGIN} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
