type ExtensionConnectionMessage = { 
    type: 'extension_connected'; 
    auth_token: string | null; 
}

export type ChromeEvents = ExtensionConnectionMessage;