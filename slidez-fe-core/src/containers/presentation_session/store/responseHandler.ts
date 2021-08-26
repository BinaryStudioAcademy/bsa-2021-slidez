import { receiveSnapshot } from './store'
import { SessionResponseType } from '../enums/SessionResponse'
import { SessionResponse } from '../dto/SessionResponse'
import { SnapshotDto } from '../dto/SnapshotDto'
import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'

function throwBadType(type: string): never {
    throw new Error("Didn't expect to get here")
}

export const responseHandler =
    (dispatch: any) => (response: GenericResponse<SessionResponse, string>) => {
        if (response.error) {
            throw new Error(response.error)
        }
        switch (response.data.type) {
            case SessionResponseType.snapshot:
                const snapshot: SnapshotDto = <SnapshotDto>response.data.data
                dispatch(receiveSnapshot(snapshot))
                break
            case SessionResponseType.answeredPoll:
                break
            case SessionResponseType.startedPoll:
                break
            default:
                throwBadType(response.data.type)
        }
    }
