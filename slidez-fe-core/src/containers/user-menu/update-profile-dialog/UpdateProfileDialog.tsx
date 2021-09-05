import React, { useState } from 'react'
import { selectUserDetails } from '../../user/store'
import { useAppSelector } from '../../../hooks'

import { ReactComponent as TrashIcon } from '../../../assets/svgs/trash.svg'
import { ReactComponent as UserIcon } from '../../../assets/svgs/user.svg'
import { ReactComponent as CrossIcon } from '../../../assets/svgs/cross.svg'

import styles from './styles.module.scss'
import '../edit-profile/components/Form.scss'
import { UserDetailsDto } from '../../user/dto/UserDetailsDto'
import { Button, Dialog, DialogContent } from '@material-ui/core'
import FormUpdateUserData from '../edit-profile/components/FormUpdateUserData'
import FormUpdatePassword from '../edit-profile/components/FormUpdatePassword'
import DeleteAccount from '../delete-account/DeleteAccount'
import { UserLogo } from '../../../common/components/user-logo/UserLogo'

export const initialValuesUserData: UserDetailsDto = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
}

interface IProps {
    isDialogOpened: boolean
    onDialogClose: () => void
}

const UpdateProfileDialog: React.FC<IProps> = ({
    isDialogOpened,
    onDialogClose,
}: IProps) => {
    const [showModal, setShowModal] = useState(false)
    const userData = useAppSelector(selectUserDetails) || initialValuesUserData

    const hideDeleteAccountModal = () => {
        setShowModal(false)
    }
    const showDeleteAccountModal = () => {
        setShowModal(true)
    }

    return (
        <Dialog
            open={isDialogOpened}
            onClose={onDialogClose}
            aria-labelledby='form-dialog-title'
            maxWidth={false}
            className={styles.dialog}
        >
            <div className={styles.editProfile}>
                <DialogContent className={styles.leftContent}>
                    <div className={styles.leftContentFixed}>
                        <div className={styles.sideBtns}>
                            <p className={styles.windowName}> Edit profile </p>
                            <Button>
                                <UserIcon className={styles.buttonIcon} />
                                <span className={styles.buttonName}>
                                    Profile
                                </span>
                            </Button>
                            <DeleteAccount
                                modalState={showModal}
                                handleClose={hideDeleteAccountModal}
                            />
                            <Button onClick={showDeleteAccountModal}>
                                <TrashIcon className={styles.buttonIcon} />
                                <span className={styles.buttonName}>
                                    Delete account
                                </span>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
                <DialogContent className={styles.rightContent}>
                    <Button className={styles.close} onClick={onDialogClose}>
                        <CrossIcon className={styles.closeIcon} />
                    </Button>
                    <div className={styles.formTitle}>Profile info</div>
                    <UserLogo
                        email={userData.email}
                        firstName={userData.firstName}
                        lastName={userData.lastName}
                        width={100}
                    />
                    <div className={styles.form}>
                        <FormUpdateUserData />
                        <FormUpdatePassword />
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    )
}
export default UpdateProfileDialog
