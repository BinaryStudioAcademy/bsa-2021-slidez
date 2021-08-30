import React, { useState, useRef, useEffect } from 'react'
import { UserDetailsDto } from '../../../../../containers/user/dto/UserDetailsDto'
import { DropdownUserInfoProps } from '../editProfileTypes'
import './DropdownUserInfo.scss'

const viewName = (userData: UserDetailsDto) => {
    if (userData.firstName && userData.lastName) {
        return (
            <div className='user-name'>
                {userData.firstName}&nbsp;
                {userData.lastName}
            </div>
        )
    }
}

export const DropdownUserInfo = ({ logo, userData }: DropdownUserInfoProps) => {
    return (
        <div className='user-info'>
            <div className='avatar'> {logo} </div>
            <div>
                {viewName}
                <div className='user-email'> {userData.email} </div>
            </div>
        </div>
    )
}
