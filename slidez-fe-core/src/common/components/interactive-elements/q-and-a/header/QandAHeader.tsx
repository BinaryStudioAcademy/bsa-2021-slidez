import React from 'react'
import '../styles.qa.scss'
import q_and_a from '../../../../../assets/svgs/QandA.svg'

type QandAHeaderProps = {
    questionCount: number
}

//TODO: Change icon to the one in spec
export const QandAHeader = ({ questionCount }: QandAHeaderProps) => {
    return (
        <div className='q-and-a-header'>
            <img src={q_and_a} alt='qa' />
            <div className='top-questions'>Top questions</div>
            <div className='question-count'>({questionCount})</div>
        </div>
    )
}
