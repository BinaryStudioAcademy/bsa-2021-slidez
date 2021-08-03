import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AppRoute } from './app-route'
import { locationType } from './location'
import { useAppSelector } from '../../hooks'
import { selectIsLoggedIn } from '../../containers/user/store'

// @ts-ignore
const PublicRoute = ({ component: Component, ...rest }) => {
    const hasUser = useAppSelector(selectIsLoggedIn)

    return (
        <Route
            {...rest}
            render={(props) =>
                hasUser ? (
                    <Redirect
                        to={{
                            pathname: AppRoute.ROOT,
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

PublicRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    location: locationType,
}

PublicRoute.defaultProps = {
    location: undefined,
}

export default PublicRoute
