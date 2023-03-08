import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import Brand from '../Brand/Brand';
import HeaderSearchbar from '../HeaderSearchbar/HeaderSearchbar';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import SearchBar from '../SearchBar/SearchBar';
const Header = ({ changeHandler, sidebarCollapse }) => {
    const letsMakeaMovie = useSelector((state) => state.filter.letsMakeMovie);
    return (
        <nav id="navbar" className="navbar py-0 navbar-light fixed-top">
            <div className="container-fluid h-100 p-0">
                <div className="row w-100">
                    <div className="col-3 col-xl-2 brand-wrapper">
                        <div
                            className={`d-flex ${clsx({
                                'ml-5': sidebarCollapse
                            })} h-100 justify-content-center align-items-center`}>
                            <div className="d-none d-sm-block">
                                {' '}
                                <Brand />{' '}
                            </div>
                            <a
                                onClick={changeHandler}
                                className="brand-toggler pointer d-block d-md-none"
                                id="show-menu">
                                <i className="fas fa-bars"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-9 col-xl-10 my-auto">
                        <div className="row">
                            <div className="col-8 brand-wrapper my-auto">
                                <div className="d-block d-sm-none">
                                    {' '}
                                    <Brand />
                                </div>
                                <div className="d-none d-sm-block">
                                    {!letsMakeaMovie && <SearchBar />}
                                    {/* <HeaderSearchbar /> */}
                                </div>
                                {/* <input className="form-control d-none d-sm-block" /> */}
                            </div>
                            <div className="col-4 my-auto">
                                <div className="d-flex justify-content-end ml-2 ml-sm-0">
                                    <ProfileMenu />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default React.memo(Header);
