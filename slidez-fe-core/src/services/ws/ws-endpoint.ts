const WsEndpoint = Object.freeze({
    ENDPOINT: process.env.REACT_APP_WEB_SOCKET_ENDPOINT || '',
    SNAPSHOT_TOPIC: '/topic/snapshot',
    CREATED_POLL_TOPIC: '/topic/created/poll',
    ANSWERED_POLL_TOPIC: '/topic/answered/poll',
    SNAPSHOT_QUEUE: '/slidez/snapshot',
    CREATE_POLL_QUEUE: '/slidez/create/poll',
    ANSWER_POLL_QUEUE: '/slidez/answer/poll',
})

export { WsEndpoint }
