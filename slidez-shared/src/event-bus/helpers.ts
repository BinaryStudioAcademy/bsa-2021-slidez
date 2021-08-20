type CallbackEventType<T extends string> = `${T}-callback`
const callbackEventType = <T extends string>(type: T): CallbackEventType<T> =>
    `${type}-callback` as CallbackEventType<T>
