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
    handleClose: MouseEventHandler
    show: boolean
}

const useStyles = makeStyles({
    root: {
        '& .MuiPaper-root': {
            borderRadius: '14px',
        },
        '& .MuiDialog-paperWidthSm': {
            maxWidth: 'calc(100% - 16px)',
        },
        '& .MuiDialog-paperScrollPaper': {
            maxHeight: 'calc(100% - 16px)',
        },
        '& .MuiDialog-paper': {
            margin: '0px',
        },
    },
})

const handleSubmit = () => {
    alert('Submit!')
}

const Qa = (qaProps: QaProps) => {
    const { handleClose, show } = qaProps
    const classes = useStyles()
    const [listQA, setListQA] = useState(MOCK_DATA)
    const [isRecentSelected, setIsRecentSelected] = useState(true)

    const handleLike = (UUID: string) => {
        const newItems = listQA.map((item) =>
            item.UUID === UUID ? { ...item, isLikid: !item.isLiked } : item
        )
        setListQA(newItems)
    }

    const handleRecentClick = () => {
        const sorted = [...listQA]
        sorted.sort((a, b) => {
            let y = new Date(a.createdAt)
            let x = new Date(b.createdAt)
            console.log(x)
            console.log(y)
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
        <div>
            <Dialog
                open={show}
                keepMounted
                onClose={handleClose}
                aria-labelledby='alert-dialog-slide-title'
                aria-describedby='alert-dialog-slide-description'
                className={classes.root}
            >
                <div className='qa-title'>
                    <CloseButton onClick={handleClose} />
                </div>
                <SelectorPanel
                    totalQuestions={listQA.length}
                    handleRecentClick={handleRecentClick}
                    handleTopClick={handleTopClick}
                    isRecentSelected={isRecentSelected}
                />
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
                <QAAdd onSubmit={handleSubmit} />
            </Dialog>
        </div>
    )
}

export default Qa
