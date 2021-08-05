import React from 'react'
import {
    BrowserRouter,
    HashRouter,
    Link,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom'
import PublicRoute from './common/routes/public-route'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './common/routes/PrivateRoute'
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
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
