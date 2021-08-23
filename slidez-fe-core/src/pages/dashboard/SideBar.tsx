import React from 'react'
import SlidezLogo from '../../../src/logo_Slidez_1.svg'
import create_presentation from '../../assets/svgs/create_presentation.svg'
import my_presentation from '../../assets/svgs/my_presentation.svg'
import graph_icon from '../../assets/svgs/graph_icon.svg'
import layout_icon from '../../assets/svgs/layout_icon.svg'

const SideBar = () => {
    return (
        <div className='sidebar'>
            <div className='logo'>
                <a href=''>
                    <img src={SlidezLogo} alt='Slidez Logo'></img>
                </a>
            </div>
            <div className='navigation'>
                <span>
                    <a href=''>
                        <div className='icon-add'>
                            <img
                                src={create_presentation}
                                alt='add presentation'
                            ></img>
                        </div>
                    </a>
                </span>
                <span>
                    <a href=''>
                        <div className='icon-book'>
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
