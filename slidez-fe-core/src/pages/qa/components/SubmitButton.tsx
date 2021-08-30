import * as React from 'react'

export default function QACard(props: any) {
    return (
        <button type='submit' onClick={props.onClick} className='qaadd-submit'>
            Submit
        </button>
    )
}
