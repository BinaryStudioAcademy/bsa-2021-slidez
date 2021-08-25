import React from 'react'
import Avatar from 'react-avatar'
import './question.scss'
import '../../../../../global/styles.scss'

export type QuestionProps = {
    avatarUrl: string | undefined
    firstName: string | undefined
    question: string
}
// TODO: add upvote count and icon
export const Question = (questionProps: QuestionProps) => {
    const getName = () => {
        return questionProps.firstName ? questionProps.firstName : 'Anonimus'
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
            <div className='question'>{questionProps.question}</div>
            <div className='separator' />
        </div>
    )
}
