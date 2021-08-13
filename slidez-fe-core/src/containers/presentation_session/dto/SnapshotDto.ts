import { PollDto } from './PollDto'

export interface SnapshotDto {
    status: string
    polls: PollDto[]
}
