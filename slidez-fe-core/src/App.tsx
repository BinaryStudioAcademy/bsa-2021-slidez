import React from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import PublicRoute from './common/routes/PublicRoute'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './common/routes/PrivateRoute'
import { AppRoute } from './common/routes/app-route'
import SignPage from './pages/sign/SignPage'
import Poll from './components/poll/Poll'
import { poll } from './components/poll/dto/pollDtoMock'
import PollInput from './components/poll/PollInput'

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
                <PublicRoute
                    exact
                    path={'/poll'}
                    component={() => <Poll poll={poll} />}
                />
                <PublicRoute
                    exact
                    path={'/poll-input'}
                    component={() => <PollInput poll={poll} />}
                />
            </Switch>
        </HashRouter>
    )
}

export default App
