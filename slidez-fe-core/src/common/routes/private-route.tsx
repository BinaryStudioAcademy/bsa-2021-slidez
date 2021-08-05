import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AppRoute } from './app-route'

const PrivateRoute = ({
    component: Component,
    isAuthenticated,
    ...rest
}: any) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated ? (
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
export default PrivateRoute
