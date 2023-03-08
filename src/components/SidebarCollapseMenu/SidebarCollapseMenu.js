import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const SidebarMenu = () => {
    const router = useRouter();
    const user = useSelector((state) => state.auth.user);
    const [activeTab, setActiveTab] = React.useState('');
    const chnageActiveTab = (active) => {
        // setActiveTab(active);
    };

    React.useEffect(() => {
        switch (router.pathname) {
            case '/':
            case '/about-us':
            case '/financials':
                setActiveTab('1');
                break;
            case '/video':
            case '/videoFunding':
            case '/videoPlaylist':
                setActiveTab('2');
                break;
            case '/audio':
            case '/audioFunding':
            case '/audioPlaylist':
                setActiveTab('3');
                break;
            case '/history':
                setActiveTab('4');
                break;
            case '/playlist':
                setActiveTab('5');
                break;
            default:
                break;
        }
    }, []);
    return (
        <ul className="nav ">
            <li className={`nav-item nav-dropdown ${clsx({ open: activeTab === '1' })}`}>
                <Link href="/">
                    <a
                        className="nav-link nav-dropdown-toggle"
                        onClick={() => chnageActiveTab('1')}>
                        <i className="fas fa-home fa-icon"></i>
                    </a>
                </Link>
                {/* <ul className="nav-dropdown-items">
                    <li className="nav-item">
                        <Link href="/about-us">
                            <a
                                className={`nav-link ${clsx({
                                    'active-sub-menu': router.pathname === '/about-us'
                                })}`}>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/financials">
                            <a
                                className={`nav-link ${clsx({
                                    'active-sub-menu': router.pathname === '/financials'
                                })}`}>
                            </a>
                        </Link>
                    </li>
                </ul> */}
            </li>
            <li
                className={`nav-item nav-dropdown ${clsx({
                    open: activeTab === '2'
                })}`}>
                <Link href="/video">
                    <a
                        className="nav-link nav-dropdown-toggle"
                        onClick={() => chnageActiveTab('2')}>
                        <i className="fas fa-play-circle fa-icon"></i>
                    </a>
                </Link>
                {/* <ul className="nav-dropdown-items">
                    <li className="nav-item">
                        <a
                            onClick={() => {
                                chnageActiveTab('2');
                                router.push('/video');
                            }}
                            className={`nav-link ${clsx({
                                'active-sub-menu': router.pathname === '/video'
                            })}`}>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            onClick={() => {
                                chnageActiveTab('2');
                                router.push('/videoFunding');
                            }}
                            className={`nav-link ${clsx({
                                'active-sub-menu': router.pathname === '/videoFunding'
                            })}`}>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            onClick={() => {
                                chnageActiveTab('2');
                                router.push('/videoPlaylist');
                            }}
                            className={`nav-link ${clsx({
                                'active-sub-menu': router.pathname === '/videoPlaylist'
                            })}`}>
                        </a>
                    </li>
                </ul> */}
            </li>
            <li
                onClick={() => chnageActiveTab('3')}
                className={`nav-item nav-dropdown ${clsx({
                    open: activeTab === '3'
                })}`}>
                <Link href="/audio">
                    <a className="nav-link nav-dropdown-toggle">
                        <i className="fas fa-music fa-icon"></i> 
                    </a>
                </Link>
                {/* <ul className="nav-dropdown-items">
                    <li className="nav-item">
                        <a
                            onClick={() => {
                                chnageActiveTab('3');
                                router.push('/audio');
                            }}
                            className={`nav-link ${clsx({
                                'active-sub-menu': router.pathname === '/audio'
                            })}`}>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            onClick={() => {
                                chnageActiveTab('3');
                                router.push('/audioFunding');
                            }}
                            className={`nav-link ${clsx({
                                'active-sub-menu': router.pathname === '/audioFunding'
                            })}`}>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            onClick={() => {
                                chnageActiveTab('3');
                                router.push('/audioPlaylist');
                            }}
                            className={`nav-link ${clsx({
                                'active-sub-menu': router.pathname === '/audioPlaylist'
                            })}`}>
                        </a>
                    </li>
                </ul> */}
            </li>
            {user?._id && (
                <div>
                    <hr className="nav-line w-100" />
                    <li
                        onClick={() => chnageActiveTab('4')}
                        className={`nav-item nav-dropdown ${clsx({
                            open: activeTab === '4'
                        })}`}>
                        <Link href="/history">
                            <a className="nav-link nav-dropdown-toggle">
                                <i className="fas fa-history fa-icon"></i>
                            </a>
                        </Link>
                    </li>
                    <li
                        onClick={() => chnageActiveTab('5')}
                        className={`nav-item nav-dropdown ${clsx({
                            open: activeTab === '5'
                        })}`}>
                        <Link href="/playlist">
                            <a className="nav-link nav-dropdown-toggle">
                                <i className="fas fa-list fa-icon"></i>
                            </a>
                        </Link>
                    </li>
                </div>
            )}
        </ul>
    );
};

export default React.memo(SidebarMenu);
