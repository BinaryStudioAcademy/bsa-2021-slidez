import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

interface IProps {
    width?: number
    firstName?: string
    lastName?: string
    email: string
}

const getLogoLetters = (
    email: string,
    firstName?: string,
    lastName?: string
) => {
    if (firstName && lastName) {
        return (
            firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
        )
    } else if (email) {
        return email.charAt(0).toUpperCase() + email.charAt(1).toUpperCase()
    } else {
        return 'AN'
    }
}

export const UserLogo: React.FC<IProps> = ({
    width = 50,
    email,
    firstName,
    lastName,
}: IProps) => {
    const [userLetters, setUserLetters] = useState('')

    useEffect(() => {
        setUserLetters(getLogoLetters(email, firstName, lastName))
    }, [email, firstName, lastName])

    return (
        <div className={styles.logo} style={{ width: width, height: width }}>
            <div className={styles.logoLetters} style={{ fontSize: width / 3 }}>
                {userLetters}
            </div>
        </div>
    )
}
