import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import QACard from './components/QACard'
import QAAdd from './components/QAAdd'
import SelectorPanel from './components/SelectorPanel'
import CloseButton from './components/CloseButton'
import { makeStyles } from '@material-ui/styles'
import './qa.scss'
import { useEffect } from 'react'
import {
    createNickName,
    getParticipantData,
} from '../../services/participant/participant-service'
import { QASessionQuestionDto } from '../../containers/session/dto/QASessionQuestionDto'
import {
    AskQuestionRequest,
    createAskQuestionRequest,
} from '../../containers/session/event/FrontendEvent'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { askQuestion } from '../../containers/session/store/store'
import { selectQASession } from '../../containers/session/store/selectors'

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
    const qaSession = { ...useAppSelector(selectQASession) }

    const [isRecentSelected, setIsRecentSelected] = useState(true)
    const dispatch = useAppDispatch()

    // Need it on every re-render
    useEffect(() => {
        if (isRecentSelected) {
            handleRecentClick()
        } else {
            handleTopClick()
        }
    })

    const handleSubmit = (text: string) => {
        console.log('QASession: ' + JSON.stringify(qaSession))
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
        if (!qaSession || !qaSession.questions) {
            return
        }
        for (const question of qaSession.questions) {
            if (question.id === questionId) {
                if (getIsLikedByMe(question)) {
                    question.likedBy = question.likedBy.filter(
                        (id: string) => id !== participantData.id
                    )
                } else if (participantData.id) {
                    question.likedBy.push(participantData.id)
                }
                break
            }
        }
    }

    const handleRecentClick = () => {
        if (!qaSession || !qaSession.questions) {
            return
        }
        const sorted: QASessionQuestionDto[] = [...qaSession.questions]
        sorted.sort((a, b) => {
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
        })
        setIsRecentSelected(true)
        qaSession.questions = sorted
    }

    const handleTopClick = () => {
        if (!qaSession || !qaSession.questions) {
            return
        }
        const sorted = [...qaSession.questions]
        sorted.sort((a, b) => b.likedBy.length - a.likedBy.length)
        setIsRecentSelected(false)
        qaSession.questions = sorted
    }

    const getIsLikedByMe = (qaSessionQuestion: QASessionQuestionDto) => {
        if (!participantData.id) {
            return false
        }
        return qaSessionQuestion.likedBy.includes(participantData.id)
    }

    return (
        <Dialog
            open={show}
            keepMounted
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
            className={classes.root}
        >
            <div className='qa-header'>
                <div className='qa-title'>
                    <CloseButton onClick={handleClose} />
                </div>
                <SelectorPanel
                    totalQuestions={qaSession?.questions?.length}
                    handleRecentClick={handleRecentClick}
                    handleTopClick={handleTopClick}
                    isRecentSelected={isRecentSelected}
                />
            </div>
            <div className='qa-body'>
                {qaSession?.questions?.map((qaSessionQuestion) => (
                    <QACard
                        key={qaSessionQuestion.id}
                        author={qaSessionQuestion.authorNickname}
                        likeCount={qaSessionQuestion.likedBy.length}
                        isLiked={getIsLikedByMe(qaSessionQuestion)}
                        likeClick={() => handleLike(qaSessionQuestion.id)}
                    >
                        {qaSessionQuestion.question}
                    </QACard>
                ))}
            </div>
            <QAAdd onSubmit={handleSubmit} />
        </Dialog>
    )
}

export default Qa
