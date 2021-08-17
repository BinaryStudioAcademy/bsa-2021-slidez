import React, { useState, useCallback, useRef, useEffect } from 'react'
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
    faEllipsisH,
} from '@fortawesome/free-solid-svg-icons'
import SideBar from './SideBar'
import './dashboard.scss'
import { MOCK_DATA } from './mock-data'
import { useDetectOutsideClick } from './useDetectOutsideClick'
import { useAppDispatch } from '../../hooks'
import { logout } from '../../containers/user/store'
//import { AppRoute } from '../../common/routes/app-route'

const Dashboard = () => {
    const [currentView, setCurrentView] = useState('table')
    const [activeButton, setActiveButton] = useState(false)
    const dropdownRef = useRef<HTMLInputElement>(null)
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
    const [searchField, setSearchField] = useState('')
    const [filteredPresentations, setFilteredPresentations] =
        useState(MOCK_DATA)
    const dispatch = useAppDispatch()

    const handleToggleCurrentView = useCallback(() => {
        setCurrentView((view) => (view === 'table' ? 'grid' : 'table'))
    }, [setCurrentView])

    const handleClickedButton = () => {
        setActiveButton(!activeButton)
    }

    const handleDropDown = () => {
        setIsActive(!isActive)
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const tableHeader = [
        {
            id: 1,
            header: 'Name',
        },
        {
            id: 2,
            header: 'Event code',
        },
        {
            id: 3,
            header: 'Created',
        },
        {
            id: 4,
            header: 'Updated',
        },
        {
            id: 5,
            header: '',
        },
    ]

    const renderTableHeader = () => {
        return tableHeader.map((value) => {
            return <th key={value.id}>{value.header}</th>
        })
    }

    const renderTableData = () => {
        return filteredPresentations.map((presentation) => {
            return (
                <tr key={presentation.id}>
                    <td>{presentation.name}</td>
                    <td>32343</td>
                    <td>24.07.21</td>
                    <td>02.08.21</td>
                    <td>
                        <FontAwesomeIcon
                            className='icon-options'
                            icon={faEllipsisH}
                        />
                    </td>
                </tr>
            )
        })
    }

    useEffect(() => {
        setFilteredPresentations(
            MOCK_DATA.filter((presentation) =>
                presentation.name
                    .toLowerCase()
                    .includes(searchField.toLowerCase())
            )
        )
    }, [searchField])

    const isNotEmptyPresentation = () =>
        filteredPresentations.length === 0 ? (
            <span>
                No presentations are found by search term {searchField}.
            </span>
        ) : (
            ''
        )

    const handleChange = (e: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setSearchField(e.target.value)
    }

    return (
        <div className='dashboard-page'>
            <SideBar></SideBar>
            <div className='page-content'>
                <div className='search-and-user'>
                    <div className='search-bar'>
                        <FontAwesomeIcon
                            className='search-icon'
                            icon={faSearch}
                        />
                        <input
                            id='searchQueryInput'
                            type='search'
                            placeholder='Search...'
                            onChange={handleChange}
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
                                        <div className='user-name'>
                                            Wilson Herwitz
                                        </div>
                                        <div className='user-email'>
                                            herwitz@example.com
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                                <a href={AppRoute.UPDATE_USER}>
                                    <FontAwesomeIcon
                                        className='user-icon'
                                        icon={faUser}
                                    />
                                    Edit profile
                                </a>
                                <a href=''>
                                    <FontAwesomeIcon
                                        className='user-icon'
                                        icon={faCog}
                                    />
                                    Setting
                                </a>
                                <a href='' onClick={handleLogout}>
                                    <FontAwesomeIcon
                                        className='user-icon'
                                        icon={faSignOutAlt}
                                    />
                                    Log out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='presentations-section'>
                    <div className='above-section'>
                        <p>Your presentation</p>
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
                                        className={
                                            activeButton
                                                ? 'view-btn-active'
                                                : 'view-btn'
                                        }
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
                                        className={
                                            !activeButton
                                                ? 'view-btn-active'
                                                : 'view-btn'
                                        }
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        {currentView === 'grid' ? (
                            <div className='table'>
                                <table id='table-presentation'>
                                    <tbody>
                                        <tr>{renderTableHeader()}</tr>
                                        {renderTableData()}
                                    </tbody>
                                </table>
                                <div className='no-found-presentations'>
                                    {isNotEmptyPresentation()}
                                </div>
                            </div>
                        ) : (
                            <div className='grid'>
                                {filteredPresentations.map((md) => (
                                    <div className='card' key={md.id}>
                                        <img
                                            className='card-img'
                                            src={md.pictureUrl}
                                        ></img>
                                        <div className='card-name'>
                                            {md.name}
                                        </div>
                                        <div className='card-info'>
                                            <span className='card-icons'>
                                                <FontAwesomeIcon
                                                    className='icon-presentation'
                                                    icon={faChalkboard}
                                                />
                                                <FontAwesomeIcon
                                                    className='icon-users'
                                                    icon={faUsers}
                                                />
                                                <span className='card-date'>
                                                    12.07.21
                                                </span>
                                            </span>
                                            <span className='icon-details'>
                                                <FontAwesomeIcon
                                                    icon={faEllipsisV}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div className='no-found-presentations'>
                                    {isNotEmptyPresentation()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
