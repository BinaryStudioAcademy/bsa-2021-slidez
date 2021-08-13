import { ChromeEvents, log } from 'slidez-shared';

log();

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.message === 'extension_connected') {
    log();
    const { type, auth_token } = response;
    console.log(' - type -  ' + type + '\n - auth_token - ' + auth_token);
    return auth_token;
  }
});


// const port = chrome.runtime.connect({ name: 'extension_connected' });
// port.postMessage({
//   type: 'extension_connected',
//   auth_token: 'auth_token',
// });

// chrome.runtime.connect('extension_connected', function (response: ChromeEvents) {
//   console.log('connect - ' + response);
//   log();
//   const { type, auth_token } = response;
//   console.log(type + ' ' + auth_token);
// });
export {}