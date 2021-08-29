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

const handleLike = () => {
    alert('Like!')
}

const handleSubmit = () => {
    alert('Submit!')
}

const Qa = (qaProps: QaProps) => {
    const { handleClose, show } = qaProps
    const classes = useStyles()
    const [listQA, setListQA] = useState(MOCK_DATA)

    const handleRecentClick = () => {
        let sortedList: any = listQA.sort((a, b) => b.id - a.id)
        setListQA(sortedList)
        console.log(sortedList)
    }

    const handleTopClick = () => {
        let sortedList: any = listQA.sort((a, b) => b.likes - a.likes)
        setListQA(sortedList)
        console.log(sortedList)
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
                />
                {listQA.map((qaItem) => (
                    <QACard
                        key={qaItem.id}
                        author={qaItem.author}
                        likes={qaItem.likes}
                        likeClick={handleLike}
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
