import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './Loader.scss'

interface IProps {
    width?: number | string
    height?: number | string
}

const Loader: React.FC<IProps> = ({ width, height }: IProps) => {
    return (
        <div
            className='spinner-container'
            style={{ width: width, height: height }}
        >
            <div className='spinner'>
                <FontAwesomeIcon className='spinner-icon' icon={faSpinner} />
            </div>
        </div>
    )
}

export default Loader
