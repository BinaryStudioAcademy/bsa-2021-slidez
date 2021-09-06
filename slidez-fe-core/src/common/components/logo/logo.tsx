import React, { FC } from 'react'
import { ReactComponent as SlidezLogo } from '../../../assets/svgs/logo.svg'
import { ReactComponent as InteractiveSlidezLogo } from '../../../assets/svgs/interactive-wrapper-logo.svg'

interface LogoProps {
    width: string | number
    height?: string | number
}

export const Logo: FC<LogoProps> = ({ width, height }: LogoProps) => {
    return <SlidezLogo width={width} height={height} />
}

export const InteractiveLogo: FC<LogoProps> = ({
    width,
    height,
}: LogoProps) => {
    return <InteractiveSlidezLogo width={width} height={height} />
}
