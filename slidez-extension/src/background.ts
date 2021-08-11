chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        user_status(true, request?.payload)
            .then(res => sendResponse(res))
            .catch(err => console.log(err));
        return true;
    } 
  });
  
  function user_status(signIn, user_info): Promise<any> {
    if (signIn) {
        return fetch('http://localhost:5000/login', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(`${user_info.email}:${user_info.pass}`)
            }
        })
            .then(res => {
                return new Promise(resolve => {
                    if (res.status !== 200) resolve('fail')
  
                    chrome.storage.local.set({ userStatus: signIn, user_info }, function (response) {
                        if (chrome.runtime.lastError) resolve('fail');
  
                        user_signed_in = signIn;
                        resolve('success');
                    });
                })
            })
            .catch(err => console.log(err));
    }
    return Promise.resolve();
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
