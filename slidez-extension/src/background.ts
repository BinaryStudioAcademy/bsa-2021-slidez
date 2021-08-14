import { doPost } from 'slidez-shared'

function notify(title: string) {
    var options = {
        title: title,
        message: 'Failed to login',
        type: 'basic',
        iconUrl: '../public/logo192.png',
    }

    return chrome.notifications.create('', options)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        logIn(true, request?.payload)
            .then((res) => sendResponse(res))
            .catch((err) => {
                notify('Error')
                return err
            })
        return true
    } else if (request.message === 'userStatus') {
        isUserSignedIn()
            .then((res) => {
                sendResponse({
                    message: 'success',
                })
            })
            .catch((err) => {
                return err
            })
        return true
    }
})

async function logIn(signIn: any, userInfo: any) {
    const JWT = 'jwt'
    if (signIn) {
        const { data, status } = await doPost('auth/login', userInfo)
        return new Promise((resolve) => {
            if (status === 200) {
                const logInResult: {
                    accessToken: string
                } = data
                chrome.storage.local.set(
                    { userStatus: signIn, logInResult },
                    function () {
                        if (chrome.runtime.lastError) {
                            notify('Error')
                            resolve('fail')
                        } else {
                            chrome.runtime.sendMessage(JWT, {
                                message: logInResult.accessToken,
                            })
                            resolve('success')
                        }
                    }
                )
            }
        })
    }
}
function isUserSignedIn() {
    return new Promise((resolve) => {
        chrome.storage.local.get(
            ['userStatus', 'logInResult'],
            function (response) {
                if (chrome.runtime.lastError)
                    resolve({ userStatus: false, logInResult: {} })
                resolve(
                    response.userStatus === undefined
                        ? { userStatus: false, logInResult: {} }
                        : {
                              userStatus: response.userStatus,
                              logInResult: response.logInResult,
                          }
                )
            }
        )
    })
}

function polling() {
    console.log('polling')
    setTimeout(polling, 1000 * 30)
}

polling()

//isolatedModules hack
export {}
