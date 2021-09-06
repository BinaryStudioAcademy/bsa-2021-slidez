import React, { useEffect, useState } from 'react'
import './qa.scss'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectQASession } from '../../containers/session/store/selectors'
import {
    initWebSocketSession,
    setQandAQuestions,
    setQuestionVisibility,
} from '../../containers/session/store/store'
import { QASessionQuestionDto } from '../../containers/session/dto/QASessionQuestionDto'
import styles from './styles.module.scss'
import {
    getQuestionsSortedByDate,
    getQuestionsSortedByLikes,
} from './utils/sorting-utils'
import ModerationSelectorPanel from './components/ModerationSelectorPanel'
import ModerationQACard from './components/ModerationQACard'
import {
    createSetQuestionVisibilityRequest,
    SetQuestionVisibilityRequest,
} from '../../containers/session/event/FrontendEvent'

const QuestionModeration = () => {
    //@ts-ignore
    const { link } = useParams()
    const qaSession = useAppSelector(selectQASession)
    const [isRecentSelected, setIsRecentSelected] = useState(true)
    const [isShowingHidden, setIsShowingHidden] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initWebSocketSession(link))
    }, [])

    const handleRecentClick = () => {
        const sorted: QASessionQuestionDto[] =
            getQuestionsSortedByDate(qaSession)
        setIsRecentSelected(true)
        dispatch(setQandAQuestions(sorted))
    }

    const handleTopClick = () => {
        const sorted: QASessionQuestionDto[] =
            getQuestionsSortedByLikes(qaSession)
        setIsRecentSelected(false)
        dispatch(setQandAQuestions(sorted))
    }

    const handleRevealClick = (question: QASessionQuestionDto) => {
        const invertedVisible: boolean = !question.isVisible
        const request: SetQuestionVisibilityRequest =
            createSetQuestionVisibilityRequest(
                link,
                question.id,
                invertedVisible
            )
        dispatch(setQuestionVisibility(request))
    }

    const displayedQuestions: QASessionQuestionDto[] =
        qaSession?.questions?.filter((q) => q.isVisible === !isShowingHidden) ||
        []
    return (
        <div>
            <div className='qa-header'>
                <ModerationSelectorPanel
                    totalQuestions={displayedQuestions.length}
                    handleRecentClick={handleRecentClick}
                    handleTopClick={handleTopClick}
                    isRecentSelected={isRecentSelected}
                    isShowingHidden={isShowingHidden}
                    handleChangeVisibilityParameterOfList={() =>
                        setIsShowingHidden(!isShowingHidden)
                    }
                />
            </div>
            <div className={styles.bodyButton}>
                <div className='qa-body'>
                    {displayedQuestions.map((qaSessionQuestion) => (
                        <ModerationQACard
                            key={qaSessionQuestion.id}
                            author={qaSessionQuestion.authorNickname}
                            likeCount={qaSessionQuestion.likedBy.length}
                            onRevealClick={() => {
                                handleRevealClick(qaSessionQuestion)
                            }}
                            isVisible={qaSessionQuestion.isVisible}
                        >
                            {qaSessionQuestion.question}
                        </ModerationQACard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default QuestionModeration
