import React from 'react'
import { PollDto } from '../../../../containers/session/dto/InteractiveElement'
import './presenterPoll.scss'
import { PollAnswerDto } from '../../../../containers/session/dto/PollAnswerDto'
import checked_icon from '../../../../assets/svgs/check.svg'

type PollProps = {
    poll: PollDto
    children?: JSX.Element
}

const getMapItemsToItemsCount = (items: any[]) => {
    //@ts-ignore
    const out: Map<any, number> = new Map()
    for (const item of items) {
        const itemCount: number = out.get(item) || 0
        out.set(item, itemCount + 1)
    }
    return out
}

const getItemWithBiggestCount = (itemsToCountMap: Map<any, number>): any => {
    if (itemsToCountMap.size === 0) {
        return undefined
    }
    let out = itemsToCountMap.keys().next()
    let outValue = itemsToCountMap.get(out) || 0
    for (const [key, value] of itemsToCountMap) {
        if (value > outValue) {
            out = key
            outValue = value
        }
    }
    return out
}

const PresenterPoll = ({ poll, children }: PollProps) => {
    const itemsToItemsCount: Map<string, number> = getMapItemsToItemsCount(
        poll.answers.map((answer: PollAnswerDto) => answer.optionId)
    )
    const winnerId: string = getItemWithBiggestCount(itemsToItemsCount)

    const totalVotes: number = poll.answers.length

    const mappedOptions = poll.options.map((option, index) => {
        const optionCount: number = itemsToItemsCount.get(option.id) || 0
        const percentage: number =
            totalVotes === 0 ? 0 : (optionCount / totalVotes) * 100
        const percentageFormat = String(Math.round(percentage * 10) / 10) + '%'
        const winnerClass = winnerId === option.id ? ' poll-option-winner' : ''

        return (
            <div key={index} className={'poll-option' + winnerClass}>
                <div className='poll-option-title'>{option.title}</div>
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
                <div className='poll-name'>
                    <img src={checked_icon} alt='graph'></img>
                    {poll.title}
                </div>
                <div className='poll-votes'>{totalVotes} votes</div>
            </div>
            <div className='poll-options'>{mappedOptions}</div>
            {children}
        </div>
    )
}

export default PresenterPoll
