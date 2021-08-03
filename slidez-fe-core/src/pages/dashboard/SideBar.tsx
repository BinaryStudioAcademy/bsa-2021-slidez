import React from 'react'
import {
    faBook,
    faPlus,
    faShapes,
    faSortAmountUpAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SlidezLogo from '../../../src/logo_Slidez_1.svg'

const SideBar = () => {
    return (
        <div className='sidebar'>
            <div className='logo'>
                <a href=''>
                    <img src={SlidezLogo} alt='Slidez Logo'></img>
                </a>
            </div>
            <div className='navigation'>
                <span>
                    <a href=''>
                        <div className='icon-add'>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </a>
                </span>
                <span>
                    <a href=''>
                        <div className='icon-book'>
                            <FontAwesomeIcon icon={faBook} />
                        </div>
                    </a>
                </span>
                <span>
                    <a href='#'>
                        <FontAwesomeIcon
                            className='icon'
                            icon={faSortAmountUpAlt}
                        />
                    </a>
                </span>
                <span>
                    <a href='#'>
                        <FontAwesomeIcon className='icon' icon={faShapes} />
                    </a>
                </span>
            </div>
        </div>
    )
}

export default SideBar
