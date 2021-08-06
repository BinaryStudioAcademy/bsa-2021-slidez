import React, { MouseEventHandler, ReactNode } from 'react'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const styles: any = () => ({
    root: {
        backgroundColor: '#4af092',
        color: 'white',
        fontFamily: "'Rubik', serif",
        fontSize: '20px',
        paddingTop: '10px',
        paddingBottom: '10px',
        border: '2px transparent solid',
        borderRadius: '30px',
        flex: 1,
        boxSizing: 'border-box',
    },
})

function GeneralButton(props: ButtonProps) {
    const {
        id,
        className,
        onClick,
        Name,
        width,
        height,
        transparent,
        children,
        disabled,
        ...attrs
    } = props

    const transparentStyle = {
        border: '2px #4af092 solid',
        color: '#4af092',
        backgroundColor: 'white',
    }

    const style = {
        ...styles?.root,
        ...(transparent ? transparentStyle : {}),
        width: width,
        height: height,
        disabled: disabled,
    }

    return (
        <Button id={id} style={style} onClick={() => onClick} {...attrs}>
            {Name}
            {children}
        </Button>
    )
}

type ButtonProps = {
    id?: string
    className: string
    children?: React.ReactNode
    onClick?: MouseEventHandler<any> | undefined
    Name?: ReactNode
    width?: number
    height?: number
    transparent?: boolean
    disabled?: boolean
    attrs?: any
}

export default withStyles(styles)(GeneralButton)
