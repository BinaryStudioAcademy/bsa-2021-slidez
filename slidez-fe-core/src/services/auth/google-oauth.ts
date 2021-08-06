const GoogleOAuth = Object.freeze({
    GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    GOOGLE_COOKIE_POLICY: 'single_host_origin',
    GOOGLE_REDIRECT_URI: process.env.REACT_APP_GOOGLE_REDIRECT_URI || '',
})

export { GoogleOAuth }
