import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { PollDto } from './dto/PollDto'
import Poll from './Poll'
import './PollInput.scss'
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons'

type PollInputProps = {
    poll: PollDto
}

function PollInput({ poll }: PollInputProps) {
    const [voteSubmitted, setVoteSubmitted] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [chosenOption, setChosenOption] = useState(-1)

    const { name, options, answers } = poll

    let totalVotes = 0
    for (let k in answers) {
        totalVotes += answers[k].length
    }

    const mappedOptions = options.map((option, index) => {
        const chosenClass =
            index === chosenOption ? ' poll-input-option-chosen' : ''
        const circle =
            index === chosenOption ? (
                <FontAwesomeIcon icon={faDotCircle} />
            ) : (
                <FontAwesomeIcon icon={faCircle} />
            )

        return (
            <div
                key={index}
                className={'poll-input-option' + chosenClass}
                onClick={() => setChosenOption(index)}
            >
                <div className='poll-input-option-circle'>{circle}</div>
                <div className='poll-input-option-title'>{option.name}</div>
            </div>
        )
    })

    const onSendClick = () => {
        if (chosenOption === -1) {
            return
        }
        if (!voteSubmitted) {
            // post to db
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
                    <div className='poll-name'>{name}</div>
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
                <div className='poll-name'>{name}</div>
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
