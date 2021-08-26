import { receiveSnapshot } from './store'
import { SessionResponseType } from '../enums/SessionResponse'
import { SessionResponse } from '../dto/SessionResponse'
import { SnapshotDto } from '../dto/SnapshotDto'

function throwBadType(type: string): never {
    throw new Error("Didn't expect to get here")
}

export const responseHandler =
    (dispatch: any) => (response: SessionResponse) => {
        console.log(typeof response)
        switch (response.type) {
            case SessionResponseType.snapshot:
                const snapshot: SnapshotDto = <SnapshotDto>response.data
                dispatch(receiveSnapshot(snapshot))
                break
            case SessionResponseType.answeredPoll:
                break
            case SessionResponseType.startedPoll:
                break
            default:
                throwBadType(response.type)
        }
    }
