import React, { useState } from 'react'
import './participantPage.scss'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
    initWebSocketSession,
    selectConnectionStatus,
    selectSnapshot,
} from '../../containers/presentation_session/store'
import { WsConnectionStatus } from '../../containers/presentation_session/enums/ws-connection-status'
import Loader from '../../common/components/loader/Loader'
import InteractiveWrapper from '../../common/components/interactive-elements/interactive-wrapper/InteractiveWrapper'
import PollInput from '../../common/components/interactive-elements/poll/PollInput'
import { useParams } from 'react-router-dom'

// const ParticipantPage = () => {
//     const [listQuestions, setListQuestions] = useState(MOCK_DATA)
//     const [title, setTitle] = useState('Select event')
//
//     const createEndpoint = (id: number) => '/#/event/' + id
//
//     const lastViewsDate = (date: string) => {
//         const diffDate = moment(date, 'YYYY-MM-DD HH:mm:ss').fromNow()
//         return 'watched ' + diffDate
//     }
//
//     return (
//         <div className='participant-page'>
//             <Header></Header>
//             {/* <div className='menu'>
//                 <FontAwesomeIcon className='menu-icon' icon={faBars} />
//             </div> */}
//             <div className='title'> {title} </div>
//             <div className='page-content'>
//                 {listQuestions.map((event) => (
//                     <div className='event-item' key={event.id}>
//                         <div className='event-info'>
//                             <div className='event-info-name'>{event.name}</div>
//                             <div className='event-info-viewsDate'>
//                                 {lastViewsDate(event.viewsDate)}
//                             </div>
//                         </div>
//                         <a
//                             className='event-icon'
//                             href={createEndpoint(event.id)}
//                         >
//                             <FontAwesomeIcon
//                                 className='angle-right'
//                                 icon={faAngleRight}
//                             />
//                         </a>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

const ParticipantPage = () => {
    const { link } = useParams<{ link?: string }>()
    const [sentInitWsSession, setSentInitWsSession] = useState(false)
    const dispatch = useAppDispatch()
    if (link !== undefined && !sentInitWsSession) {
        setSentInitWsSession(true)
        dispatch(initWebSocketSession(link))
    }

    const connectionStatus = useAppSelector(selectConnectionStatus)
    const snapshot = useAppSelector(selectSnapshot)

    const activePoll = snapshot?.polls.find((poll) => poll)

    const body = activePoll ? (
        <PollInput poll={activePoll as any} />
    ) : (
        <>Waiting for an interaction to start...</>
    )
    return (
        <div>
            {connectionStatus !== WsConnectionStatus.CONNECTED && <Loader />}
            <InteractiveWrapper eventCode={link || ''}>{body}</InteractiveWrapper>
        </div>
    )
}

export default ParticipantPage
