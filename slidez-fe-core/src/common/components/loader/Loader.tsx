import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './Loader.scss'

const Loader = () => {
    return (
        <div className='spinner'>
            <FontAwesomeIcon className='spinner-icon' icon={faSpinner} />
        </div>
    )
}

export default Loader
