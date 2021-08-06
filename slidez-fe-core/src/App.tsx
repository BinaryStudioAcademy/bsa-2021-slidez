import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import PublicRoute from './common/routes/public-route'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './common/routes/PrivateRoute'
import { AppRoute } from './common/routes/app-route'
import SignPage from './pages/sign/SignPage'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute
                        exact
                        path= {AppRoute.DASHBOARD}
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
            <ReduxToastr
                timeOut={5000}
                newestOnTop={false}
                preventDuplicates
                position='top-right'
                transitionIn='fadeIn'
                transitionOut='fadeOut'
                progressBar
                closeOnToastrClick
            />
        </div>
    )
}

export default App
