import { current } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { QandA } from '../../common/components/interactive-elements/q-and-a/QandA'
import { EventBusConnectionStatus, useEventBus } from '../../hooks/event-bus'
import { Page } from './enums/addon-routes'
import Menu from './Menu'
import PollEditor from './PollEditor'

const useEditorParams = () => {
    const params = new URLSearchParams(useLocation().search)

    return {
        presentationId: params.get('presentationId') ?? '',
        extensionId: params.get('extensionId') ?? '',
    }
}

const Addon = () => {
    const [currentPage, setCurrentPage] = useState<Page>(Page.MENU)

    const updatePage = (page: Page) => {
        setCurrentPage(page)
    }
    const { extensionId, presentationId } = useEditorParams()
    const eventBus = useEventBus(extensionId)
    if (eventBus.connected === EventBusConnectionStatus.FAILED) {
        return 'Failed to connect to extension, please install extension first'
    }
    if (eventBus.connected !== EventBusConnectionStatus.CONNECTED) {
        return 'Connecting to extension, please wait...'
    }

    const AddonSwitcher = (currentPage: Page) => {
        switch (currentPage) {
            case Page.MENU:
                return <Menu onClick={updatePage} />
            case Page.POLL:
                return <PollEditor presentationId={presentationId} />
            case Page.QandA:
                return <QandA />
            default:
                return <Menu onClick={updatePage} />
        }
    }
    return <div>{AddonSwitcher(currentPage)}</div>
}

export default Addon
