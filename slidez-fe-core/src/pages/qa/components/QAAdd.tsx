import React, { useState } from 'react'
import SubmitButton from './SubmitButton'
import './QAAdd.scss'

export type QAAddProps = {
    onSubmit: (text: string) => void
}

export default function QAAdd({ onSubmit }: QAAddProps) {
    const [charsCounterValue, setCharsCounterValue] = useState(0)
    const [text, setText] = useState('')

    const handleSettingText = (e: any) => {
        setCharsCounterValue(e.target.value.length)
        setText(e.target.value)
    }

    const handleSubmit = () => {
        if (text.length > 0) {
            onSubmit(text)
            setText('')
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
                    name='question'
                    onChange={(e) => handleSettingText(e)}
                    value={text}
                />
            </div>
            <div className='chars-counter'>{charsCounterValue}</div>

            <SubmitButton onClick={handleSubmit} textValue={text} value='Save'>
                Submit
            </SubmitButton>
        </div>
    )
}
