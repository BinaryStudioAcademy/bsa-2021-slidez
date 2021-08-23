import React from 'react'
import PublicRoute from './common/routes/PublicRoute'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './common/routes/PrivateRoute'
import { AppRoute } from './common/routes/app-route'
import SignPage from './pages/sign/SignPage'
import EventPage from './pages/event/EventPage'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ParticipantPage from './pages/participant-page/ParticipantPage'
import UpdatePage from './pages/update/UpdatePage'
import { log } from 'slidez-shared'
import Main from './containers/poll-editor/Main'

log()

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
                    <PrivateRoute path={AppRoute.ADDON} component={Main} />
                    <Route path={AppRoute.EVENT} component={EventPage} />
                    <Route
                        path={AppRoute.PARTICIPANT}
                        component={ParticipantPage}
                    />
                    <PrivateRoute
                        exact
                        path={AppRoute.UPDATE_USER}
                        component={UpdatePage}
                    />
                    <Route exact strict path={AppRoute.ANY}>
                        <Redirect to={AppRoute.LOGIN} />
                    </Route>
                </Switch>
            </HashRouter>
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
