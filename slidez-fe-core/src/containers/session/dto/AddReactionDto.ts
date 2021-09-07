import { Reactions } from '../../../types/reactions'

export interface AddReactionDto {
    username: string
    reactionType: Reactions
}
