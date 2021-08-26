import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { PollDto } from '../../../../containers/presentation_session/dto/InteractiveElement'
import Poll from './Poll'
import './PollInput.scss'
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons'
import { useAppDispatch } from '../../../../hooks'
import {
    AnswerPollEvent,
    DomainEventType,
} from '../../../../containers/presentation_session/event/DomainEvent'
import { answerPoll } from '../../../../containers/presentation_session/store/store'

type PollInputProps = {
    poll: PollDto
    link: string
}

function PollInput({ poll, link }: PollInputProps) {
    const [voteSubmitted, setVoteSubmitted] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [chosenOptionIndex, setChosenOptionIndex] = useState(-1)
    const dispatch = useAppDispatch()

    const { id, title, options, answers } = poll

    let totalVotes = answers.length

    const mappedOptions = options.map((option, index) => {
        const chosenClass =
            index === chosenOptionIndex ? ' poll-input-option-chosen' : ''
        const circle =
            index === chosenOptionIndex ? (
                <FontAwesomeIcon icon={faDotCircle} />
            ) : (
                <FontAwesomeIcon icon={faCircle} />
            )

        return (
            <div
                key={index}
                className={'poll-input-option' + chosenClass}
                onClick={() => setChosenOptionIndex(index)}
            >
                <div className='poll-input-option-circle'>{circle}</div>
                <div className='poll-input-option-title'>{option.title}</div>
            </div>
        )
    })

    const onSendClick = () => {
        if (chosenOptionIndex === -1) {
            return
        }
        if (!voteSubmitted) {
            // post to db
            const answerPollEvent: AnswerPollEvent = {
                type: DomainEventType.answerPollEvent,
                pollAnswer: {
                    pollId: id,
                    optionId: options[chosenOptionIndex].id,
                },
            }
            dispatch(answerPoll(answerPollEvent))
            setVoteSubmitted(true)
        } else {
            // update existing in db
            setEditMode(false)
        }
    }

    const onEditClick = () => {
        setEditMode(true)
    }

    const onCancelClick = () => {
        setEditMode(false)
    }

    if (!voteSubmitted) {
        return (
            <div className='poll'>
                <div className='poll-header'>
                    <div className='poll-name'>{title}</div>
                    <div className='poll-votes'>{totalVotes} votes</div>
                </div>
                <div className='poll-input-options'>{mappedOptions}</div>
                <div className='poll-input-send'>
                    <button
                        className='poll-input-button poll-input-send-button'
                        onClick={onSendClick}
                    >
                        Send
                    </button>
                </div>
            </div>
        )
    }
    if (!editMode) {
        return (
            <Poll poll={poll}>
                <div className='poll-input-edit'>
                    <button
                        className='poll-input-button poll-input-edit-button'
                        onClick={onEditClick}
                    >
                        Edit response
                    </button>
                </div>
            </Poll>
        )
    }
    return (
        <div className='poll'>
            <div className='poll-header'>
                <div className='poll-name'>{title}</div>
                <div className='poll-votes'>{totalVotes} votes</div>
            </div>
            <div className='poll-input-options'>{mappedOptions}</div>
            <div className='poll-input-edit'>
                <button
                    className='poll-input-button poll-input-cancel-button'
                    onClick={onCancelClick}
                >
                    Cancel
                </button>
                <button
                    className='poll-input-button poll-input-send-button'
                    onClick={onSendClick}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default PollInput
