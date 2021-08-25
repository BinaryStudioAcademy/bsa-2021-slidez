export const isRunningInChrome = () => {
    if (window.chrome !== undefined) {
        return true
    }

    return false
}
