import { SessionResponseType } from '../enums/SessionResponse'
import { SnapshotDto } from './SnapshotDto'
import { PollDto } from './PollDto'

export interface SessionResponse {
    type: SessionResponseType
    data: SnapshotDto | PollDto
}
