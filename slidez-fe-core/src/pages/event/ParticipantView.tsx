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
                        <FormControlLabel
                            className='radio-item'
                            label='Integer egestas'
                            control={<Radio />}
                            value='option1'
                        />
                        <FormControlLabel
                            className='radio-item'
                            label='Consectetur'
                            control={<Radio />}
                            value='option2'
                        />
                        <FormControlLabel
                            className='radio-item'
                            label='Faucibus eu quisque'
                            control={<Radio />}
                            value='option3'
                        />
                        <FormControlLabel
                            className='radio-item'
                            label='Duis elementum egestas '
                            control={<Radio />}
                            value='option4'
                        />
                    </RadioGroup>
                </FormControl>
                <button className='btn-submit'>Submit</button>
                {/* create button q&a*/}
            </div>
        </div>
    )
}

export default ParticipantView
