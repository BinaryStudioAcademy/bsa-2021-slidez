//NOT TYPE SAFE
export const readKey = <T = any>(keys: string[]): Promise<T> => {
    return new Promise((res) => {
        chrome.storage.local.get(keys, (value: any) => res(value as T))
    })
}

type PresentationStore = Record<string, string | null>

export type ChromeStore = { presentations?: PresentationStore }
