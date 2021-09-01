import React, { useState } from 'react'
import SubmitButton from './SubmitButton'
import './QAAdd.scss'

export default function QAAdd(props: any) {
    const [charsCounterValue, setCharsCounterValue] = useState(0)
    const [textValue, setTextValue] = useState('')

    const charsCount = (e: any) => {
        setCharsCounterValue(e.target.value.length)
        setTextValue(e.target.value)
    }

    const handleSubmit = () => {
        if (textValue.length > 0) {
            props.onSubmit(textValue)
            const textField: any = document.getElementById('qaadd-text')
            textField.value = ''
            setTextValue('')
            setCharsCounterValue(0)
        }
    }

    return (
        <div className='qaadd'>
            <div>
                <span className='qaadd-title'>Write your question...</span>
            </div>

            <div>
                <textarea
                    className='qaadd-text'
                    id='qaadd-text'
                    name='question'
                    onChange={(e) => charsCount(e)}
                ></textarea>
            </div>
            <div className='chars-counter'>{charsCounterValue}</div>

            <SubmitButton
                onClick={handleSubmit}
                textValue={textValue}
                value='Save'
            >
                Submit
            </SubmitButton>
        </div>
    )
}
