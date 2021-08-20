import React from 'react'
import { useState } from 'react'
import { PollDto } from './dto/PollDto'
import './Poll.scss'

type PollProps = {
    poll: PollDto
    children?: JSX.Element
}

function Poll({ poll, children }: PollProps) {
    const { name, options, answers } = poll
    const [width, setWidth] = useState('0')

    const votesCount = Object.values(answers).map((answ) => answ.length)
    const maxVotes = Math.max(...votesCount) ?? 0
    const totalVotes = votesCount.reduce((a, b) => a + b, 0)
    const winnerIndexes = Object.entries(answers)
        .filter(([id, ans]) => ans.length === maxVotes && ans.length > 0)
        .map(([id]) => Number(id))

    const mappedOptions = options.map((option, index) => {
        const currVotes = answers[index].length
        const percentage = totalVotes === 0 ? 0 : (currVotes / totalVotes) * 100
        const percentageFormat = String(Math.round(percentage * 10) / 10) + '%'
        const animatePercent = () => {
            requestAnimationFrame(() => {
                setWidth( (width) => (width = percentageFormat))
            })
        }
        const winnerClass = winnerIndexes.includes(index)
            ? ' poll-option-winner'
            : ''

        return (
            <div key={index} className={'poll-option' + winnerClass}>
                <div className='poll-option-title'>{option.title}</div>
                <div className='poll-option-votes'>
                    <div
                        className='poll-option-bar'
                        style={{ width: percentageFormat }}
                    />
                    <div className='poll-option-percent'>
                        {animatePercent}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className='poll'>
            <div className='poll-header'>
                <div className='poll-name'>{name}</div>
                <div className='poll-votes'>{totalVotes} votes</div>
            </div>
            <div className='poll-options'>{mappedOptions}</div>
            {children}
        </div>
    )
}

export default Poll
