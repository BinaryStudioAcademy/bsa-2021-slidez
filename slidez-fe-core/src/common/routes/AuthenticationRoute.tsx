import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AppRoute } from './app-route'
import { locationType } from './location'
import { useAppSelector } from '../../hooks'
import { selectIsLoggedIn } from '../../containers/user/store'

// @ts-ignore
const AuthenticationRoute = ({ component: Component, ...rest }) => {
    const hasUser = useAppSelector(selectIsLoggedIn)

    return (
        <Route
            {...rest}
            render={(props) =>
                hasUser ? (
                    <Redirect
                        to={{
                            pathname: AppRoute.DASHBOARD,
                            state: { from: props.location },
                        }}
                    />
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}

AuthenticationRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    location: locationType,
}

AuthenticationRoute.defaultProps = {
    location: undefined,
}

export default AuthenticationRoute
