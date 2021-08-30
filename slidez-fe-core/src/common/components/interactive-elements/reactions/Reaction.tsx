import { Button, ButtonGroup, Popover } from '@material-ui/core'
import React, { useState } from 'react'
import like from '../../../../assets/svgs/like_reaction.svg'
import thumb_up from '../../../../assets/svgs/thumb_up_reaction.svg'
import 'animate.css'
import './reaction.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    anchor: HTMLButtonElement | null
}

const Reaction = ({ anchor }: ButtonProps) => {
    const [showLike, setShowLike] = useState(false)
    const [showThumbUp, setShowThumbUp] = useState(false)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(anchor)

    const handleReaction = (show: boolean, src: string) => {
        return (
            <div>
                {show ? (
                    <img
                        src={src}
                        className='animate__animated animate__slideInUp'
                    />
                ) : (
                    ''
                )}
            </div>
        )
    }
    const handleLike = () => {
        setShowLike(true)
        setTimeout(() => setShowLike(false), 2000)
    }

    const handleThumbUp = () => {
        setShowThumbUp(true)
        setTimeout(() => setShowThumbUp(false), 2000)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const open = Boolean(anchorEl)

    return (
        <div className='reaction'>
            <Popover
                id='simple-popover'
                anchorEl={anchorEl}
                onClose={handleClose}
                open={open}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <ButtonGroup>
                    <Button onClick={handleLike}>Like</Button>
                    <Button onClick={handleThumbUp}>Thumb up</Button>
                </ButtonGroup>
            </Popover>
            {handleReaction(showLike, like)}
            {handleReaction(showThumbUp, thumb_up)}
        </div>
    )
}

export default Reaction
