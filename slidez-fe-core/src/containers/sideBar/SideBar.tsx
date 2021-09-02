import React from 'react'
import SlidezLogo from '../../../src/logo_Slidez_1.svg'
import create_presentation from '../../assets/svgs/create_presentation.svg'
import my_presentation from '../../assets/svgs/my_presentation.svg'
import graph_icon from '../../assets/svgs/graph_icon.svg'
import layout_icon from '../../assets/svgs/layout_icon.svg'
import soon_lable from '../../assets/svgs/soon_lable.svg'
import soon from '../../assets/svgs/soon.svg'
import styles from './styles.module.scss'

const SideBar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <a href=''>
                    <img src={SlidezLogo} alt='Slidez Logo' />
                </a>
            </div>
            <div className={styles.navigation}>
                <span>
                    <a href=''>
                        <div className={styles.addIcon}>
                            <img
                                src={create_presentation}
                                alt='add presentation'
                            />
                        </div>
                    </a>
                </span>
                <span>
                    <a href=''>
                        <div className={styles.sideIcon}>
                            <img
                                src={my_presentation}
                                alt='my presentations'
                            ></img>
                        </div>
                    </a>
                </span>
                <span>
                    <a href=''>
                        <div className={styles.sideIcon}>
                            <img src={graph_icon} alt='graph' />
                            <img className={styles.label} src={soon_lable} />
                            <img className={styles.label} src={soon} />
                        </div>
                    </a>
                </span>
                <span>
                    <a href=''>
                        <div className={styles.sideIcon}>
                            <img src={layout_icon} alt='layout' />
                            <img className={styles.label} src={soon_lable} />
                            <img className={styles.label} src={soon} />
                        </div>
                    </a>
                </span>
            </div>
        </div>
    )
}

export default SideBar
