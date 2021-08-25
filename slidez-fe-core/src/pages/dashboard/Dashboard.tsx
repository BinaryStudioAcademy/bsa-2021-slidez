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
import SideBar from '../../containers/sideBar/SideBar'
import styles from './styles.module.scss'
import { MOCK_DATA } from './mock-data'
import UserProfile from '../../containers/user-menu/UserMenu'
import table_sort from '../../../src/assets/svgs/table-sort.svg'

const Dashboard = () => {
    const [currentView, setCurrentView] = useState('table')
    const [searchField, setSearchField] = useState('')
    const [filteredPresentations, setFilteredPresentations] =
        useState(MOCK_DATA)

    const toggleGridView = () => {
        setCurrentView('grid')
    }
    const toggleTableView = () => {
        setCurrentView('table')
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
                            className={styles.iconOptions}
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

    const isEmptyPresentations = () => filteredPresentations.length === 0

    const handleChange = (e: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setSearchField(e.target.value)
    }

    const getNoFoundPresentationBlock = () => (
        <div className={styles.noFoundPresentations}>
            <span className={styles.textNotFound}>
                No presentations are found by search term {searchField}.
            </span>
        </div>
    )

    const getTableView = () =>
        !isEmptyPresentations() ? (
            <div className={styles.table}>
                <table className={styles.presentationTable}>
                    <tbody>
                        <tr>{renderTableHeader()}</tr>
                        {renderTableData()}
                    </tbody>
                </table>
            </div>
        ) : (
            getNoFoundPresentationBlock()
        )

    const getGridView = () =>
        !isEmptyPresentations() ? (
            <div className={styles.grid}>
                {filteredPresentations.map((md) => (
                    <div className={styles.card} key={md.id}>
                        <img className={styles.cardImg} src={md.pictureUrl} />
                        <div className={styles.cardName}> {md.name} </div>
                        <div className={styles.cardInfo}>
                            <span className={styles.cardIcons}>
                                <FontAwesomeIcon
                                    className={styles.iconPresentation}
                                    icon={faChalkboard}
                                />
                                <FontAwesomeIcon
                                    className={styles.iconUsers}
                                    icon={faUsers}
                                />
                                <span className={styles.cardDate}>
                                    12.07.21
                                </span>
                            </span>
                            <span className={styles.iconDetails}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            getNoFoundPresentationBlock()
        )

    return (
        <div className={styles.dashboardPage}>
            <SideBar />
            <div className={styles.pageContent}>
                <div className={styles.header}>
                    <div className={styles.searchBar}>
                        <FontAwesomeIcon
                            className={styles.searchIcon}
                            icon={faSearch}
                        />
                        <input
                            className={styles.searchInput}
                            type='search'
                            placeholder='Search...'
                            onChange={handleChange}
                        />
                    </div>
                    <UserProfile />
                </div>
                <div className={styles.content}>
                    <div className={styles.presentationsSection}>
                        <div className={styles.presentationHeader}>
                            <p>Your presentation</p>
                            <div className={styles.tableGridToggler}>
                                <div>
                                    <FontAwesomeIcon
                                        onClick={toggleGridView}
                                        icon={faList}
                                        className={
                                            currentView === 'grid'
                                                ? styles.viewBtnActive
                                                : styles.viewBtn
                                        }
                                    />
                                </div>
                                <div className={styles.verticalLine} />
                                <div>
                                    <FontAwesomeIcon
                                        onClick={toggleTableView}
                                        icon={faThLarge}
                                        className={
                                            currentView === 'table'
                                                ? styles.viewBtnActive
                                                : styles.viewBtn
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            {currentView === 'grid'
                                ? getTableView()
                                : getGridView()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
