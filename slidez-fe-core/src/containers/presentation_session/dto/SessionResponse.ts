import { SessionResponseType } from '../enums/SessionResponse'
import { SnapshotDto } from './SnapshotDto'
import { PollDto } from './InteractiveElement'

export interface SessionResponse {
    type: SessionResponseType
    data: SnapshotDto | PollDto
}
