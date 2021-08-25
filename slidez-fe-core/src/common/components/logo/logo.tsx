import React, { FC } from 'react'
import { ReactComponent as SlidezLogo } from '../../../assets/svgs/logo.svg'
import { ReactComponent as InteractiveSlidezLogo } from '../../../assets/svgs/interactive-wrapper-logo.svg'

interface LogoProps {
    width: string | number
}

export const Logo: FC<LogoProps> = ({ width }: LogoProps) => {
    return <SlidezLogo width={width} />
}

export const InteractiveLogo: FC<LogoProps> = ({ width }: LogoProps) => {
    return <InteractiveSlidezLogo width={width} />
}
