import React from 'react'
import './participantView.scss'
import './participantPage.scss'
import Header from '../Header'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
    selectConnectionStatus,
    selectCurrentInteractiveElement,
} from '../../../containers/session/store/selectors'
import { initWebSocketSession } from '../../../containers/session/store/store'
import {
    InteractiveElement,
    PollDto,
} from '../../../containers/session/dto/InteractiveElement'
import { InteractiveElementType } from '../../../containers/session/enums/InteractiveElementType'
import { WsConnectionStatus } from '../../../containers/session/enums/ws-connection-status'
import Loader from '../../../common/components/loader/Loader'
import NoEvent from '../NoEventPage'
import { PollInput } from '../../../common/components/interactive-elements/poll/PollInput'
import { useParams } from 'react-router-dom'

const pollOptions = [
    'Integer egestas',
    'Consectetur',
    'Faucibus eu quisque',
    'Duis elementum egestas',
]

const noCurrentInteraction = (
    <div>
        <Header eventName='' />
        <NoEvent />
    </div>
)

const getBodyContent = (
    interactiveElement: InteractiveElement,
    link: string
) => {
    if (interactiveElement.type === InteractiveElementType.poll) {
        return <PollInput poll={interactiveElement as PollDto} link={link} />
    }
    return undefined
}

const ParticipantView = () => {
    // const text =
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas nibh placerat fermentum?'
    // const [question, setQuestion] = useState(text)
    // return (
    //     <div className='events-page'>
    //         <div className='page-content'>
    //             <FormControl component='fieldset'>
    //                 <FormLabel className='question' component='legend'>
    //                     {question}
    //                 </FormLabel>
    //                 <RadioGroup
    //                     className='radio-area'
    //                     aria-label='question'
    //                     name='gender1'
    //                 >
    //                     {pollOptions.map((option, index) => (
    //                         <FormControlLabel
    //                             className='radio-item'
    //                             key={index}
    //                             label={option}
    //                             control={<Radio />}
    //                             value={option}
    //                         />
    //                     ))}
    //                 </RadioGroup>
    //             </FormControl>
    //             <button className='btn-submit'>Submit</button>
    //         </div>
    //     </div>
    // )
    // @ts-ignore
    const { link } = useParams()
    const dispatch = useAppDispatch()
    if (link) {
        dispatch(initWebSocketSession(link))
    }

    const connectionStatus = useAppSelector(selectConnectionStatus)
    const currentInteraction = useAppSelector(selectCurrentInteractiveElement)
    if (!currentInteraction) {
        return noCurrentInteraction
    }

    const eventName = 'Animate'
    return (
        <div>
            {connectionStatus !== WsConnectionStatus.CONNECTED && <Loader />}
            <div className='participant-poll-content'>
                <Header eventName={eventName} />
                {getBodyContent(currentInteraction, link || '')}
            </div>
        </div>
    )
}

export default ParticipantView
