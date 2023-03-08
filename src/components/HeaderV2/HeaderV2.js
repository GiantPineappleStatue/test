import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';
import SearchBarV2 from '../SearchBarV2/SearchBarV2';
import Image from 'next/image';
import { LeftArrow } from '../../../public/svg';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
// import { ProfilrDropDown } from '../ProfileDropdown/ProfilrDropDown';

const HeaderV2 = ({ onToggle, isCollapsed }) => {
    return (
        <div>
            <Navbar className="header-nav">
                <Container fluid>
                    <Navbar.Brand>
                        <div className="toplogo">
                            <Link href="/" className="pointer">
                                <Image
                                    src={'/images/logo.png'}
                                    width="150"
                                    height="60"
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className="Mobile-toggle">
                            <a onClick={onToggle}>{isCollapsed ? <LeftArrow /> : <LeftArrow />}</a>
                        </div>
                        <div className="header-search">
                            <SearchBarV2 />{' '}
                        </div>
                        <div className="mobile-logo">
                            <Image
                                src={'/images/logoicon.png'}
                                width="100"
                                height="50"
                                alt="logo"
                            />
                        </div>
                    </Navbar.Brand>
                    <Nav>
                        <ProfileMenu />
                        {/* <ProfilrDropDown /> */}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default HeaderV2;
