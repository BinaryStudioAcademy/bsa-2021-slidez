import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
    createSessionForPresentation,
    initWebSocketSession,
    requestStartPoll,
} from '../../../containers/session/store/store'
import { WsConnectionStatus } from '../../../containers/session/enums/ws-connection-status'
import Loader from '../../../common/components/loader/Loader'
import { CreatePresentationSessionDto } from '../../../services/session/dto/CreatePresentationSessionDto'
import {
    selectConnectionStatus,
    selectCurrentInteractiveElement,
} from '../../../containers/session/store/selectors'
import {
    createStartPollRequest,
    StartPollRequest,
} from '../../../containers/session/event/FrontendEvent'
import NoEvent from '../NoEventPage'
import Header from '../Header'
import {
    InteractiveElement,
    PollDto,
} from '../../../containers/session/dto/InteractiveElement'
import { InteractiveElementType } from '../../../containers/session/enums/InteractiveElementType'
import PresenterPoll from '../../../common/components/interactive-elements/poll/PresenterPoll'
import './presenterPage.scss'
import InteractiveWrapper from '../../../common/components/interactive-elements/interactive-wrapper/InteractiveWrapper'

const useEditorParams = () => {
    const params = new URLSearchParams(useLocation().search)

    //TODO: This are hardcoded developer-specific values
    return {
        presentationLink: params.get('presentationId') ?? 'fffffff',
        slideId: params.get('slideId') ?? 'lol_poll_id',
    }
}

const noCurrentInteraction = () => {
    return (
        <div>
            <Header eventName='' />
            <NoEvent />
        </div>
    )
}

const getBodyContent = (interactiveElement: InteractiveElement) => {
    if (interactiveElement.type === InteractiveElementType.poll) {
        return <PresenterPoll poll={interactiveElement as PollDto} />
    }
    return undefined
}

const PresenterPage: React.FC = () => {
    // @ts-ignore
    const { link } = useParams()
    //TODO: Delete this
    const [startedPoll, setStartedPoll] = useState(false)
    const dispatch = useAppDispatch()
    const { presentationLink, slideId } = useEditorParams()

    useEffect(() => {
        const dto: CreatePresentationSessionDto = {
            presentationLink: presentationLink,
        }
        dispatch(createSessionForPresentation(dto))
    }, [])

    setTimeout(() => {
        if (link && !startedPoll) {
            setStartedPoll(true)
            dispatch(initWebSocketSession(link))
            const params: StartPollRequest = createStartPollRequest(
                link,
                slideId
            )
            setTimeout(() => dispatch(requestStartPoll(params)), 6000)
        }
    }, 3000)

    const connectionStatus = useAppSelector(selectConnectionStatus)
    const currentInteraction = useAppSelector(selectCurrentInteractiveElement)

    if (!currentInteraction) {
        return noCurrentInteraction()
    }

    return (
        <div>
            {connectionStatus !== WsConnectionStatus.CONNECTED && <Loader />}
            <div className='presenter-page-content'>
                <Header eventName={currentInteraction.title} />
                <InteractiveWrapper eventCode={link || ''}>
                    {getBodyContent(currentInteraction)}
                </InteractiveWrapper>
            </div>
        </div>
    )
}

export default PresenterPage
