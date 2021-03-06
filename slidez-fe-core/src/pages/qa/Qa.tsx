import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import QACard from './components/QACard'
import QAAdd from './components/QAAdd'
import SelectorPanel from './components/SelectorPanel'
import CloseButton from './components/CloseButton'
import { makeStyles } from '@material-ui/styles'
import './qa.scss'
import {
    createNickName,
    getParticipantData,
} from '../../services/participant/participant-service'
import { QASessionQuestionDto } from '../../containers/session/dto/QASessionQuestionDto'
import {
    AskQuestionRequest,
    createAskQuestionRequest,
    createLikeQuestionRequest,
    LikeQuestionRequest,
} from '../../containers/session/event/FrontendEvent'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
    askQuestion,
    likeQuestion,
    setQandAQuestions,
} from '../../containers/session/store/store'
import { selectQASession } from '../../containers/session/store/selectors'
import styles from './styles.module.scss'
import {
    getQuestionsSortedByDate,
    getQuestionsSortedByLikes,
} from './utils/sorting-utils'

type QaProps = {
    handleClose: any
    show: boolean
}

const useStyles = makeStyles({
    root: {
        '& .MuiPaper-root': {
            borderRadius: '14px',
        },
        '& .MuiDialog-paperScrollPaper': {
            height: 'calc(100% - 16px)',
        },
        '& .MuiDialog-paper': {
            margin: '0px',
        },
        '& .makeStyles-root-1 .MuiDialog-paperScrollPaper': {
            height: 'calc(100% - 16px)',
        },
    },
})

const Qa = (qaProps: QaProps) => {
    //@ts-ignore
    const { link } = useParams()
    const { handleClose, show } = qaProps
    const classes = useStyles()
    const [participantData] = useState(getParticipantData())
    const qaSession = useAppSelector(selectQASession)
    const [isRecentSelected, setIsRecentSelected] = useState(true)
    const dispatch = useAppDispatch()

    const handleSubmit = (text: string) => {
        if (!qaSession || !qaSession.id) {
            return
        }
        const nickname = createNickName()
        const askQuestionRequest: AskQuestionRequest = createAskQuestionRequest(
            link,
            text,
            nickname,
            qaSession.id
        )
        dispatch(askQuestion(askQuestionRequest))
    }

    const handleLike = (questionId: string) => {
        if (!participantData.id) {
            return
        }
        const request: LikeQuestionRequest = createLikeQuestionRequest(
            link,
            questionId,
            participantData.id
        )
        dispatch(likeQuestion(request))
    }

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

    const getIsLikedByMe = (qaSessionQuestion: QASessionQuestionDto) => {
        if (!participantData.id) {
            return false
        }
        return qaSessionQuestion.likedBy.includes(participantData.id)
    }

    const visibleQuestions: QASessionQuestionDto[] =
        qaSession?.questions?.filter((q) => q.isVisible) || []
    return (
        <Dialog
            open={show}
            keepMounted
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
            className={`${classes.root} ${styles.dialog}`}
        >
            <div className='qa-header with-qa-max-width'>
                <div className='qa-title'>
                    <CloseButton onClick={handleClose} />
                </div>
                <SelectorPanel
                    totalQuestions={visibleQuestions.length}
                    handleRecentClick={handleRecentClick}
                    handleTopClick={handleTopClick}
                    isRecentSelected={isRecentSelected}
                />
            </div>
            <div className={styles.bodyButton}>
                {visibleQuestions.length > 0 ? (
                    <div className='qa-body'>
                        {visibleQuestions.map((qaSessionQuestion) => (
                            <QACard
                                key={qaSessionQuestion.id}
                                author={qaSessionQuestion.authorNickname}
                                likeCount={qaSessionQuestion.likedBy.length}
                                isLiked={getIsLikedByMe(qaSessionQuestion)}
                                likeClick={() =>
                                    handleLike(qaSessionQuestion.id)
                                }
                            >
                                {qaSessionQuestion.question}
                            </QACard>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noQuestions}>
                        No questions for now. You can be the first one
                    </div>
                )}
                <QAAdd onSubmit={handleSubmit} />
            </div>
        </Dialog>
    )
}

export default Qa
