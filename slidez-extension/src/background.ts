<<<<<<< HEAD
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        user_status(true, request?.payload)
            .then((res) => sendResponse(res))
            .catch((err) => console.log(err))
        return true
    }
})

function user_status(signIn: any, user_info: any): Promise<any> {
    if (signIn) {
        return fetch('http://localhost:5000/login', {
            method: 'GET',
            headers: {
                Authorization:
                    'Basic ' + btoa(`${user_info.email}:${user_info.pass}`),
            },
        })
            .then((res) => {
                return new Promise((resolve) => {
                    if (res.status !== 200) resolve('fail')

                    chrome.storage.local.set(
                        { userStatus: signIn, user_info },
                        function () {
                            if (chrome.runtime.lastError) resolve('fail')
                            resolve('success')
                        }
                    )
                })
            })
            .catch((err) => console.log(err))
    }
    return Promise.resolve()
}
//   function is_user_signed_in() {
//     return new Promise(resolve => {
//         chrome.storage.local.get(['userStatus', 'user_info'],
//             function (response) {
//                 if (chrome.runtime.lastError) resolve({ userStatus:
//                     false, user_info: {} })
//             resolve(response.userStatus === undefined ?
//                     { userStatus: false, user_info: {} } :
//                     { userStatus: response.userStatus, user_info:
//                     response.user_info }
//                     )
//             });
//     });
// }

function polling() {
    console.log('polling')
    setTimeout(polling, 1000 * 30)
}

polling()

//isolatedModules hack
export {}
||||||| b725c11
=======
import {
    ChromeMultiPortMessageBusDriver,
    BasicMessagingBus,
    isRunningInChrome,
    of,
    EventType,
    ExtensionAuthenticationSuccess,
} from 'slidez-shared'

const checkUserDataInStorage = (eb: BasicMessagingBus) => () => {
    chrome.storage.local.get(['userData'], (userData) => {
        if (userData.accessToken) {
            eb.sendMessageNoCallback({
                type: EventType.AUTH_DETAILS,
                data: {
                    success: true,
                    accessToken: userData.accessToken,
                },
            })
        } else {
            eb.sendMessageNoCallback({
                type: EventType.AUTH_DETAILS,
                data: {
                    success: false,
                    error: 'No token available',
                },
            })
        }
    })
}

const setUserDataInStore =
    (eb: BasicMessagingBus) => (message: ExtensionAuthenticationSuccess) => {
        chrome.storage.local.set(
            {
                userData: {
                    accessToken: message.data.accessToken,
                    refreshToken: message.data.refreshToken,
                },
            },
            () => {
                eb.sendMessageNoCallback({
                    type: EventType.AUTH_DETAILS,
                    data: {
                        success: true,
                        accessToken: message.data.accessToken,
                    },
                })
            }
        )
    }

async function background() {
    if (!isRunningInChrome()) {
        throw new Error(
            'This is a Chrome-only script. Please, run in a proper environment'
        )
    }

    const driver = new ChromeMultiPortMessageBusDriver()

    chrome.runtime.onConnect.addListener((port) => {
        console.log('Adding port')
        driver.addPort(port)
    })

    chrome.runtime.onConnectExternal.addListener((port) => {
        console.log('Adding external port')
        driver.addPort(port)
    })

    const eb = new BasicMessagingBus(driver)

    eb.registerEventHandler(
        EventType.AUTH_REQUESTED,
        of(checkUserDataInStorage(eb))
    )

    eb.registerEventHandler(
        EventType.EXTENSION_AUTH_SUCCESS,
        of(setUserDataInStore(eb))
    )

    console.log('Event bus is ready and running!')
}

background()

//isolatedModules hack
export {}
>>>>>>> origin/develop
