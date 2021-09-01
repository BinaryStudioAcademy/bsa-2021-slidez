import React, { useEffect } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { AppRoute } from './app-route'
import { useAppSelector } from '../../hooks'
import { createPath, selectIsLoggedIn } from '../../containers/user/store'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const hasUser = useAppSelector(selectIsLoggedIn)
    const { pathname, search } = useLocation()
    useEffect(() => {
        createPath(pathname + search)
    }, [pathname, search])
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
