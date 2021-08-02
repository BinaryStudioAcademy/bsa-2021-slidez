import React, { useState, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faList,
  faSearch,
  faThLarge,
  faUsers,
  faChalkboard,
  faEllipsisV,
  faUser,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'
import SideBar from '../../common/SideBar'
import './dashboard.css'
import { MOCK_DATA } from './mock-data'
import { useDetectOutsideClick } from './useDetectOutsideClick'

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('table')
  const [activeButton, setActiveButton] = useState(false)
  const dropdownRef = useRef<HTMLInputElement>(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)

  const handleToggleCurrentView = useCallback(() => {
    setCurrentView((view) => (view === 'table' ? 'grid' : 'table'))
  }, [setCurrentView])

  const handleClickedButton = () => {
    setActiveButton(!activeButton)
  }

  const handleDropDown = () => {
    setIsActive(!isActive)
  }

  return (
    <div className='dashboard-page'>
      <SideBar></SideBar>
      <div className='page-content'>
        <div className='search-and-user'>
          <div className='search-bar'>
            <FontAwesomeIcon className='search-icon' icon={faSearch} />
            <input
              id='searchQueryInput'
              type='search'
              placeholder='Search...'
            ></input>
          </div>
          <div className='user-profile'>
            <div className='user-avatar'>
              <div onClick={handleDropDown} className='avatar'>
                WH
              </div>
              <div
                ref={dropdownRef}
                className={`dropdown-content ${
                  isActive ? 'active' : 'inactive'
                }`}
              >
                <div className='user-info'>
                  <div className='avatar'>WH</div>
                  <div>
                    <div className='user-name'>name</div>
                    <div className='user-email'>email</div>
                  </div>
                </div>
                <hr></hr>
                <a href='#'>
                  <FontAwesomeIcon className='user-icon' icon={faUser} />
                  Edit profile
                </a>
                <a href='#'>
                  <FontAwesomeIcon className='user-icon' icon={faCog} />
                  Setting
                </a>
                <a href='#'>
                  <FontAwesomeIcon className='user-icon' icon={faSignOutAlt} />
                  Log out
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='presentations-section'>
          <div className='above-section'>
            <p>Your presentations</p>
            <div className='table-grid-toggler'>
              <div>
                <label>
                  <input
                    type='radio'
                    value='table'
                    checked={currentView === 'grid'}
                    onChange={handleToggleCurrentView}
                    onClick={handleClickedButton}
                  />
                  <FontAwesomeIcon
                    icon={faList}
                    className={activeButton ? 'view-btn-active' : 'view-btn'}
                  />
                </label>
              </div>
              <div className='verticalLine'></div>
              <div>
                <label>
                  <input
                    type='radio'
                    value='grid'
                    checked={currentView === 'table'}
                    onChange={handleToggleCurrentView}
                    onClick={handleClickedButton}
                  />
                  <FontAwesomeIcon
                    icon={faThLarge}
                    className={!activeButton ? 'view-btn-active' : 'view-btn'}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className={currentView === 'grid' ? 'table' : 'grid'}>
            {MOCK_DATA.map((md) => (
              <div className='card' key={md.id}>
                <img className='card-img' src={md.pictureUrl}></img>
                <div className='card-name'>{md.name}</div>
                <div className='card-info'>
                  <span className='card-icons'>
                    <FontAwesomeIcon
                      className='icon-presentation'
                      icon={faChalkboard}
                    />
                    <FontAwesomeIcon className='icon-users' icon={faUsers} />
                    <span className='card-date'>12.07.21</span>
                  </span>
                  <span className='icon-details'>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
