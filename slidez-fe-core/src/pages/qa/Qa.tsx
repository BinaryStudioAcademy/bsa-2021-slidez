import React, { MouseEventHandler, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import QACard from './components/QACard'
import QAAdd from './components/QAAdd'
import SelectorPanel from './components/SelectorPanel'
import CloseButton from './components/CloseButton'

import { makeStyles } from '@material-ui/styles'
import './qa.scss'
import { MOCK_DATA } from './mock-poll-data'

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
    const [listQA, setListQA] = useState(MOCK_DATA)
    const [isRecentSelected, setIsRecentSelected] = useState(true)

    const handleSubmit = (textValue: string) => {
        var now: string = new Date().toDateString()
        const newQA = {
            UUID: '',
            isLiked: false,
            createdAt: now,
            author: 'Principal',
            likes: 0,
            pollContent: textValue,
        }
        const newList = [...listQA]
        newList.push(newQA)
        setListQA(newList)
    }

    const handleLike = (UUID: string) => {
        const newItems = [...listQA]
        newItems.map((item) => {
            if (item.UUID === UUID) {
                if (item.isLiked) {
                    item.isLiked = false
                    item.likes = item.likes - 1
                } else {
                    item.isLiked = true
                    item.likes = item.likes + 1
                }
            }
            return item
        })
        setListQA(newItems)
    }

    const handleRecentClick = () => {
        const sorted = [...listQA]
        sorted.sort((a, b) => {
            let y = new Date(a.createdAt)
            let x = new Date(b.createdAt)
            return x < y ? -1 : x > y ? 1 : 0
        })
        setIsRecentSelected(true)
        setListQA(sorted)
    }

    const handleTopClick = () => {
        const sorted = [...listQA]
        sorted.sort((a, b) => b.likes - a.likes)
        setIsRecentSelected(false)
        setListQA(sorted)
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
                    totalQuestions={listQA.length}
                    handleRecentClick={handleRecentClick}
                    handleTopClick={handleTopClick}
                    isRecentSelected={isRecentSelected}
                />
            </div>
            <div className='qa-body'>
                {listQA.map((qaItem) => (
                    <QACard
                        key={qaItem.UUID}
                        author={qaItem.author}
                        likes={qaItem.likes}
                        isLiked={qaItem.isLiked}
                        likeClick={() => handleLike(qaItem.UUID)}
                    >
                        {qaItem.pollContent}
                    </QACard>
                ))}
            </div>
            <QAAdd onSubmit={handleSubmit} />
        </Dialog>
    )
}

export default Qa
