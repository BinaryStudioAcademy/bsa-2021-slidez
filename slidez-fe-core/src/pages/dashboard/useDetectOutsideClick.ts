import { useState, useEffect } from 'react'

export const useDetectOutsideClick = (
    el: React.RefObject<HTMLInputElement>,
    initialState: boolean
) => {
    const [isActive, setIsActive] = useState(initialState)

    useEffect(() => {
        const onClick = (e: Event) => {
            if (
                e.target instanceof HTMLElement &&
                el.current !== null &&
                !el.current.contains(e.target)
            ) {
                setIsActive(!isActive)
            }
        }

        if (isActive) {
            window.addEventListener('click', onClick)
        }

        return () => {
            window.removeEventListener('click', onClick)
        }
    }, [isActive, el])

    return [isActive, setIsActive] as const
}
