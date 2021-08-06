import React, { FC } from 'react'
import { ReactComponent as SlidezLogo } from '../../../assets/svgs/logo.svg'

interface LogoProps {
    width: string | number
}

const Logo: FC<LogoProps> = ({ width }: LogoProps) => {
    return <SlidezLogo width={width} />
}

export default Logo
