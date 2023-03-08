import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    HomeIcon,
    LeftIcon,
    RightIcon,
    AboutIcon,
    Crowdfunding,
    Video,
    MediaIcon,
    PlayList,
    Audio
} from '../../../public/svg';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
const SidebarV2 = ({ onToggle, isCollapsed }) => {
    const router = useRouter();
    const token = useSelector((state) => state.auth.authToken);
    const [active, setactive] = useState(false);

    return (
        <div>
            <div className="sidebar-menu-wrapper">
                <div className="top-section">
                    <div className="logo pointer">
                        <Link href="/">
                            <img src={'/images/logo.png'} alt="logo" />
                        </Link>
                    </div>
                    <div className="collapsed-logo pointer">
                        <Link href="/">
                            <img src={'/images/logoicon.png'} alt="logo" />
                        </Link>
                    </div>
                    <div className="toggle-menu" onClick={onToggle}>
                        <a>{isCollapsed ? <RightIcon /> : <LeftIcon />}</a>
                    </div>
                    {/* <div className="sidebar-mobile-toggle">
                        <a onClick={onToggle}>{isCollapsed ? <LeftArrow /> : <LeftArrow />}</a>
                    </div> */}
                </div>
                <ul className="main-menu">
                    <ul className="sub-menu pl-0">
                        <li className="main-menu-item">
                            <Link href="/letsmakeamovie">
                                <a className="letsmakeamovie">
                                    <span>
                                        <MediaIcon />
                                    </span>
                                    <span className="m-0">Lets Make a Movie </span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                    <li className="main-menu-item">
                        <Link href="/">
                            <a className={`${clsx({ active: router.pathname === '/' })}`}>
                                <span>
                                    <HomeIcon />
                                </span>
                                <span className="m-0">Home</span>
                            </a>
                        </Link>
                        <ul className="sub-menu pl-0">
                            <li className="sub-menu-item">
                                <Link href="/about-us">
                                    <a
                                        className={`${clsx({
                                            active: router.pathname === '/about-us'
                                        })}`}>
                                        <span>
                                            <AboutIcon />
                                        </span>
                                        <span className="m-0">About Us</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="sub-menu-item">
                                <Link href="#">
                                    <a>
                                        <span>
                                            <Crowdfunding />
                                        </span>
                                        <span className="m-0">Crowdfunding </span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="main-menu-item">
                        <Link href="/video">
                            <a
                                className={`${clsx({
                                    'active video-icon': router.pathname === '/video'
                                })} video-link`}
                                onClick={() => setactive(true)}>
                                <span>
                                    <Video />
                                </span>
                                <span className="m-0 ">Video</span>
                            </a>
                        </Link>
                        <Link href="/audio">
                            <a
                                className={`${clsx({
                                    'active audio-icon': router.pathname === '/audio'
                                })} audio-link `}>
                                <span>
                                    <Audio />
                                </span>
                                <span className="m-0 ">Audio</span>
                            </a>
                        </Link>
                        <ul className="sub-menu pl-0">
                            {token && (
                                <li className="sub-menu-item">
                                    <Link href="/playlist">
                                        <a>
                                            <span>
                                                <PlayList />
                                            </span>
                                            <span className="m-0">Playlist </span>
                                        </a>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarV2;
