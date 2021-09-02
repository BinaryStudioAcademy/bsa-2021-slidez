import React, { useState } from 'react'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@material-ui/core'
import { PollDto } from '../../../../containers/session/dto/InteractiveElement'
import { PollOptionDto } from '../../../../containers/session/dto/PollOptionDto'
import { useAppDispatch } from '../../../../hooks'
import { SessionPollAnswer } from '../../../../containers/session/model/SessionPollAnswer'
import {
    AnswerPollRequest,
    createAnswerPollRequest,
} from '../../../../containers/session/event/FrontendEvent'
import { answerPoll } from '../../../../containers/session/store/store'

export type ParticipantPollProps = {
    poll: PollDto
    link: string
}

const ParticipantPoll = ({ poll, link }: ParticipantPollProps) => {
    const [chosenOption, setChosenOption] = useState<PollOptionDto | undefined>(
        undefined
    )
    const [isAnswerSent, setIsAnswerSent] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const onSendClick = () => {
        if (!chosenOption) {
            return
        }
        const pollAnswer: SessionPollAnswer = {
            pollId: poll.id,
            optionId: chosenOption.id,
        }
        const answerPollRequest: AnswerPollRequest = createAnswerPollRequest(
            link,
            pollAnswer
        )
        if (!isAnswerSent) {
            setIsAnswerSent(true)
            dispatch(answerPoll(answerPollRequest))
        }
    }

    return (
        <div className='events-page'>
            <div className='page-content'>
                <FormControl component='fieldset'>
                    <FormLabel className='question' component='legend'>
                        {poll.title}
                    </FormLabel>
                    <RadioGroup
                        className='radio-area'
                        aria-label='question'
                        name='gender1'
                    >
                        {poll.options.map(
                            (option: PollOptionDto, index: number) => (
                                <FormControlLabel
                                    className='radio-item'
                                    key={index}
                                    label={option.title}
                                    control={<Radio />}
                                    value={option.title}
                                    onChange={() => {
                                        setChosenOption(option)
                                    }}
                                />
                            )
                        )}
                    </RadioGroup>
                </FormControl>
                <button className='btn-submit' onClick={onSendClick}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default ParticipantPoll
