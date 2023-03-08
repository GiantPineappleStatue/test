import React from 'react';

import SidebarContent from '../SidebarContent/SidebarContent';
import { GiSoundWaves } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';
import { FiPlayCircle } from 'react-icons/fi';
import { useMainContext } from '../Context';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarCollapseHandler } from '../../redux/reducers/auth.duck';
import router from 'next/router';
const ResponsiveSidebarNew = ({ open, changeHandler }) => {
    const dispatch = useDispatch();
    const [dropdown, setDropedown] = useState(false);
    const sidebarCollapse = useSelector((state) => state.auth.sidebarCollapse);

    // const { sidebar, showSidebar } = useMainContext();
    return (
        <div className={open ? 'sidebar display' : 'sidebar hidden'}>
            <div className="sidebar-header">
                {open && (
                    <img
                        src={'/img/artbot-logo.png'}
                        onClick={() => router.push('/')}
                        alt="artbot logo"
                        className="pointer"
                        style={{ width: '150px' }}
                    />
                )}
                <img
                    src={open ? '/img/left-arrow.svg' : '/img/right-arrow.svg'}
                    alt="arrow icon"
                    onClick={changeHandler}
                    style={{ margin: !open && '0 auto' }}
                />
            </div>
            <div className="sidebar-content-container">
                <SidebarContent
                    headerImg={<AiOutlineHome size={open ? 20 : 30} color={'#fff'} />}
                    firstImg={'/img/account.svg'}
                    secondImg={'/img/crowd.svg'}
                    first="About Us"
                    second="Crowdfunding"
                    header="Home"
                    headUrl="/"
                    firstUrl="/about-us"
                    secondUrl="/financials"
                    home
                />
                {/* 
                {!open && (
                    <div className="minisidebar-imgs">
                        <img
                            src={'/img/account.svg'}
                            alt="about icon"
                            onClick={() => router.push('/about-us')}
                        />
                        <img
                            src={'/img/crowd.svg'}
                            alt="financials"
                            onClick={() => router.push('/financials')}
                        />
                    </div>
                )} */}

                {open && <hr />}
                <SidebarContent
                    headerImg={<FiPlayCircle size={open ? 20 : 30} color={'#fff'} />}
                    header="Video"
                    firstImg={'/img/library.svg'}
                    secondImg={'/img/playlist.svg'}
                    first="Library"
                    second="Playlist"
                    headUrl="/video"
                    firstUrl="/video"
                    video
                />
                {/* {!open && (
                    <div className="minisidebar-imgs">
                        <img
                            src={'/img/library.svg'}
                            alt="library icon"
                            onClick={() => router.push('/video')}
                        />
                        <img src={'/img/playlist.svg'} alt="playlist icon" />
                    </div>
                )} */}
                {open && <hr />}
                <SidebarContent
                    headerImg={<GiSoundWaves size={open ? 20 : 30} color={'#fff'} />}
                    header="Audio"
                    firstImg={'/img/library.svg'}
                    secondImg={'/img/playlist.svg'}
                    first="Library"
                    second="Playlist"
                    audio
                    headUrl="/audio"
                    firstUrl="/audio"
                />
            </div>
        </div>
    );
};

export default ResponsiveSidebarNew;
