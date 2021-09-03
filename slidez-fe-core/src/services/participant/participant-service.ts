import { v4 as uuidv4 } from 'uuid'
import { ParticipantData } from './dto/ParticipantData'

const participantFirstName: string = 'participant_first_name'
const participantLastName: string = 'participant_last_name'
const participantId: string = 'participant_id'

const defaultNickname = 'Anonymous'

export const saveParticipantData = (
    firstName: string,
    lastName: string
): void => {
    window.localStorage.setItem(participantFirstName, firstName)
    window.localStorage.setItem(participantLastName, lastName)
    window.localStorage.setItem(participantId, uuidv4())
}

export const getParticipantData = (): ParticipantData => {
    return {
        id: window.localStorage.getItem(participantId),
        participantLastName: window.localStorage.getItem(participantLastName),
        participantFirstName: window.localStorage.getItem(participantFirstName),
    }
}

export const createNickName = (): string => {
    const data: ParticipantData = getParticipantData()
    if (data.participantFirstName && data.participantLastName) {
        return data.participantFirstName + ' ' + data.participantLastName
    }
    return defaultNickname
}
