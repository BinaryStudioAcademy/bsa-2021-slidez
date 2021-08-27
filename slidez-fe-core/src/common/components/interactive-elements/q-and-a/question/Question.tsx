import React from 'react'
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
                    <img src={user} alt='user' />
                    {14}
                </div>
            </div>
            <div className='separator' />
        </div>
    )
}
