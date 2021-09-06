import React, { useEffect, useState } from 'react'
import './qa.scss'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectQASession } from '../../containers/session/store/selectors'
import {
    initWebSocketSession,
    setQandAQuestions,
} from '../../containers/session/store/store'
import { QASessionQuestionDto } from '../../containers/session/dto/QASessionQuestionDto'
import styles from './styles.module.scss'
import QACard from './components/QACard'
import SelectorPanel from './components/SelectorPanel'
import {
    getQuestionsSortedByDate,
    getQuestionsSortedByLikes,
} from './utils/sorting-utils'

const QuestionModeration = () => {
    //@ts-ignore
    const { link } = useParams()
    const qaSession = useAppSelector(selectQASession)
    const [isRecentSelected, setIsRecentSelected] = useState(true)
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

    const visibleQuestions: QASessionQuestionDto[] =
        qaSession?.questions?.filter((q) => q.isVisible) || []
    return (
        <div>
            <SelectorPanel
                totalQuestions={visibleQuestions.length}
                handleRecentClick={handleRecentClick}
                handleTopClick={handleTopClick}
                isRecentSelected={isRecentSelected}
            />
            <div className={styles.bodyButton}>
                <div className='qa-body'>
                    {visibleQuestions.map((qaSessionQuestion) => (
                        <QACard
                            key={qaSessionQuestion.id}
                            author={qaSessionQuestion.authorNickname}
                            likeCount={qaSessionQuestion.likedBy.length}
                            isLiked={false}
                            likeClick={() => {}}
                        >
                            {qaSessionQuestion.question}
                        </QACard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default QuestionModeration
