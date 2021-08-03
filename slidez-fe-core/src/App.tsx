import React from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import PublicRoute from './common/routes/public-route'
import { AppRoute } from './common/routes/app-route'
import SignPage from './pages/sign/SignPage'
import SignWithGoogleSuccess from './pages/sign/SignWithGoogleSuccess'

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
                    <PublicRoute
                        exact
                        path={AppRoute.OAUTH_GOOGLE_SUCCESS}
                        component={SignWithGoogleSuccess}
                    />
                </Switch>
            </HashRouter>
        </div>
    )
}

export default App
