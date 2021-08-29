import * as React from 'react'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import like_icon from '../../../assets/svgs/like-icon.svg'
import './QACard.scss'
import { yellow } from '@material-ui/core/colors'
import { MouseEventHandler } from 'react'

const useStyles = makeStyles({
    root: {
        margin: '10px',
        backgroundColor: '#F6F4F8',
        '& .MuiPaper-root': {
            borderRadius: '5px 10px',
        },
        '& .MuiDialog-paperWidthSm': {
            maxWidth: 'calc(100% - 16px)',
        },
        '& .MuiDialog-paperScrollPaper': {
            maxHeight: 'calc(100% - 16px)',
        },
        '& .MuiDialog-paper': {
            margin: '5px',
        },
        '&  .MuiCardContent-root': {
            padding: '0px',
        },
        '&  .MuiCard-root': {
            overflow: 'scroll',
            backgroundColor: '#fffde7',
        },
    },
})

type QACardProps = {
    children: string
    author: string
    likes: number
    likeClick: MouseEventHandler
}

export default function QACard(props: QACardProps) {
    const { children, author, likes, likeClick } = props
    const classes = useStyles()
    return (
        <Card classes={classes}>
            <div className='card'>
                <div>
                    <div className='author'>{author}</div>
                    <div className='pool-content'>{children}</div>
                </div>
                <div className='reaction'>
                    <button onClick={likeClick} className='like-btn'>
                        <a href=''>
                            <img
                                className='like-icon'
                                src={like_icon}
                                alt='graph'
                            ></img>
                        </a>
                        {likes}
                    </button>
                </div>
            </div>
        </Card>
    )
}
