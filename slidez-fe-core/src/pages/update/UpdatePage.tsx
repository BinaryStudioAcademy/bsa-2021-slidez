import React, { FC, useEffect, useRef, useState } from 'react'
import { Button } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { UserField } from './Field'
import axios from 'axios'
import { HttpHelper } from '../../services/http/http-helper'
import { useDetectOutsideClick } from '../dashboard/useDetectOutsideClick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faCog,
    faSignOutAlt,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import SideBar from '../dashboard/SideBar'
import '../dashboard/dashboard.scss'
import './update.scss'
import { AppRoute } from '../../common/routes/app-route'

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
}

const UpdatePage = () => {
    const dropdownRef = useRef<HTMLInputElement>(null)
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)

    const handleDropDown = () => {
        setIsActive(!isActive)
    }

    const initialValues: User = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }

    const [userData, setUserData] = useState<User>(initialValues)

    const handleInfoSubmit = (values: typeof userData) => {
        console.log(values)
    }

    const handlePwdSubmit = (values: typeof userData) => {
        console.log(values)
    }
    return (
        <div className='dashboard-page'>
            <SideBar></SideBar>
            <div className='page-content'>
                <div className='search-and-user'>
                    <div className='user-profile'>
                        <div className='user-avatar'>
                            <div onClick={handleDropDown} className='avatar'>
                                WH
                            </div>
                            <div
                                ref={dropdownRef}
                                className={`dropdown-content ${
                                    isActive ? 'active' : 'inactive'
                                }`}
                            >
                                <div className='user-info'>
                                    <div className='avatar'>WH</div>
                                    <div>
                                        <div className='user-name'>
                                            Wilson Herwitz
                                        </div>
                                        <div className='user-email'>
                                            herwitz@example.com
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                                <a href={AppRoute.UPDATE_USER}>
                                    <FontAwesomeIcon
                                        className='user-icon'
                                        icon={faUser}
                                    />
                                    Edit profile
                                </a>
                                <a href=''>
                                    <FontAwesomeIcon
                                        className='user-icon'
                                        icon={faCog}
                                    />
                                    Setting
                                </a>
                                <a href=''>
                                    <FontAwesomeIcon
                                        className='user-icon'
                                        icon={faSignOutAlt}
                                    />
                                    Log out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='edit-profile'>
                <div className='side-btns'>
                    <h2 id='window-name'>Edit profile</h2>
                    <Button>Profile</Button>
                    <Button>Delete account</Button>
                </div>
                <div className='verticalLine' />
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
                                <div className='form-inputs'>
                                    <h3>Profile info</h3>
                                    <div className='top-input'>
                                        <p>Email</p>
                                        <Field
                                            name='email'
                                            component={UserField}
                                            value={values.email}
                                        />
                                    </div>
                                    <div className='bottom-inputs'>
                                        <div>
                                            <p>First Name</p>
                                            <Field
                                                name='firstName'
                                                component={UserField}
                                                value={values.firstName}
                                            />
                                        </div>
                                        <div>
                                            <p>Last Name</p>
                                            <Field
                                                name='lastName'
                                                component={UserField}
                                                value={values.lastName}
                                            />
                                        </div>
                                    </div>
                                    <Button className='user-btn' type='submit'>
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
                                            component={UserField}
                                            value={values.password}
                                        />
                                    </div>
                                    <div className='top-input pwd-input'>
                                        <p>Confirm password</p>
                                        <Field
                                            name='confirmedPassword'
                                            component={UserField}
                                            value={''}
                                        />
                                    </div>
                                    <Button className='user-btn' type='submit'>
                                        Save
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <Button className='close'>
                    <FontAwesomeIcon className='close-icon' icon={faTimes} />
                </Button>
            </div>
        </div>
    )
}

export default UpdatePage
