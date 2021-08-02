import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className='logo'>
        <a href='#'>Slidez</a>
      </div>
      <div className='navigation'>
        <span>
          <a href='#'>
            <FontAwesomeIcon className='icon-add' icon={faPlus} />
          </a>
        </span>
        <span>
          <a href='#'>
            <div className='icon-active'>
              <FontAwesomeIcon className='icon-book' icon={faPlus} />
            </div>
          </a>
        </span>
        <span>
          <a href='#'>
            <FontAwesomeIcon className='icon' icon={faPlus} />
          </a>
        </span>
        <span>
          <a href='#'>
            <FontAwesomeIcon className='icon' icon={faPlus} />
          </a>
        </span>
      </div>
    </div>
  )
}

export default SideBar
