import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faSearch, faThLarge } from '@fortawesome/free-solid-svg-icons'
import SideBar from '../../common/SideBar'
import './dashboard.css'
import { MOCK_DATA } from './mock-data'

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('table')
  const [activeButton, setActiveButton] = useState(false)

  const handleToggleCurrentView = useCallback(() => {
    setCurrentView((view) => (view === 'table' ? 'grid' : 'table'))
  }, [setCurrentView])

  const handleClickedButton = () => {
    setActiveButton(!activeButton)
  }

  return (
    <div className='dashboard-page'>
      <SideBar></SideBar>
      <div className='page-content'>
        <div className='search-and-user'>
          <div className='search-bar'>
            <input
              id='searchQueryInput'
              type='search'
              placeholder='Search...'
            ></input>
            <button
              id='searchQuerySubmit'
              type='submit'
              name='searchQuerySubmit'
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div className='user-profile'>
            <div className='user-avatar'>
              <div className='avatar'>WH</div>
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
            <div className='row'>
              {MOCK_DATA.map((md) => (
                <div className='column' key={md.id}>
                  <img src={md.pictureUrl}></img>
                  <p>{md.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
