import React, { useState } from 'react'
import './styles.scss'
import '../participant-page/participantPage.scss'
import Header from '../participant-page/Header'
import Qa from '../qa/Qa'
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

    const [showQAModal, setShowQAModal] = useState(false)

    const handleQAClose = () => {
        setShowQAModal(false)
    }
    const handleQAShow = () => {
        setShowQAModal(true)
    }
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
                <button
                    className='btn-open-qa'
                    type='button'
                    onClick={() => handleQAShow()}
                >
                    Open Q&amp;A page
                </button>
                <Qa show={showQAModal} handleClose={handleQAClose}></Qa>
            </div>
        </div>
    )
}

export default ParticipantView
