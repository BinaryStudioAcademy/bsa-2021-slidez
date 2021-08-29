import * as React from 'react'

export default function QACard(props: any) {
    return (
        <button
            type='submit'
            onClick={props.onClick}
            className='btn-submit form-button'
        >
            Submit
        </button>
    )
}
