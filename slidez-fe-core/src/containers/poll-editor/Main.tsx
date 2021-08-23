import React from 'react'
import { QandA } from '../../common/components/interactive-elements/q-and-a/QandA'
import { Page } from './enums/addon-routes'
import PollEditor from './PollEditor'
import './Main.scss'
import menu_icon from '../../assets/svgs/menu-icon.svg'
import check from '../../assets/svgs/check.svg'
import q_and_a from '../../assets/svgs/QandA.svg'
import heart from '../../assets/svgs/reactions.svg'
import chat from '../../assets/svgs/chat.svg'

const renderAddonPages = (page: Page) => {
    switch (page) {
        case 'MAIN':
            return <Main />
        case 'POLL':
            return <PollEditor />
        case 'QandA':
            return <QandA />
        default:
            return <Main />
    }
}
//подумать как менять страницу
const Main = () => {
    return (
        <div className='main-page-addon'>
            <div className='addon-menu'>
                <img src={menu_icon} alt='menu' />
            </div>
            <h2>Create new interaction</h2>
            <div className='menu-list'>
                <div className='list-items'>
                    <img src={check} alt='check' />
                    Live poll
                </div>
                <div className='list-items'>
                    <img src={q_and_a} alt='q_and_a' />
                    Live poll
                </div>
                <div className='list-items'>
                    <img src={heart} alt='heart' />
                    Live poll
                </div>
                <div className='list-items'>
                    <img src={chat} alt='chat' />
                    Live poll
                </div>
            </div>
        </div>
    )
}

export default Main
