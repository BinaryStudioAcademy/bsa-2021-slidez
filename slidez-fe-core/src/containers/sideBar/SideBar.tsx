import React from 'react'
import SlidezLogo from '../../../src/logo_Slidez_1.svg'
import create_presentation from '../../assets/svgs/create_presentation.svg'
import my_presentation from '../../assets/svgs/my_presentation.svg'
import graph_icon from '../../assets/svgs/graph_icon.svg'
import layout_icon from '../../assets/svgs/layout_icon.svg'
import styles from './styles.module.scss'

const SideBar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <a href=''>
                    <img src={SlidezLogo} alt='Slidez Logo'></img>
                </a>
            </div>
            <div className={styles.navigation}>
                <span>
                    <a href=''>
                        <div className={styles.addIcon}>
                            <img
                                src={create_presentation}
                                alt='add presentation'
                            ></img>
                        </div>
                    </a>
                </span>
                <span>
                    <a href=''>
                        <div className={styles.bookIcon}>
                            <img
                                src={my_presentation}
                                alt='my presentations'
                            ></img>
                        </div>
                    </a>
                </span>
                <span>
                    <a href=''>
                        <img src={graph_icon} alt='graph'></img>
                    </a>
                </span>
                <span>
                    <a href=''>
                        <img src={layout_icon} alt='layout'></img>
                    </a>
                </span>
            </div>
        </div>
    )
}

export default SideBar
