import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SubmitButton from './SubmitButton'
import Card from '@material-ui/core/Card'
import './QAAdd.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '10px',
        backgroundColor: '#F6F4F8',
        '& .MuiPaper-root': {
            borderRadius: '5px 10px',
            display: 'flex',
            flexDirection: 'row',
        },
        '& .MuiDialog-paperWidthSm': {
            maxWidth: 'calc(100% - 16px)',
        },
        '& .MuiDialog-paperScrollPaper': {
            maxHeight: 'calc(100% - 16px)',
        },
        '& .MuiDialog-paper': {
            margin: '5px',
        },
        '&  .MuiCardContent-root': {
            padding: '0px',
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
        '& .MuiInputBase-root': {
            marginRight: '10px',
        },
        '& .MuiOutlinedInput-multiline, .MuiInputBase-input': {
            padding: '3px',
            height: '60px',
        },
        '&  .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
    },
}))

export default function QAAdd(props: any) {
    const classes = useStyles()
    const [value, setValue] = React.useState('Controlled')

    return (
        <Card classes={classes}>
            <div className='qaadd'>
                <TextField
                    classes={classes}
                    placeholder='Write your question...'
                    multiline
                    variant='outlined'
                />
                <div>
                    <SubmitButton onClick={props.onSubmit} color='primary'>
                        Submit
                    </SubmitButton>
                </div>
            </div>
        </Card>
    )
}
