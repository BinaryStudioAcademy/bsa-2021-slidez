import React, { SyntheticEvent } from 'react'
import check from '../../assets/svgs/check.svg'
import q_and_a from '../../assets/svgs/QandA.svg'
import heart from '../../assets/svgs/reactions.svg'
import chat from '../../assets/svgs/chat.svg'
import { EditorTab, setActiveTab } from './store'
import './Menu.scss'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useState } from 'react'
import Session from '../session/Session'
import { ReactComponent as DropDownIcon } from '../../assets/svgs/drop_down_icon.svg'
import { ReactComponent as DropUpIcon } from '../../assets/svgs/arrow_back.svg'

const Menu: React.FC = () => {
    const dispatch = useDispatch()
    const handlePollClick = useCallback(() => {
        dispatch(setActiveTab(EditorTab.POLL))
    }, [dispatch])
    const [isViewMenu, setIsViewMenu] = useState(true)

    const handleArrowClick = (event: SyntheticEvent) => {
        event.stopPropagation()
        setIsViewMenu(!isViewMenu)
    }

    const handleQAndAClick = useCallback(() => {
        dispatch(setActiveTab(EditorTab.QA))
    }, [dispatch])

    const { polls } = useSelector((state: RootState) => state.editor)
    return (
        <div className='main-page-addon'>
            <Session />
            <div className='addon-components'>
                <h2>Create new interaction</h2>
                <div className='menu-list'>
                    <button className='list-items' onClick={handlePollClick}>
                        <div>
                            <img src={check} alt='check' />
                        </div>
                        <div className='text pool-name'>Live poll</div>
                        <div className='arrow-icon' onClick={handleArrowClick}>
                            <DropDownIcon
                                className={
                                    'arrow-up' +
                                    (isViewMenu ? ' show-icon' : ' hide-icon')
                                }
                            />
                            <DropUpIcon
                                className={
                                    'arrow-down' +
                                    (isViewMenu ? ' hide-icon' : ' show-icon')
                                }
                            />
                        </div>
                    </button>
                    <div
                        className={
                            'list-elements' +
                            (isViewMenu ? ' show-menu' : ' hide-menu')
                        }
                    >
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
                    <button className='list-items' onClick={handleQAndAClick}>
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
        </div>
    )
}

export default Menu
