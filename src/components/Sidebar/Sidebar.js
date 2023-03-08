import React from 'react';
import Link from 'next/link';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import SidebarCollapseMenu from '../SidebarCollapseMenu/SidebarCollapseMenu';
import clsx from 'clsx';
const Sidebar = ({sidebarCollapse,sidebarHandler}) => {
    return (
        <nav id="sidebar" className={`sidebar d-none d-sm-block `}>
            <ul className="nav-menu-items">
                <div className={`brand-wrapper d-flex justify-content-center align-items-center ${clsx({'pl-4':!sidebarCollapse})}`}>
                    {!sidebarCollapse && <Link href="/">
                        <a>
                            <img src="/img/artbot-logo.png" className="brand" />
                        </a>
                    </Link>}
                {
                    sidebarCollapse?
                    <i onClick={sidebarHandler} className={`fas ${clsx({'ml-auto mr-1':!sidebarCollapse,'p-3 my-2':sidebarCollapse})} pointer p-1 fa-chevron-double-right`}></i>
                    :
                    <i onClick={sidebarHandler} className={`fas ${clsx({'ml-auto mr-1':!sidebarCollapse,'p-3':sidebarCollapse})} pointer p-1 fa-chevron-double-left`}></i>

                }
                </div>
                {
                    sidebarCollapse?<SidebarCollapseMenu  />:<SidebarMenu />
                }
            </ul>
        </nav>
    );
};

export default Sidebar;
