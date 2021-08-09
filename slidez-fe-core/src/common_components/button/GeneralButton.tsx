import React, { MouseEventHandler, ReactNode } from 'react'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const styles: any = () => ({
    root: {
        backgroundColor: '#59d0a5',
        '&:hover': {
            backgroundColor: '#73b69e',
        },
        color: 'white',
        fontFamily: "'Rubik', serif",
        fontSize: '16px',
        paddingTop: '10px',
        paddingBottom: '10px',
        border: '2px transparent solid',
        borderRadius: '30px',
        flex: 1,
        boxSizing: 'border-box',
        textTransform: 'none',
        fontWeight: '400',
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
        border: '2px #59d0a5 solid',
        color: '#59d0a5',
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: '#59d0a5',
        },
    }

    const style = {
        ...styles?.root,
        ...(transparent ? transparentStyle : {}),
        width: width,
        height: height,
        disabled: disabled,
    }

    return (
        <Button id={id} style={style} onClick={onClick} {...attrs}>
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
