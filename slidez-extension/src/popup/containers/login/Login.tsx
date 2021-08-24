import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { fetchUserFromStorage } from './redux/authenticationSlice'
import LoginForm from './LoginForm'

const Loader = () => <div>Loading...</div>

const Login = () => {
    const { isFetchingTokenFromStorage, accessToken } = useSelector(
        (state: RootState) => state.authentication
    )
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('Access token', accessToken)
        if (accessToken) {
            return
        }
        dispatch(fetchUserFromStorage())
    }, [])

    if (isFetchingTokenFromStorage) {
        return <Loader />
    }

    if (accessToken) {
        return <div>Already logged in!</div>
    }

    return <LoginForm />
}

export default Login
