import * as React from 'react'
import '../qa.scss'

const SelectorPanel = (props: any) => {
    return (
        <div className='selector-panel'>
            <div className='selector'>
                <button
                    className='selector-button selected-button'
                    onClick={props.handleRecentClick}
                >
                    Recent
                </button>
                <button
                    className='selector-button unselected-button'
                    onClick={props.handleTopClick}
                >
                    Top
                </button>
            </div>{' '}
            <div className='questions-counter'>
                <span> {props.totalQuestions} questions</span>
            </div>
        </div>
    )
}

export default SelectorPanel
