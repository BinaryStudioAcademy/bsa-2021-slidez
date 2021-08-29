import React, { MouseEventHandler } from 'react'
import close_cross_icon from '../../../assets/svgs/close-cross.svg'
import '../qa.scss'

const CloseButton = (onClick: any) => {
    return (
        <button onClick={onClick} className='close-cross-btn'>
            <span>
                <a href=''>
                    <img
                        className='close-cross-img'
                        src={close_cross_icon}
                        alt='graph'
                    ></img>
                </a>
            </span>
        </button>
    )
}

export default CloseButton
