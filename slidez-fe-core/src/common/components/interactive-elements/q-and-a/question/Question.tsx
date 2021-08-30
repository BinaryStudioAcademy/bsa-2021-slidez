import React, { useState } from 'react'
import Avatar from 'react-avatar'
import '../styles.qa.scss'
import '../../../../../global/styles.scss'
import likeIcon from '../../../../../assets/svgs/like.svg'

export type QuestionProps = {
    avatarUrl: string | undefined
    firstName: string | undefined
    question: string
}
export const Question = (questionProps: QuestionProps) => {
    const getName = () => {
        return questionProps.firstName ? questionProps.firstName : 'Anonymous'
    }
    const [like, setLike] = useState(0)
    return (
        <div className='question-container'>
            <div className='avatar-and-nick-holder'>
                <Avatar
                    name={getName()}
                    src={questionProps.avatarUrl}
                    className='avatar'
                    color='#663999'
                />
                {getName()}
            </div>
            <div className='row-content'>
                <div className='question'>{questionProps.question}</div>
                <div className='like'>
                    <img src={likeIcon} alt='likeIcon' />
                    {like}
                </div>
            </div>
            <div className='separator' />
        </div>
    )
}
