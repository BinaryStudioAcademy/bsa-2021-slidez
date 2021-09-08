import React, { useState } from 'react'
import SlidezLogo from '../../../src/logo_Slidez_1.svg'
import { ReactComponent as CreatePresentation } from '../../assets/svgs/create_presentation.svg'
import { ReactComponent as MyPresentation } from '../../assets/svgs/my_presentation.svg'
import { ReactComponent as GraphIcon } from '../../assets/svgs/graph_icon.svg'
import { ReactComponent as LayoutIcon } from '../../assets/svgs/layout_icon.svg'
import soon_lable from '../../assets/svgs/soon_lable.svg'
import soon from '../../assets/svgs/soon.svg'
import styles from './styles.module.scss'
import add_icon from '../../assets/svgs/add_icon.svg'

const SideBar = () => {
    const [selectedIcon, setSelectedIcon] = useState(false)

    const handleClick = () => {
        setSelectedIcon(!selectedIcon)
    }
    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <img src={SlidezLogo} alt='Slidez Logo' />
            </div>
            <div className={styles.navigation}>
                <span>
                    <div className={styles.addIcon}>
                        <CreatePresentation />
                        <img className={styles.label} src={soon_lable} />
                        <img className={styles.label} src={soon} />
                        <span className={styles.tooltiptext}>
                            Create presentation
                        </span>
                    </div>
                </span>
                <span>
                    <div className={styles.sideIcon}>
                        <MyPresentation
                            className={selectedIcon ? styles.selectedIcon : ''}
                            onClick={handleClick}
                        />
                        <span className={styles.tooltiptext}>
                            My presentation
                        </span>
                    </div>
                </span>
                <span>
                    <div className={styles.disableIcons}>
                        <GraphIcon />
                        <img className={styles.label} src={soon_lable} />
                        <img className={styles.label} src={soon} />
                        <span className={styles.tooltiptext}>Analytics</span>
                    </div>
                </span>
                <span>
                    <div className={styles.disableIcons}>
                        <LayoutIcon />
                        <img className={styles.label} src={soon_lable} />
                        <img className={styles.label} src={soon} />
                        <span className={styles.tooltiptext}>Templates</span>
                    </div>
                </span>
            </div>
        </div>
    )
}

export default SideBar
