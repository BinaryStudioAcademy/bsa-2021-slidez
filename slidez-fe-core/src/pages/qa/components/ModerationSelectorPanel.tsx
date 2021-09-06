import * as React from 'react'
import './SelectorPanel.scss'
import QandA from '../../../assets/svgs/QandA.svg'

export type ModerationSelectorPanelProps = {
    isRecentSelected: boolean
    handleRecentClick: () => void
    handleTopClick: () => void
    totalQuestions: number
    isShowingHidden: boolean
    handleChangeVisibilityParameterOfList: () => void
}

const ModerationSelectorPanel = ({
    isRecentSelected,
    handleRecentClick,
    isShowingHidden,
    handleTopClick,
    totalQuestions,
    handleChangeVisibilityParameterOfList,
}: ModerationSelectorPanelProps) => {
    const isRecentSelectedClass =
        'selector-button ' +
        (isRecentSelected ? 'selected-button' : 'unselected-button')

    const isTopSelectedClass =
        'selector-button ' +
        (isRecentSelected ? 'unselected-button' : 'selected-button')

    return (
        <div className='selector-panel'>
            <div className='button-group-holder'>
                <img src={QandA} className='q-and-a-icon' alt='q-and-a' />
                <button
                    className={isRecentSelectedClass}
                    onClick={handleRecentClick}
                >
                    Recent
                </button>
                <button className={isTopSelectedClass} onClick={handleTopClick}>
                    Top
                </button>
                <button
                    className='show-by-visible-group-button'
                    onClick={handleChangeVisibilityParameterOfList}
                >
                    {`Show ${isShowingHidden ? 'displayed' : 'hidden'}`}
                </button>
            </div>{' '}
            <div className='questions-counter'>
                <span> {totalQuestions} questions</span>
            </div>
        </div>
    )
}

export default ModerationSelectorPanel
