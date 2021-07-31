import React, { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faSearch, faThLarge } from '@fortawesome/free-solid-svg-icons'
import SideBar from '../../common/SideBar'
import './dashboard.css'
import { MOCK_DATA } from './mock-data'

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('list')
  const [activeButton, setActiveButton] = useState(false)

  const handleToggleCurrentView = useCallback(() => {
    setCurrentView((view) => (view === 'list' ? 'grid' : 'list'))
  }, [setCurrentView])

  const isDetailedView = currentView === 'grid'

  const handleClickedButton = () => {
    setActiveButton(!activeButton)
    console.log(isDetailedView)
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
              <span className='avatar'>WH</span>
            </div>
          </div>
        </div>
        <div className='presentations-section'>
          <div className='above-section'>
            <p>Recent</p>
            <div className='table-grid-toggler'>
              <button
                className={activeButton ? 'table-view-btn-active' : ''}
                onClick={handleClickedButton}
                onChange={handleToggleCurrentView}
              >
                <FontAwesomeIcon icon={faList} />
              </button>
              <button
                className={!activeButton ? 'grid-view-btn-active' : ''}
                onClick={handleClickedButton}
                onChange={handleToggleCurrentView}
              >
                <FontAwesomeIcon icon={faThLarge} />
              </button>
            </div>
          </div>
          <div className={currentView === 'grid' ? 'list' : 'grid'}>
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
