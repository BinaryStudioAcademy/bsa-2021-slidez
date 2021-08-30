import React, { useState } from 'react'
import SubmitButton from './SubmitButton'
import './QAAdd.scss'

export default function QAAdd(props: any) {
    const [charsCounterValue, setCharsCounterValue] = useState(0)

    const charsCount = (e: any) => {
        var currentText = e.target.value
        var characterCount = currentText.length
        setCharsCounterValue(characterCount)
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
                    onChange={(e) => charsCount(e)}
                ></textarea>
            </div>
            <div className='chars-counter'>{charsCounterValue}</div>
            <div>
                <SubmitButton onClick={props.onSubmit}>Submit</SubmitButton>
            </div>
        </div>
    )
}
