import SockJS from 'sockjs-client'
import Stomp, { Client } from 'webstomp-client'

let connected = false
let socket = undefined
let stompClient: Client | undefined = undefined

export const send = () => {
    let send_message = 'hello !'
    if (stompClient && stompClient.connected) {
        const msg = { name: send_message }
        stompClient.send('/slidez/hello', JSON.stringify(msg), {})
    }
}
export const connect = () => {
    socket = new SockJS('http://localhost:5000/ws')
    stompClient = Stomp.over(socket)
    stompClient.connect(
        {
            'Access-Control-Allow-Credentials': 'true',
        },
        (frame) => {
            connected = true
            if (stompClient && stompClient.connected) {
                stompClient.subscribe('/topic/greetings', (tick) => {})
                send()
            }
        },
        (error) => {
            console.log(error)
            connected = false
        }
    )
}
export const disconnect = () => {
    if (stompClient) {
        stompClient.disconnect()
    }
    connected = false
}
