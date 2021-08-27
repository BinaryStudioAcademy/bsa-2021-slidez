import React, { useState, useRef, useEffect } from 'react'
import { DropdownUserInfoProps } from '../editProfileTypes'
import '../update.scss'

export const DropdownUserInfo = ({ logo, userData }: DropdownUserInfoProps) => {
    return (
        <div className='user-info'>
            <div className='avatar'> {logo} </div>
            <div>
                <div className='user-name'>
                    {userData.firstName}&nbsp;
                    {userData.lastName}
                </div>
                <div className='user-email'> {userData.email} </div>
            </div>
        </div>
    )
}
