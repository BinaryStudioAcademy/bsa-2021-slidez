import React from 'react'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@material-ui/core'
import { PollDto } from '../../../../containers/session/dto/InteractiveElement'
import { PollOptionDto } from '../../../../containers/session/dto/PollOptionDto'

export type ParticipantPollProps = {
    poll: PollDto
    link: string
}

const ParticipantPoll = ({ poll, link }: ParticipantPollProps) => {
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
                                />
                            )
                        )}
                    </RadioGroup>
                </FormControl>
                <button className='btn-submit'>Submit</button>
            </div>
        </div>
    )
}

export default ParticipantPoll
