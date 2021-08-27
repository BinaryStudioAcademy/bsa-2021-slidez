import React from 'react'
import './styles.qa.scss'
import { QandAHeader } from './header/QandAHeader'
import { Question, QuestionProps } from './question/Question'
import { v4 as uuidv4 } from 'uuid'

const data: QuestionProps[] = [
    {
        question:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo, velit adipiscing tellus lectus rhoncus?',
        avatarUrl:
            'https://resizing.flixster.com/kr0IphfLGZqni5JOWDS2P1-zod4=/280x250/v1.cjs0OTQ2NztqOzE4NDk1OzEyMDA7MjgwOzI1MA',
        firstName: 'Gretchen',
    },
    {
        question: 'Commodo, velit adipiscing tellus lectus rhoncus?',
        avatarUrl:
            'https://resizing.flixster.com/EVAkglctn7E9B0hVKJrueplabuQ=/220x196/v1.cjs0NjYwNjtqOzE4NDk1OzEyMDA7MjIwOzE5Ng',
        firstName: 'Carter',
    },
    {
        question:
            'Tempor faucibus justo purus netus amet est. Cursus feugiat urna quis ultrices at urna?',
        avatarUrl: undefined,
        firstName: 'Erin',
    },
    {
        question:
            'Sapien, nec nulla quis augue est. Orci euismod praesent lobortis pellentesque. Odio integer arcu tortor, vitae vel, purus amet urna, fringilla?',
        avatarUrl: undefined,
        firstName: 'Martin',
    },
    {
        question:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo, velit adipiscing tellus lectus rhoncus?',
        avatarUrl:
            'https://resizing.flixster.com/kr0IphfLGZqni5JOWDS2P1-zod4=/280x250/v1.cjs0OTQ2NztqOzE4NDk1OzEyMDA7MjgwOzI1MA',
        firstName: 'Gretchen',
    },
    {
        question: 'Commodo, velit adipiscing tellus lectus rhoncus?',
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
