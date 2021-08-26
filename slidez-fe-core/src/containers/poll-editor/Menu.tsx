import React from 'react'
import menu_icon from '../../assets/svgs/menu-icon.svg'
import check from '../../assets/svgs/check.svg'
import q_and_a from '../../assets/svgs/QandA.svg'
import heart from '../../assets/svgs/reactions.svg'
import chat from '../../assets/svgs/chat.svg'
import { EditorTab, setActiveTab } from './store'
import './Menu.scss'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'

const Menu: React.FC = () => {
    const dispatch = useDispatch()
    const handlePollClick = useCallback(() => {
        dispatch(setActiveTab(EditorTab.POLL))
    }, [dispatch])

    const { polls } = useSelector((state: RootState) => state.editor)
    return (
        <div className='main-page-addon'>
            <div className='addon-menu'>
                <img src={menu_icon} alt='menu' />
            </div>
            <h2>Create new interaction</h2>
            <div className='menu-list'>
                <button className='list-items' onClick={handlePollClick}>
                    <img src={check} alt='check' />
                    <div className='text'>Live poll</div>
                </button>
                <div className='list-elements'>
                    {polls.map((item) => {
                        return (
                            <div className='list-items' key={item.id}>
                                <img src={check} alt='check' />
                                <div className='text'>{item.title}</div>
                                &nbsp;
                                <span className='subtext'>{`[${item.pollOptions.length} options]`}</span>
                            </div>
                        )
                    })}
                </div>
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
