import { ParticipantEvent } from './dto/ParticipantEvent'

const visitedPresentations = 'visited_presentations'

const writeEvents = (events: ParticipantEvent[]) => {
    const result: string = JSON.stringify(events)
    window.localStorage.setItem(visitedPresentations, result)
}

export const saveParticipantEvent = (
    link: string,
    presentationName: string
): void => {
    const events: ParticipantEvent[] = getParticipantEvents()
    let found: boolean = false
    for (const event of events) {
        if (event.code === link) {
            event.viewsDate = new Date()
            found = true
            break
        }
    }
    if (!found) {
        const event: ParticipantEvent = {
            code: link,
            name: presentationName,
            viewsDate: new Date(),
        }
        events.push(event)
    }
    writeEvents(events)
}

// Returns array of events, sorted by date
export const getParticipantEvents = (): ParticipantEvent[] => {
    return JSON.parse(window.localStorage.getItem(visitedPresentations) || '[]')
}
