import { PollDto } from './PollDto'

export const poll: PollDto = {
    name: 'Are you ok?',
    options: [{ title: 'yes' }, { title: 'no' }],
    answers: {
        0: [{ optionId: 0 }, { optionId: 0 }, { optionId: 0 }, { optionId: 0 }],
        1: [{ optionId: 1 }, { optionId: 1 }],
    },
}
