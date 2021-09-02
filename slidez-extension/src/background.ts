import {
    ChromeMultiPortMessageBusDriver,
    BasicMessagingBus,
    isRunningInChrome,
    of,
    EventType,
    SetActiveSession,
} from 'slidez-shared'
import { ChromeStore, readKey } from './chrome-store'

const setActiveSession =
    (eb: BasicMessagingBus) => async (message: SetActiveSession) => {
        const { presentations } = await readKey<ChromeStore>(['presentations'])
        chrome.storage.local.set({
            presentations: {
                ...(presentations ?? {}),
                [message.data.presentationId]: message.data.sessionCode,
            },
        })
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
        EventType.SET_ACTIVE_SESSION,
        of(setActiveSession(eb))
    )

    console.log('Event bus is ready and running!')
}

background()

//isolatedModules hack
export {}
