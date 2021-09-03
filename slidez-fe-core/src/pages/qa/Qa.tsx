import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import QACard from './components/QACard'
import QAAdd from './components/QAAdd'
import SelectorPanel from './components/SelectorPanel'
import CloseButton from './components/CloseButton'
import { makeStyles } from '@material-ui/styles'
import './qa.scss'
import { MOCK_DATA } from './qa-session-mock'
import { useEffect } from 'react'
import { QASessionDto } from '../../containers/session/dto/InteractiveElement'
import { getParticipantData } from '../../services/participant/participant-service'
import { QASessionQuestionDto } from '../../containers/session/dto/QASessionQuestionDto'

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
    const { handleClose, show } = qaProps
    const classes = useStyles()
    const [participantData] = useState(getParticipantData())
    const qaSession: QASessionDto = MOCK_DATA

    const [isRecentSelected, setIsRecentSelected] = useState(true)

    useEffect(() => {
        handleRecentClick() // Here revecive list of Q&A
    }, [])

    const handleSubmit = (textValue: string) => {
        const newQuestion: QASessionQuestionDto = {
            id: 'b2c5620f-ca52-488d-953f-a3fc1c982fb9',
            question: 'When does life get better?',
            likedBy: [],
            createdAt: new Date(),
            authorNickname:
                participantData.participantFirstName +
                ' ' +
                participantData.participantLastName,
            qaSessionId: qaSession.id,
        }

        if (isRecentSelected) {
            qaSession.questions.unshift(newQuestion)
        } else {
            qaSession.questions.push(newQuestion)
        }
    }

    const handleLike = (questionId: string) => {
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
        const sorted = [...qaSession.questions]
        sorted.sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime()
        })
        setIsRecentSelected(true)
        qaSession.questions = sorted
    }

    const handleTopClick = () => {
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
                    totalQuestions={qaSession.questions.length}
                    handleRecentClick={handleRecentClick}
                    handleTopClick={handleTopClick}
                    isRecentSelected={isRecentSelected}
                />
            </div>
            <div className='qa-body'>
                {qaSession.questions.map((qaSessionQuestion) => (
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
