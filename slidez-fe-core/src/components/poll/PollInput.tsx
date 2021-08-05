import React from 'react'
import { PollDto } from './dto/PollDto'
import './PollInput.scss'

type PollInputProps = {
    poll: PollDto
}

function PollInput({ poll }: PollInputProps) {
    const { name, options, answers } = poll

    let [prevCount, currCount, totalVotes, winnerIndex] = [0, 0, 0, -1]
    for (let k in answers) {
        currCount = answers[k].length
        totalVotes += currCount
        winnerIndex = currCount > prevCount ? Number(k) : winnerIndex
        prevCount = currCount
    }

    const mappedOptions = options.map((option, index) => {
        const currVotes = answers[index].length
        const percentage = totalVotes === 0 ? 0 : (currVotes / totalVotes) * 100
        const percentageFormat = String(Math.round(percentage * 10) / 10) + '%'
        const winnerClass = index === winnerIndex ? 'poll-option-winner' : ''

        return (
            <div key={index} className={'poll-option ' + winnerClass}>
                <div className='poll-option-title'>{option.title}</div>
                <div className='poll-option-votes'>
                    <div
                        className='poll-option-bar'
                        style={{ width: percentageFormat }}
                    ></div>
                    <div className='poll-option-percent'>
                        {percentageFormat}
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
        </div>
    )
}

export default PollInput
