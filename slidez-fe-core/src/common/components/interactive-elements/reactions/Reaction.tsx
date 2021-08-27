import { Button, ButtonGroup, Popover } from '@material-ui/core'
import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

const Reaction = () => {
    const [showMessage, setShowMessage] = useState(true)

    return (
        <Popover
            open={showMessage}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <CSSTransition
                in={showMessage}
                timeout={300}
                classNames='alert'
                unmountOnExit
            >
                <ButtonGroup>
                    <Button onClick={() => setShowMessage(false)}>Like</Button>
                    <Button>Thumb up</Button>
                </ButtonGroup>
            </CSSTransition>
        </Popover>
    )
}

export default Reaction
