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
