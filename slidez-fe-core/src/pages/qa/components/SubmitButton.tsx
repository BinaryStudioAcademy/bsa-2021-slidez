import * as React from 'react'

export default function QACard(props: any) {
    return (
        <button
            type='submit'
            onClick={() => props.onClick(props.textValue)}
            className='qaadd-submit'
        >
            Submit
        </button>
    )
}
