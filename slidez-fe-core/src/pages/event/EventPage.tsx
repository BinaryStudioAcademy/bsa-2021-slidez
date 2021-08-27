import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
    createSessionForPresentation,
    initWebSocketSession,
    requestStartPoll,
} from '../../containers/session/store/store'
import { WsConnectionStatus } from '../../containers/session/enums/ws-connection-status'
import Loader from '../../common/components/loader/Loader'
import InteractiveWrapper from '../../common/components/interactive-elements/interactive-wrapper/InteractiveWrapper'
import { CreatePresentationSessionDto } from '../../services/session/dto/CreatePresentationSessionDto'
import {
    selectConnectionStatus,
    selectCurrentInteractiveElement, selectLink,
} from '../../containers/session/store/selectors'
import {
    createStartPollRequest,
    StartPollRequest,
} from '../../containers/session/event/FrontendEvent'
import { PollDto } from '../../containers/session/dto/InteractiveElement'
import PollInput from '../../common/components/interactive-elements/poll/PollInput'
import { InteractiveElementType } from '../../containers/session/enums/InteractiveElementType'

const useEditorParams = () => {
    const params = new URLSearchParams(useLocation().search)

    return {
        presentationId: params.get('presentationId') ?? '',
        slideId: params.get('slideId') ?? '',
    }
}

const EventPage: React.FC = () => {
    // const { link } = useParams<{ link?: string }>()
    const link = useAppSelector(selectLink)
    const dispatch = useAppDispatch()
    const { presentationId, slideId } = useEditorParams()

    console.log(presentationId, slideId)

    useEffect(() => {
        if (link) {
            dispatch(initWebSocketSession(link))
            const dto: CreatePresentationSessionDto = {
                presentationId,
            }
            setTimeout(() => dispatch(createSessionForPresentation(dto)), 2000)
            const params: StartPollRequest = createStartPollRequest(
                link,
                slideId
            )
            setTimeout(() => dispatch(requestStartPoll(params)), 3000)
        }
    }, [])

    const connectionStatus = useAppSelector(selectConnectionStatus)

    const currentInteraction = useAppSelector(selectCurrentInteractiveElement)
    const body =
        currentInteraction?.type === InteractiveElementType.poll ? (
            <PollInput poll={currentInteraction as PollDto} link={link || ''} />
        ) : (
            <>Waiting for an interaction to start...</>
        )
    return (
        <div>
            {connectionStatus !== WsConnectionStatus.CONNECTED && <Loader />}
            <InteractiveWrapper eventCode={link || ''}>
                {body}
            </InteractiveWrapper>
        </div>
    )
}

export default EventPage
