import { doPost } from 'slidez-shared'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        userStatus(true, request?.payload)
            .then((res) => sendResponse(res))
            .catch((err) => console.log(err))
        return true
    } else if (request.message === 'userStatus') {
        // isUserSignedIn()
        //     .then(res => {
        //         sendResponse({
        //             message: 'success',
        //             userStatus: logInResult: res.logInResult.email
        //         });
        //     })
        //     .catch(err => console.log(err));
        //     return true;
    }
})

async function userStatus(signIn: any, userInfo: any) {
    if (signIn) {
        const { data, status } = await doPost(
            'login',
            { email: String, password: String },
            userInfo
        )
        return new Promise((resolve) => {
            if (status === 200) {
                const logInResult: {
                    accessToken: string
                    email: string
                    password: string
                } = data
                chrome.storage.local.set(
                    { userStatus: signIn, logInResult },
                    function () {
                        if (chrome.runtime.lastError) {
                            resolve('fail')
                        } else {
                            chrome.runtime.sendMessage({
                                message: logInResult.accessToken,
                            })
                            resolve('success')
                        }
                    }
                )
            } else {
                resolve('fail')
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
