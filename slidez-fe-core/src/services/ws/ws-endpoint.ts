const WsEndpoint = Object.freeze({
    REACT_APP_WEB_SOCKET_ENDPOINT:
        process.env.REACT_APP_WEB_SOCKET_ENDPOINT || '',
})

export { WsEndpoint }
