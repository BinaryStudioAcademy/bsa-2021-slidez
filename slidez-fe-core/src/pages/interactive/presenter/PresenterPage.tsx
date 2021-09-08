import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
    initWebSocketSession,
    requestStartPoll,
} from '../../../containers/session/store/store'
import { WsConnectionStatus } from '../../../containers/session/enums/ws-connection-status'
import Loader from '../../../common/components/loader/Loader'
import {
    selectConnectionStatus,
    selectCurrentInteractiveElement,
    selectQASession,
} from '../../../containers/session/store/selectors'
import {
    createStartPollRequest,
    StartPollRequest,
} from '../../../containers/session/event/FrontendEvent'
import {
    InteractiveElement,
    PollDto,
    QASessionDto,
} from '../../../containers/session/dto/InteractiveElement'
import { InteractiveElementType } from '../../../containers/session/enums/InteractiveElementType'
import PresenterPoll from '../../../common/components/interactive-elements/poll/PresenterPoll'
import './presenterPage.scss'
import InteractiveWrapper from '../../../common/components/interactive-elements/interactive-wrapper/InteractiveWrapper'
import { QandA } from '../../../common/components/interactive-elements/q-and-a/QandA'

const useEditorParams = () => {
    const params = new URLSearchParams(useLocation().search)

    //TODO: This are hardcoded developer-specific values
    return {
        presentationLink: params.get('presentationId') ?? 'fffffff',
        slideId: params.get('slideId') ?? 'lol_poll_id',
    }
}

const noCurrentInteraction = (link: string) => {
    return (
        <div className='interactive-wrapper'>
            <InteractiveWrapper eventCode={link}>
                <div className='presenter-event-loader'>
                    <Loader />
                </div>
            </InteractiveWrapper>
        </div>
    )
}

const getInteractiveContent = (interactiveElement: InteractiveElement) => {
    if (interactiveElement.type === InteractiveElementType.poll) {
        return <PresenterPoll poll={interactiveElement as PollDto} />
    }
    return undefined
}

const PresenterPage: React.FC = () => {
    const { link = '' } = useParams<{ link: string | undefined }>()
    const dispatch = useAppDispatch()
    const { presentationLink, slideId } = useEditorParams()
    const connectionStatus = useAppSelector(selectConnectionStatus)
    const currentInteraction = useAppSelector(selectCurrentInteractiveElement)
    const currentQASession: QASessionDto | undefined | null =
        useAppSelector(selectQASession)

    useEffect(() => {
        dispatch(initWebSocketSession(link))
        //TODO: Dispatch event to finish current interaction on unmount
    }, [])

    useEffect(() => {
        if (connectionStatus !== WsConnectionStatus.CONNECTED) {
            return
        }
        if (slideId && currentQASession?.slideId === slideId) {
            return
        }
        const params: StartPollRequest = createStartPollRequest(link, slideId)
        setTimeout(() => dispatch(requestStartPoll(params)), 300)
    }, [connectionStatus])

    if (!currentInteraction && !currentQASession) {
        return noCurrentInteraction(link)
    }

    const getBodyContent = () => {
        if (slideId && currentQASession?.slideId === slideId) {
            return <QandA />
        }
        if (currentInteraction) {
            return getInteractiveContent(currentInteraction)
        }
        return null
    }

    return (
        <div>
            <div className='presenter-page-content'>
                {connectionStatus !== WsConnectionStatus.CONNECTED && (
                    <div className='presenter-event-loader'>
                        <Loader />
                    </div>
                )}
                <InteractiveWrapper eventCode={link || ''}>
                    {getBodyContent()}
                </InteractiveWrapper>
            </div>
        </div>
    )
}

export default PresenterPage
