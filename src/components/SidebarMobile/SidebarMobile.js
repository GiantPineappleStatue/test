import React from 'react';
import { useRouter } from 'next/router';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
const SidebarMobile = ({ open, changeHandler }) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState('1');
    const chnageActiveTab = (active) => {
        setActiveTab(active);
    };
    React.useEffect(() => {
        switch (router.pathname) {
            case '/':
            case '/about-us':
            case '/financials':
                setActiveTab('1');
                break;
            case '/video':
                setActiveTab('2');
                break;
            case '/audio':
                setActiveTab('3');
                break;
            default:
                break;
        }
    }, [router]);
    return (
        <nav id="nav-menu" className={open ? 'active' : ''}>
            <ul className="nav-menu-items">
                <div className="brand-wrapper px-4">
                    <a href="/">
                        <img src="/img/artbot-logo.png" className="brand" />
                    </a>{' '}
                    <span
                        onClick={changeHandler}
                        className="brand-toggler pointer ml-3"
                        id="show-menu">

                        <i className="far fa-chevron-double-left"></i>
                        {/* <i className="fas fa-bars"></i> */}
                    </span>
                </div>
                <SidebarMenu />
            </ul>
        </nav>
    );
};

export default SidebarMobile;
