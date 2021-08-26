import React, { useState } from 'react'
import './styles.scss'
import '../participant-page/participantPage.scss'
import Header from '../participant-page/Header'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@material-ui/core'

const pollOptions = [
    'Integer egestas',
    'Consectetur',
    'Faucibus eu quisque',
    'Duis elementum egestas',
]

const ParticipantView = () => {
    const text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas nibh placerat fermentum?'
    const [question, setQuestion] = useState(text)
    return (
        <div className='events-page'>
            <div className='page-content'>
                <FormControl component='fieldset'>
                    <FormLabel className='question' component='legend'>
                        {question}
                    </FormLabel>
                    <RadioGroup
                        className='radio-area'
                        aria-label='question'
                        name='gender1'
                    >
                        {pollOptions.map((option, index) => (
                            <FormControlLabel
                                className='radio-item'
                                key={index}
                                label={option}
                                control={<Radio />}
                                value={option}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                <button className='btn-submit'>Submit</button>
            </div>
        </div>
    )
}

export default ParticipantView
