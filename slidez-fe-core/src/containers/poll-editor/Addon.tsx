import { current } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { QandA } from '../../common/components/interactive-elements/q-and-a/QandA'
import { Page } from './enums/addon-routes'
import Menu from './Menu'
import PollEditor from './PollEditor'

const Addon = () => {
    const [currentPage, setCurrentPage] = useState<Page>(Page.MENU)
    const AddonSwitcher = (currentPage: Page) => {
        switch (currentPage) {
            case Page.MENU:
                return <Menu onClickPage={setCurrentPage} />
            case Page.POLL:
                return <PollEditor />
            case Page.QandA:
                return <QandA />
            default:
                return <Menu onClick={setCurrentPage} />
        }
    }
    return <div>{AddonSwitcher(currentPage)}</div>
}

export default Addon
