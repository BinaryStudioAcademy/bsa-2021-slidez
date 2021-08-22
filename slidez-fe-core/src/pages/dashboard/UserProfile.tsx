import React, { FC, useState, useRef, useEffect } from 'react'
import {
    faUser,
    faSignOutAlt,
    faTimes,
    faTrash,
    faTrashAlt,
    faTrashRestore,
    faTrashRestoreAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../../containers/user/store'
import { useAppDispatch } from '../../hooks'
import { LogInResponseDto } from '../../services/auth/dto/LogInResponseDto'
import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'
import { createDefaultAxios } from 'slidez-shared/src/net/http/http-util'
import { useDetectOutsideClick } from './useDetectOutsideClick'
import './dashboard.scss'
import '../update/update.scss'
import { ApiGateway } from '../../services/http/api-gateway'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { UserField } from '../update/Field'
import { MuiThemeProvider } from '@material-ui/core/styles'

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
}

const UserProfile = () => {
    const JWT = 'jwt'
    const refreshJWT = 'refresh_jwt'
    const dispatch = useAppDispatch()
    const dropdownRef = useRef<HTMLInputElement>(null)
    const [token, setToken] = useState('')
    const [userFirstName, setUserFirstName] = useState<string | undefined>('')
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
    const [userLastName, setUserLastName] = useState<string | undefined>('')
    const [userEmail, setUserEmail] = useState<string | undefined>('')
    const [logo, setLogo] = useState('')
    const [openEditProfile, setOpenEditProfile] = useState(false)

    const handleClickOpen = () => {
        setOpenEditProfile(true)
    }

    const handleClose = () => {
        setOpenEditProfile(false)
    }

    useEffect(() => {
        if (token.length > 0) {
            performLoginByToken()
            handleLogo()
            return
        }
        getAccessToken()
    })

    const handleDropDown = () => {
        setIsActive(!isActive)
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const getAccessToken = () => {
        setToken(window.localStorage.getItem(JWT) || '{}')
    }

    const sendAuthRequest = async (route: string, body: object = {}) => {
        const axiosInstance = createDefaultAxios(
            ApiGateway.REACT_APP_API_GATEWAY
        )

        return axiosInstance.request({
            url: route,
            method: 'POST',
            data: JSON.stringify(body),
        })
    }

    const performDataRequest = async (url: string, dto: object) => {
        const { data } = await sendAuthRequest(url, dto)

        const genericResponse: GenericResponse<LogInResponseDto, string> = data
        const userData = genericResponse.data.userDetailsDto
        setUserFirstName(userData?.firstName)
        setUserLastName(userData?.lastName)
        setUserEmail(userData?.email)

        return genericResponse
    }

    const performLoginByToken = async () => {
        const dto = {
            token: token,
        }
        return performDataRequest('/auth/login-by-token', dto)
    }

    const handleLogo = () => {
        if (userFirstName && userLastName) {
            setLogo(
                userFirstName.charAt(0).toUpperCase() +
                    userLastName.charAt(0).toUpperCase()
            )
        } else if (userEmail) {
            setLogo(
                userEmail.charAt(0).toUpperCase() +
                    userEmail.charAt(1).toUpperCase()
            )
        }
    }

    const initialValues: User = {
        id: '',
        firstName: 'Natalia',
        lastName: 'Li',
        email: 'Nnata@gmail.com',
        password: '',
    }

    const [userData, setUserData] = useState<User>(initialValues)

    // const handleUserData = () => {
    //     setUserData({
    //         id: '',
    //         firstName: userFirstName,
    //         lastName: userLastName,
    //         email: userEmail,
    //         password: '',
    //     })
    // }

    const handleInfoSubmit = (values: typeof userData) => {
        console.log(values)
    }

    const handlePwdSubmit = (values: typeof userData) => {
        console.log(values)
    }

    return (
        <div className='user-profile'>
            <div className='user-avatar'>
                <div onClick={handleDropDown} className='avatar'>
                    {logo}
                </div>
                <div
                    ref={dropdownRef}
                    className={`dropdown-content ${
                        isActive ? 'active' : 'inactive'
                    }`}
                >
                    <div className='user-info'>
                        <div className='avatar'> {logo} </div>
                        <div>
                            <div className='user-name'>
                                {userFirstName}&nbsp;
                                {userLastName}
                            </div>
                            <div className='user-email'> {userEmail} </div>
                        </div>
                    </div>
                    <hr />
                    <div
                        className='user-profile-menu'
                        onClick={() => handleClickOpen()}
                    >
                        <FontAwesomeIcon className='user-icon' icon={faUser} />
                        <span className='user-profile-menu-name'>
                            Edit profile
                        </span>
                    </div>
                    <Dialog
                        // className='edit-profile-wrapper'
                        open={openEditProfile}
                        onClose={handleClose}
                        aria-labelledby='form-dialog-title'
                        // fullWidth={true}
                        maxWidth={false}
                    >
                        {/* <DialogTitle id='form-dialog-title'>
                            Edit profile
                        </DialogTitle> */}
                        <div className='edit-profile'>
                            <DialogContent className='left-content'>
                                <div className='side-btns'>
                                    <span className='window-name'>
                                        Edit profile
                                    </span>
                                    <Button>
                                        <FontAwesomeIcon
                                            className='button-icon'
                                            icon={faUser}
                                        />
                                        <span className='button-name'>
                                            Profile
                                        </span>
                                    </Button>
                                    <Button>
                                        <FontAwesomeIcon
                                            className='button-icon'
                                            icon={faTrashAlt}
                                        />
                                        <span className='button-name'>
                                            Delete account
                                        </span>
                                    </Button>
                                </div>
                            </DialogContent>
                            <div className='verticalLine' />
                            <DialogContent className='right-content'>
                                <Button className='close'>
                                    <FontAwesomeIcon
                                        className='close-icon'
                                        icon={faTimes}
                                    />
                                </Button>
                                <div className='form-title'>Profile info</div>
                                <div className='avatar-edit-profile'>
                                    {logo}
                                </div>
                                <div className='form'>
                                    <Formik
                                        initialValues={userData}
                                        validationSchema={Yup.object({
                                            email: Yup.string()
                                                .required('Required')
                                                .email('Invalid email address')
                                                .max(64),
                                            firstName: Yup.string()
                                                .required('Required')
                                                .min(3)
                                                .max(30),
                                            lastName: Yup.string()
                                                .required('Required')
                                                .min(3)
                                                .max(30),
                                        })}
                                        enableReinitialize={true}
                                        onSubmit={(values) => {
                                            handleInfoSubmit(values)
                                        }}
                                    >
                                        {({ values }) => (
                                            <Form className='form-body'>
                                                <div
                                                    className='form-inputs'
                                                    contentEditable='true'
                                                >
                                                    {/* <h3>Profile info</h3> */}
                                                    <div className='input-item'>
                                                        <p>Email</p>
                                                        <Field
                                                            name='email'
                                                            component={
                                                                UserField
                                                            }
                                                            value={values.email}
                                                        />
                                                    </div>
                                                    <div className='input-item'>
                                                        <p>First Name</p>
                                                        <Field
                                                            name='firstName'
                                                            component={
                                                                UserField
                                                            }
                                                            value={
                                                                values.firstName
                                                            }
                                                        />
                                                    </div>
                                                    <div className='input-item'>
                                                        <p>Last Name</p>
                                                        <Field
                                                            name='lastName'
                                                            component={
                                                                UserField
                                                            }
                                                            value={
                                                                values.lastName
                                                            }
                                                        />
                                                    </div>
                                                    <Button
                                                        className='user-btn'
                                                        type='submit'
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={initialValues}
                                        onSubmit={(values) => {
                                            handlePwdSubmit(values)
                                        }}
                                    >
                                        {({ values }) => (
                                            <Form className='form-body'>
                                                <div className='form-inputs'>
                                                    <h3>Change password</h3>
                                                    <div className='top-input pwd-input'>
                                                        <p>New password</p>
                                                        <Field
                                                            name='password'
                                                            component={
                                                                UserField
                                                            }
                                                            value={
                                                                values.password
                                                            }
                                                        />
                                                    </div>
                                                    <div className='top-input pwd-input'>
                                                        <p>Confirm password</p>
                                                        <Field
                                                            name='confirmedPassword'
                                                            component={
                                                                UserField
                                                            }
                                                            value={''}
                                                        />
                                                    </div>
                                                    <Button
                                                        className='user-btn'
                                                        type='submit'
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>

                                {/* <DialogContentText>
                                To subscribe to this website, please enter your
                                email address here. We will send updates
                                occasionally.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin='dense'
                                id='name'
                                label='Email Address'
                                type='email'
                                fullWidth
                            /> */}
                            </DialogContent>
                        </div>
                        <DialogActions>
                            <Button onClick={handleClose} color='primary'>
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color='primary'>
                                Subscribe
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <div
                        className='user-profile-menu'
                        onClick={() => handleLogout()}
                    >
                        <FontAwesomeIcon
                            className='user-icon'
                            icon={faSignOutAlt}
                        />
                        <span className='user-profile-menu-name'>Log out</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserProfile
