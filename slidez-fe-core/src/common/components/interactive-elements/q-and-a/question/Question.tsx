import React, { useState } from 'react'
import Avatar from 'react-avatar'
import '../styles.qa.scss'
import '../../../../../global/styles.scss'
import user from '../../../../../assets/svgs/user.svg'

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
    const [isClicked, setIsClicked] = useState(false)
    const increment = () => {
        setLike(like + 1)
    }
    const decrement = () => {
        setLike(like - 1)
    }
    const handleLike = () => {
        if (isClicked) {
            decrement()
            setIsClicked(false)
        } else {
            increment()
            setIsClicked(true)
        }
    }

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
                <button className='like' onClick={() => handleLike()}>
                    <img src={user} alt='user' />
                    {like}
                </button>
            </div>
            <div className='separator' />
        </div>
    )
}
