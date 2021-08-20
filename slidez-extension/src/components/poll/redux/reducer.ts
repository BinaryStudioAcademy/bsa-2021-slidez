import { InteractionStatus } from '../redux/InteractionStatus'
import { PollAnswerDto } from '../dto/PollAnswerDto'

export interface OptionsState {
    pollAnswer: PollAnswerDto
    isLoading: boolean
}

const initialState: OptionsState = {
    pollAnswer: { optionId: '', userId: '' },
    isLoading: false,
}

interface pollAction {
    type: InteractionStatus;
    payload?: {
        optionId?: string,
        userId?:  string
    };
  }

const pollReducer = (state = initialState, action: pollAction) => {
    switch (action.type) {
        case InteractionStatus.STARTED:
            return {
                optionId: action.payload!.optionId,
                userId:  action.payload!.userId,
                isLoading: false,
            }
        case InteractionStatus.FINISHED:
            return {
                ...state,
                isLoading: false,
            }
        case InteractionStatus.NOT_STARTED:
            return {
                ...state,
                isLoading: true,
            }
        default:
            return state
    }
}

export default pollReducer
