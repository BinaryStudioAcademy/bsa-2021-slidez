const WsEndpoint = Object.freeze({
    REACT_APP_WEB_SOCKET_ENDPOINT:
        process.env.REACT_APP_WEB_SOCKET_ENDPOINT || '',
    REACT_APP_WEB_SOCKET_SNAPSHOT:
        process.env.REACT_APP_WEB_SOCKET_SNAPSHOT || '',
    REACT_APP_WEB_SOCKET_CREATED_POLL:
        process.env.REACT_APP_WEB_SOCKET_CREATED_POLL || '',
    REACT_APP_WEB_SOCKET_ANSWERED_POLL:
        process.env.REACT_APP_WEB_SOCKET_ANSWERED_POLL || '',
})

export { WsEndpoint }
