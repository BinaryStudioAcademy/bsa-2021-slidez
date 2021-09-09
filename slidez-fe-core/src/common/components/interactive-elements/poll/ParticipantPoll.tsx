import React, { useEffect, useState } from 'react'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@material-ui/core'
import check from '../../../../assets/svgs/checked_icon.svg'
import { PollDto } from '../../../../containers/session/dto/InteractiveElement'
import { PollOptionDto } from '../../../../containers/session/dto/PollOptionDto'
import { useAppDispatch } from '../../../../hooks'
import { SessionPollAnswer } from '../../../../containers/session/model/SessionPollAnswer'
import {
    AnswerPollRequest,
    createAnswerPollRequest,
} from '../../../../containers/session/event/FrontendEvent'
import { answerPoll } from '../../../../containers/session/store/store'
import Loader from '../../loader/Loader'
import { ParticipantData } from '../../../../services/participant/dto/ParticipantData'
import { getParticipantData } from '../../../../services/participant/participant-service'

export type ParticipantPollProps = {
    poll: PollDto
    link: string
}

const ParticipantPoll = ({ poll, link }: ParticipantPollProps) => {
    const [chosenOption, setChosenOption] = useState<PollOptionDto | undefined>(
        undefined
    )
    const participantData: ParticipantData = getParticipantData()
    const [isAnswerSent, setIsAnswerSent] = useState<boolean>(false)
    const [showLoader, setShowLoader] = useState<boolean>(true)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (participantData.id) {
            const listOfAnsweredBy: string[] = poll.answers.map(
                (a) => a.answeredBy
            )
            setIsAnswerSent(listOfAnsweredBy.includes(participantData.id))
        }
    }, [poll])

    const onSendClick = () => {
        if (!chosenOption || !participantData.id) {
            return
        }
        const pollAnswer: SessionPollAnswer = {
            pollId: poll.id,
            optionId: chosenOption.id,
            answeredBy: participantData.id,
        }
        const answerPollRequest: AnswerPollRequest = createAnswerPollRequest(
            link,
            pollAnswer
        )
        if (!isAnswerSent) {
            setIsAnswerSent(true)
            setShowLoader(true)
            setTimeout(() => setShowLoader(false), 2000)
            dispatch(answerPoll(answerPollRequest))
        }
    }

    const loaderOrCheck = showLoader ? (
        <Loader />
    ) : (
        <img src={check} alt='check' />
    )

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
                                    className={`radio-item ${
                                        chosenOption == option ? 'active' : ''
                                    }`}
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
                    <div className='btn-submit-text'>Submit</div>
                    <div className='btn-submit-icon'>
                        {isAnswerSent && loaderOrCheck}
                    </div>
                </button>
            </div>
        </div>
    )
}

export default ParticipantPoll
