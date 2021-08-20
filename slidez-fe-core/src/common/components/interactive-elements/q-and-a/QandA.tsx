import React from 'react'
import './q-and-a.scss'
import { QandAHeader } from './header/QandAHeader'
import { Question, QuestionProps } from './question/Question'
import { v4 as uuidv4 } from 'uuid'

const data: QuestionProps[] = [
    {
        question: 'Hi are you?',
        avatarUrl:
            'https://resizing.flixster.com/kr0IphfLGZqni5JOWDS2P1-zod4=/280x250/v1.cjs0OTQ2NztqOzE4NDk1OzEyMDA7MjgwOzI1MA',
        firstName: 'Ruth',
    },
    {
        question: 'What is the weather like today?',
        avatarUrl:
            'https://resizing.flixster.com/EVAkglctn7E9B0hVKJrueplabuQ=/220x196/v1.cjs0NjYwNjtqOzE4NDk1OzEyMDA7MjIwOzE5Ng',
        firstName: 'Wendy',
    },
    {
        question: 'What time is it now?',
        avatarUrl: undefined,
        firstName: 'Helen',
    },
    {
        question: 'Who am I?',
        avatarUrl: undefined,
        firstName: undefined,
    },
]

export const QandA = () => {
    return (
        <div className='q-and-a'>
            <QandAHeader questionCount={data.length} />
            {data.map((u) => (
                <Question
                    question={u.question}
                    avatarUrl={u.avatarUrl}
                    firstName={u.firstName}
                    key={uuidv4()}
                />
            ))}
        </div>
    )
}
