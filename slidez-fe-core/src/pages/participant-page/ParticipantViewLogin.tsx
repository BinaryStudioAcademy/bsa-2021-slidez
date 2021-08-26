import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const LoginDialog = () => {
    return (
        <Dialog
            open={true}
            // onClose={handleClose}
            aria-labelledby='form-dialog-title'
        >
            <DialogTitle id='form-dialog-title'>How to name you?</DialogTitle>
            <DialogContent>
                <form className='form'>
                    <div className='form-row form-input-holder'>
                        <label htmlFor='firstName' className='label'>
                            First Name
                        </label>
                        <input
                            name='firstName'
                            className={'form-input'}
                            type='text'
                        />
                    </div>

                    <div className='form-row form-input-holder'>
                        <div className='row-with-components-on-opposite-sides'>
                            <label htmlFor='lastName' className='label'>
                                Last Name
                            </label>
                        </div>
                        <input
                            id='lastName-input'
                            name='lastName'
                            className={'form-input'}
                        />
                    </div>

                    <div className='form-row buttons-row'>
                        <button
                            className='form-button login-button'
                            type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog
