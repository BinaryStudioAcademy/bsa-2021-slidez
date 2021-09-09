import React from 'react'
import '../styles.qa.scss'
import '../../../../../global/styles.scss'
import likeIcon from '../../../../../assets/svgs/like.svg'
import { QASessionQuestionDto } from '../../../../../containers/session/dto/QASessionQuestionDto'
import { UserLogo } from '../../../user-logo/UserLogo'

export type QuestionProps = {
    questionDto: QASessionQuestionDto
}

export const Question = ({ questionDto }: QuestionProps) => {
    if (questionDto.authorNickname.length == 0) {
        questionDto.authorNickname = 'Anonymous'
    }
    const nickParts: string[] = questionDto.authorNickname.split(' ')
    if (nickParts.length < 2) {
        nickParts[1] = ' '
    }
    return (
        <div className='question-container'>
            <div className='avatar-and-nick-holder'>
                <UserLogo
                    width={28}
                    firstName={nickParts[0]}
                    lastName={nickParts[1]}
                    email={''}
                />
                <div className='nickname'>{questionDto.authorNickname}</div>
            </div>
            <div className='row-content'>
                <div className='question'>{questionDto.question}</div>
                <div className='like'>
                    <img src={likeIcon} alt='likeIcon' />
                    {questionDto.likedBy.length}
                </div>
            </div>
            <div className='separator' />
        </div>
    )
}
