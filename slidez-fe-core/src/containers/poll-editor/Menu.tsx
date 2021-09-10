import React, { SyntheticEvent } from 'react'
import check from '../../assets/svgs/check.svg'
import q_and_a from '../../assets/svgs/QandA.svg'
import heart from '../../assets/svgs/reactions.svg'
import chat from '../../assets/svgs/chat.svg'
import {
    deletePoll,
    deleteQA,
    EditorTab,
    setActiveTab,
    setPollToUpdate,
} from './store'
import './Menu.scss'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useState } from 'react'
import Session from '../session/Session'
import { ReactComponent as DropDownIcon } from '../../assets/svgs/drop_down_icon.svg'
import { ReactComponent as DropUpIcon } from '../../assets/svgs/arrow_back.svg'
import { ReactComponent as TrashIcon } from '../../assets/svgs/trash.svg'
import {
    isPollInteractiveElement,
    isQaSessionElement,
    PollInteractiveElement,
    QaInteractiveElement,
} from '../../types/editor'

const Menu: React.FC = () => {
    const dispatch = useDispatch()

    const handlePollClick = useCallback(() => {
        dispatch(setPollToUpdate(null))
        dispatch(setActiveTab(EditorTab.POLL))
    }, [dispatch])
    const [showPollItems, setShowPollItems] = useState(true)
    const [showQAItems, setShowQAItems] = useState(true)

    const handlePollArrowClick = (event: SyntheticEvent) => {
        event.stopPropagation()
        setShowPollItems(!showPollItems)
    }

    const handleQAArrowClick = (event: SyntheticEvent) => {
        event.stopPropagation()
        setShowQAItems(!showQAItems)
    }

    const handleDeleteClick = (
        event: SyntheticEvent,
        element: PollInteractiveElement | QaInteractiveElement
    ) => {
        event.preventDefault()
        event.stopPropagation()

        if (isPollInteractiveElement(element)) {
            dispatch(deletePoll(element))
        }
        if (isQaSessionElement(element)) {
            dispatch(deleteQA(element))
        }
    }

    const handlePresentPollClick = (
        event: SyntheticEvent,
        poll: PollInteractiveElement
    ) => {
        event.preventDefault()
        dispatch(setPollToUpdate(poll))
        dispatch(setActiveTab(EditorTab.POLL))
    }

    const handleQAndAClick = useCallback(() => {
        dispatch(setActiveTab(EditorTab.QA))
    }, [dispatch])

    const { polls } = useSelector((state: RootState) => state.editor)
    const { qaSessions } = useSelector((state: RootState) => state.editor)

    return (
        <div className='main-page-addon'>
            <Session />
            <div className='addon-components'>
                <h2>Create new interaction</h2>
                <div className='menu-list'>
                    <button className='list-items' onClick={handlePollClick}>
                        <div className='text-wrapper'>
                            <img src={check} alt='check' />
                            <div className='text poll-name'>Live poll</div>
                        </div>
                        <div
                            className='arrow-icon'
                            onClick={handlePollArrowClick}
                        >
                            <DropDownIcon
                                className={
                                    'arrow-up' +
                                    (showPollItems
                                        ? ' show-icon'
                                        : ' hide-icon')
                                }
                            />
                            <DropUpIcon
                                className={
                                    'arrow-down' +
                                    (showPollItems
                                        ? ' hide-icon'
                                        : ' show-icon')
                                }
                            />
                        </div>
                    </button>
                    <div
                        className={
                            'list-elements' +
                            (showPollItems ? ' show-menu' : ' hide-menu')
                        }
                    >
                        {polls.map((item) => {
                            return (
                                <div
                                    className='list-items'
                                    key={item.id}
                                    onClick={(event) =>
                                        handlePresentPollClick(event, item)
                                    }
                                >
                                    <img
                                        className='check'
                                        src={check}
                                        alt='check'
                                    />
                                    <div className='text'>{item.title}</div>
                                    &nbsp;
                                    <span className='subtext'>{`[${item.pollOptions.length} options]`}</span>
                                    <div className='delete'>
                                        <TrashIcon
                                            className='delete-icon'
                                            onClick={(event) =>
                                                handleDeleteClick(event, item)
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <button className='list-items' onClick={handleQAndAClick}>
                        <div className='text-wrapper'>
                            <img src={q_and_a} alt='q_and_a' />
                            <div className='text'>Audience Q&#38;A</div>
                        </div>
                        <div
                            className='arrow-icon'
                            onClick={handleQAArrowClick}
                        >
                            <DropDownIcon
                                className={
                                    'arrow-up' +
                                    (showQAItems ? ' show-icon' : ' hide-icon')
                                }
                            />
                            <DropUpIcon
                                className={
                                    'arrow-down' +
                                    (showQAItems ? ' hide-icon' : ' show-icon')
                                }
                            />
                        </div>
                    </button>
                    <div
                        className={
                            'list-elements' +
                            (showQAItems ? ' show-menu' : ' hide-menu')
                        }
                    >
                        {qaSessions.map((item) => {
                            return (
                                <div
                                    className='list-items'
                                    key={item.id}
                                    // onClick={(event) =>
                                    //     handlePresentQAClick(event, item)
                                    // }
                                >
                                    <img
                                        className='check'
                                        src={q_and_a}
                                        alt='q_and_a'
                                    />
                                    <div className='text'>{item.title}</div>
                                    &nbsp;
                                    <div className='delete'>
                                        <TrashIcon
                                            className='delete-icon'
                                            onClick={(event) =>
                                                handleDeleteClick(event, item)
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <button className='list-items'>
                        <div className='text-wrapper'>
                            <img src={heart} alt='heart' />
                            <div className='text'>Reactions</div>
                        </div>
                    </button>
                    <button className='list-items'>
                        <div className='text-wrapper'>
                            <img src={chat} alt='chat' />
                            <div className='text'>Quiz</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Menu
