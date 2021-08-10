import { PollDto } from './PollDto'

export const poll: PollDto = {
    name: 'Are you ok?',
    options: [
        { title: 'no' },
        { title: 'yes' },
        { title: 'maybe' },
        { title: 'awesome!' },
    ],
    answers: {
        0: [{ optionId: 0 }],
        1: [{ optionId: 1 }, { optionId: 1 }, { optionId: 1 }],
        2: [{ optionId: 2 }, { optionId: 2 }],
        3: [{ optionId: 3 }, { optionId: 3 }, { optionId: 3 }],
    },
}
