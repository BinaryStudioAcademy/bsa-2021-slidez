import React from 'react'
import './styles.qa.scss'
import { QandAHeader } from './header/QandAHeader'
import { Question } from './question/Question'
import { v4 as uuidv4 } from 'uuid'
import { QASessionDto } from '../../../../containers/session/dto/InteractiveElement'
import { useAppSelector } from '../../../../hooks'
import { selectQASession } from '../../../../containers/session/store/selectors'

export const QandA = () => {
    const currentQASession: QASessionDto | undefined | null =
        useAppSelector(selectQASession)
    if (!currentQASession) {
        return null
    }
    return (
        <div className='q-and-a'>
            <QandAHeader questionCount={currentQASession.questions.length} />
            {currentQASession.questions.length > 0 ? (
                currentQASession.questions.map((q) => (
                    <Question questionDto={q} key={uuidv4()} />
                ))
            ) : (
                <div className='noQuestions'>No questions for now</div>
            )}
        </div>
    )
}
