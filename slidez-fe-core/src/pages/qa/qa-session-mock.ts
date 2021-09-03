import { QASessionDto } from '../../containers/session/dto/InteractiveElement'
import { InteractiveElementType } from '../../containers/session/enums/InteractiveElementType'

export const MOCK_DATA: QASessionDto = {
    id: 'b15c5620f-ca52-488d-953f-a3fc1c982fb5',
    ownerId: 'b15c5620f-ca52-488d-953f-a3fc1c982fb6',
    slideId: 'b15c5620f-ca52-488d-953f-a3fc1c982fb7',
    title: 'Mocked Q&A session',
    type: InteractiveElementType.qaSession,
    questions: [
        {
            id: 'b2c5620f-ca52-488d-953f-a3fc1c982fb1',
            authorNickname: 'Anonymous',
            question: 'How are you?',
            likedBy: [
                '0bf5353d-c2a9-45a5-96af-ae23ee6220da',
                '0bf5353d-c2a9-45a5-96af-ae23ee6220db',
            ],
            qaSessionId: 'b15c5620f-ca52-488d-953f-a3fc1c982fb5',
            createdAt: new Date('2021-08-25T21:54:30.253Z'),
        },
        {
            id: 'b2c5620f-ca52-488d-953f-a3fc1c982fb2',
            authorNickname: 'Anonymous',
            question: 'What are you doing tonight? And tomorrow?',
            likedBy: [],
            qaSessionId: 'b15c5620f-ca52-488d-953f-a3fc1c982fb5',
            createdAt: new Date('2021-08-25T21:54:30.253Z'),
        },
        {
            id: 'b2c5620f-ca52-488d-953f-a3fc1c982fb3',
            authorNickname: 'Anonymous',
            question: 'When is your birthday?',
            likedBy: [
                '0bf5353d-c2a9-45a5-96af-ae23ee6220da',
                '0bf5353d-c2a9-45a5-96af-ae24ee6220da',
                '0bf5353d-c2a9-45a5-96af-ae25ee6220da',
            ],
            qaSessionId: 'b15c5620f-ca52-488d-953f-a3fc1c982fb5',
            createdAt: new Date('2021-08-25T21:54:30.253Z'),
        },
        {
            id: 'b2c5620f-ca52-488d-953f-a3fc1c982fb4',
            authorNickname: 'Anonymous',
            question: 'How to use generics in Java?',
            likedBy: ['0bf5353d-c2a9-45a5-96af-ae25ee6220da'],
            qaSessionId: 'b15c5620f-ca52-488d-953f-a3fc1c982fb5',
            createdAt: new Date('2021-08-25T21:54:30.253Z'),
        },
    ],
}
