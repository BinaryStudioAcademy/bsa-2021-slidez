import React, { useState, useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faList,
    faSearch,
    faThLarge,
    faUsers,
    faChalkboard,
    faEllipsisV,
    faEllipsisH,
} from '@fortawesome/free-solid-svg-icons'
import SideBar from './SideBar'
import './dashboard.scss'
import { MOCK_DATA } from './mock-data'
import { useDetectOutsideClick } from './useDetectOutsideClick'
import { useAppDispatch } from '../../hooks'
import { logout } from '../../containers/user/store'
import { AppRoute } from '../../common/routes/app-route'
import UserProfile from './UserProfile'
import table_sort from '../../../src/assets/svgs/table-sort.svg'

const Dashboard = () => {
    const [currentView, setCurrentView] = useState('table')
    const [activeButton, setActiveButton] = useState(false)
    const [searchField, setSearchField] = useState('')
    const [filteredPresentations, setFilteredPresentations] =
        useState(MOCK_DATA)

    const handleToggleCurrentView = useCallback(() => {
        setCurrentView((view) => (view === 'table' ? 'grid' : 'table'))
    }, [setCurrentView])

    const handleClickedButton = () => {
        setActiveButton(!activeButton)
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
            return value.id === 3 || value.id === 4 ? (
                <th key={value.id}>
                    {value.header} <img src={table_sort} alt='sort'></img>
                </th>
            ) : (
                <th key={value.id}>{value.header}</th>
            )
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
            <SideBar />
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
                        />
                    </div>
                    <UserProfile />
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
                                            currentView === 'grid'
                                                ? 'view-btn-active'
                                                : 'view-btn'
                                        }
                                    />
                                </label>
                            </div>
                            <div className='verticalLine' />
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
                                            currentView === 'table'
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
                                    <span className='text-no-found'>
                                        {isNotEmptyPresentation()}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className='grid'>
                                {filteredPresentations.map((md) => (
                                    <div className='card' key={md.id}>
                                        <img
                                            className='card-img'
                                            src={md.pictureUrl}
                                        />
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
                                    <span className='text-no-found'>
                                        {isNotEmptyPresentation()}
                                    </span>
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
