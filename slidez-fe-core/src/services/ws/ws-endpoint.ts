const WsEndpoint = Object.freeze({
    ENDPOINT: process.env.REACT_APP_WEB_SOCKET_ENDPOINT || '',
    TOPIC_EVENT: '/topic/event',
    QUEUE_EVENT: '/slidez/event',
})

export { WsEndpoint }
