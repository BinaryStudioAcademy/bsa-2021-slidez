import React from 'react'
import close_cross_icon from '../../../assets/svgs/close-cross.svg'
import '../qa.scss'

const CloseButton = (params: any) => {
    return (
        <button onClick={params.onClick} className='close-cross-btn'>
            <span>
                <img
                    className='close-cross-img'
                    src={close_cross_icon}
                    alt='graph'
                />
            </span>
        </button>
    )
}

export default CloseButton
