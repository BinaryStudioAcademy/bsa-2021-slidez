import React from 'react'
import { PollDto } from '../../../../containers/presentation_session/dto/PollDto'
import './Poll.scss'

type PollProps = {
    poll: PollDto
    children?: JSX.Element
}

const getFrequencies = (items: any[]) => {
    return items.reduce(
        (map: Map<any, number>, e: any) => map.set(e, (map.get(e) || 0) + 1),
        new Map()
    )
}

function Poll({ poll, children }: PollProps) {
    const { name, options, answers } = poll
    const frequencies: Map<string, number> = getFrequencies(answers)
    // @ts-ignore
    const winnerId: string = [...frequencies.entries()]
        .reduce((a, e) =>
            // @ts-ignore
            frequencies.get(e) > frequencies.get(a) ? e : a
        )
        .pop().id

    const totalVotes = answers.length
    const mappedOptions = options.map((option, index) => {
        const currVotes = frequencies.get(option.id) || 0
        const percentage = totalVotes === 0 ? 0 : (currVotes / totalVotes) * 100
        const percentageFormat = String(Math.round(percentage * 10) / 10) + '%'
        const winnerClass = winnerId === option.id ? ' poll-option-winner' : ''

        return (
            <div key={index} className={'poll-option' + winnerClass}>
                <div className='poll-option-title'>{option.name}</div>
                <div className='poll-option-votes'>
                    <div
                        className='poll-option-bar'
                        style={{ width: percentageFormat }}
                    />
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
            {children}
        </div>
    )
}

export default Poll
