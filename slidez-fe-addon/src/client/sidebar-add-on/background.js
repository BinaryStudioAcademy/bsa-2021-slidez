import { ChromeEvents, log } from 'slidez-shared';

log();

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.message === 'extension_connected') {
    log();
    //test document.body.style.backgroundColor = "red"
    const { type, auth_token } = response;
    //console.log(' - type -  ' + type + '\n - auth_token - ' + auth_token);
    return auth_token;
  }
});
export {}