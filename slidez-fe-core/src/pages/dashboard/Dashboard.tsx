import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faThLarge } from '@fortawesome/free-solid-svg-icons'
import SideBar from '../../common/SideBar'
import './dashboard.css'

const Dashboard = () => {
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
        <div className='grid'>
          <div className='toggler-view'>
            <FontAwesomeIcon icon={faList} />
            <FontAwesomeIcon icon={faThLarge} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
