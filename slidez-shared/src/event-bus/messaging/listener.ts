import { ProtocolMessage } from '../protocol'

export type MessageListener<T extends ProtocolMessage> = (
    res: T
) => MessageListener<T> | null
export type Handler<T> = (message: T) => void
//Flimsy design, we might change it a bit
export const of = <T extends ProtocolMessage>(handler: Handler<T>) => {
    const wrappedHandler = (message: T) => {
        handler(message)
        return wrappedHandler
    }

    return wrappedHandler
}

export const kTimes = <T extends ProtocolMessage>(
    times: number,
    handler: MessageListener<T>
) => {
    return (message: T) => {
        const newHandler = handler(message)
        if (newHandler === null || times === 1) {
            return null
        }

        return kTimes(times - 1, newHandler)
    }
}

export const once = <T extends ProtocolMessage>(handler: Handler<T>) => {
    return kTimes(1, of(handler))
}

export const withPredicate = <T extends ProtocolMessage>(
    predicate: (message: T) => boolean,
    handler: MessageListener<T>
) => {
    const wrappedHandler = (message: T) => {
        if (!predicate(message)) {
            return wrappedHandler
        }
        const newHandler = handler(message)

        if (newHandler === null) {
            return null
        }

        return withPredicate(predicate, newHandler)
    }
}

export const oneOf = (
    handlers: Partial<
        Record<ProtocolMessage['type'], MessageListener<ProtocolMessage>>
    >
) => {
    const wrappedHandler = (message: ProtocolMessage) => {
        if (handlers[message.type] === undefined) {
            return wrappedHandler
        }
        const newHandler = handlers[message.type]!(message)
        if (newHandler === null) {
            return null
        }

        return oneOf({ ...handlers, [message.type]: newHandler })
    }
}
