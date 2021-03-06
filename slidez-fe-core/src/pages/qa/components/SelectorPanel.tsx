import * as React from 'react'
import './SelectorPanel.scss'

const SelectorPanel = (props: any) => {
    const isRecentSelected =
        'selector-button ' +
        (props.isRecentSelected ? 'selected-button' : 'unselected-button')

    const isTopSelected =
        'selector-button ' +
        (props.isRecentSelected ? 'unselected-button' : 'selected-button')

    return (
        <div className='selector-panel'>
            <div className='selector'>
                <button
                    className={isRecentSelected}
                    onClick={props.handleRecentClick}
                >
                    Recent
                </button>
                <button
                    className={isTopSelected}
                    onClick={props.handleTopClick}
                >
                    Top
                </button>
            </div>{' '}
            <div className='questions-counter'>
                <span> {props.totalQuestions ?? 0} questions</span>
            </div>
        </div>
    )
}

export default SelectorPanel
