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
import UpdatePage from './pages/update/UpdatePage'
import { log } from 'slidez-shared'
import InteractiveWrapper from './common/components/interactive-elements/interactive-wrapper/InteractiveWrapper'
import Poll from './common/components/interactive-elements/poll/Poll'
import { poll } from './common/components/interactive-elements/poll/dto/pollDtoMock'

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
                    <Route path={AppRoute.EVENT} component={EventPage} />
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
                    <PublicRoute
                        exact
                        path='/interactive'
                        component={() => (
                            <InteractiveWrapper
                                wrappedComponent={() => <Poll poll={poll} />}
                            />
                        )}
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
