import React, { useState } from 'react'
import menu_icon from '../../assets/svgs/menu-icon.svg'
import check from '../../assets/svgs/check.svg'
import q_and_a from '../../assets/svgs/QandA.svg'
import heart from '../../assets/svgs/reactions.svg'
import chat from '../../assets/svgs/chat.svg'
import { Page } from './enums/addon-routes'
import './Menu.scss'

interface IProps {
    onClick: (page: Page) => void
}

const Menu: React.FC<IProps> = ({ onClick }: IProps) => {
    return (
        <div className='main-page-addon'>
            <div className='addon-menu'>
                <img src={menu_icon} alt='menu' />
            </div>
            <h2>Create new interaction</h2>
            <div className='menu-list'>
                <button
                    className='list-items'
                    onClick={() => onClick(Page.POLL)}
                >
                    <img src={check} alt='check' />
                    <div className='text'>Live poll</div>
                </button>
                <button className='list-items'>
                    <img src={q_and_a} alt='q_and_a' />
                    <div className='text'>Audience Q&#38;A</div>
                </button>
                <button className='list-items'>
                    <img src={heart} alt='heart' />
                    <div className='text'>Reactions</div>
                </button>
                <button className='list-items'>
                    <img src={chat} alt='chat' />
                    <div className='text'>Quiz</div>
                </button>
            </div>
        </div>
    )
}

export default Menu
