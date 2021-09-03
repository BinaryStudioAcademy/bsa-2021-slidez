import * as React from 'react'
import { Route, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AppRoute } from './app-route'
import { locationType } from './location'
import { useAppSelector } from '../../hooks'
import { selectIsLoggedIn, getPathname } from '../../containers/user/store'

// @ts-ignore
const PublicRoute = ({ component: Component, ...rest }) => {
    const hasUser = useAppSelector(selectIsLoggedIn)
    const history = useHistory()
    React.useEffect(() => {
        const route = getPathname() ?? AppRoute.DASHBOARD
        if (hasUser) {
            history.push(route)
        }
    }, [hasUser, history])
    return <Route {...rest} render={(props) => <Component {...props} />} />
}

PublicRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    location: locationType,
}

PublicRoute.defaultProps = {
    location: undefined,
}

export default PublicRoute
