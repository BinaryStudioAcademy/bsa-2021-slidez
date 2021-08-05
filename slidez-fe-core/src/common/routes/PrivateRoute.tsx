import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AppRoute } from './app-route'
import { useAppSelector } from '../../hooks'
import { selectIsLoggedIn } from '../../containers/user/store'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const hasUser = useAppSelector(selectIsLoggedIn)
    return (
        <Route
            {...rest}
            render={(props) =>
                hasUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: `${AppRoute.LOGIN}`,
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    )
}
export default PrivateRoute
