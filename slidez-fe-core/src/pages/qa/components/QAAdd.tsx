import React from 'react'
import TextField from '@material-ui/core/TextField'
import SubmitButton from './SubmitButton'
import Card from '@material-ui/core/Card'
import './QAAdd.scss'

export default function QAAdd(props: any) {
    const [value, setValue] = React.useState('Controlled')

    return (
        <div className='qaadd'>
            <div>
                <span className='qaadd-title'>Write your question...</span>
            </div>
            <div>
                <textarea className='qaadd-text' name='question'></textarea>
            </div>
            <div>
                <SubmitButton onClick={props.onSubmit}>Submit</SubmitButton>
            </div>
        </div>
    )
}
