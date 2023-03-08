import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import Head from 'next/head';
import SubHeader from '../SubHeader/SubHeader';
import Footer from '../Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { sidebarCollapseHandler } from '../../redux/reducers/auth.duck';
import WelcomeAlert from '../WelcomeAlert/WelcomeAlert';
import SidebarNew from '../SidebarNew/SidebarNew';
import ResponsiveSidebarNew from '../ResponsiveSidebarNew/ResponsiveSidebarNew';
import SidebarV2 from '../SidebarV2/SidebarV2';
NProgress.configure({ easing: 'ease', speed: 100 });
Router.events.on('routeChangeStart', () => {
    NProgress.start();
});
Router.on;
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Layout = ({ children, title, meta }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [openSidedrawer, setopenSidedrawer] = useState(false);
    const subheaderShow = useSelector((state) => state.videoCategory.subHeaderVisible);
    const sidebarCollapse = useSelector((state) => state.auth.sidebarCollapse);
    const letsMakeaMovie = useSelector((state) => state.filter.letsMakeMovie);
    const token = useSelector((state) => state.auth.authToken);

    const getSessionWelcomeValue = () => {
        if (token) {
            return false;
        } else if (router.pathname === '/') {
            if (typeof window !== 'undefined') {
                const alert = sessionStorage.getItem('showWelcomeAlert');
                if (JSON.parse(alert) === false) {
                    return false;
                } else return true;
            } else return false;
        } else {
            return false;
        }
    };
    const [showWelcomeAlert, setShowWelcomeAlert] = useState(getSessionWelcomeValue());

    const handleChangeWelcomeAlert = (checked) => {
        setShowWelcomeAlert(checked);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('showWelcomeAlert', false);
        }
    };
    const updateScreen = () => {
        const width = window.innerWidth;
        if (width >= 1200 && width <= 1450) {
            dispatch(sidebarCollapseHandler(true));
        }
    };
    React.useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', updateScreen);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', updateScreen);
            }
        };
    }, []);
    return (
        <React.Fragment>
            <Head>
                {' '}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="max-image-preview:large" />
                <meta name="robots" content="index, follow" />
                <meta
                    name="googlebot"
                    content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
                />
                <meta
                    name="bingbot"
                    content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
                />
                {meta.map((item, i) => (
                    <meta key={i} property={item.name} content={item.content} />
                ))}
                <meta property="og:type" content="Arts and Entertainment" />
                <meta property="og:url" content="https://artbot.tv" />
                <meta name="twitter:card" content="summary" />
                <meta property="twitter:url" content="https://artbot.tv" />
                <meta name="twitter:creator" content="@ArtBotTV" />
                <meta name="twitter:site" content="Arts and Entertainment" />
                <title>{title}</title>
            </Head>
            <div className="app">
                <header className="app-header">
                    <Header
                        sidebarCollapse={sidebarCollapse}
                        changeHandler={() => setopenSidedrawer(!openSidedrawer)}
                    />
                </header>
                {/* <SidebarMobile
                    open={openSidedrawer}
                    changeHandler={() => setopenSidedrawer(false)}
                /> */}
                {/* {!letsMakeaMovie && (
                    <ResponsiveSidebarNew
                        open={openSidedrawer}
                        changeHandler={() => setopenSidedrawer(false)}
                    />
                )} */}

                <div className="app-body">
                    {!letsMakeaMovie && (
                        <div
                            className={`app-sidebar ${clsx({
                                'collapse-by': !sidebarCollapse
                            })} `}>
                            {/* {!letsMakeaMovie && <SidebarNew />} */}
                            {!letsMakeaMovie && (
                                <SidebarV2
                                    onToggle={() => setopenSidedrawer(!openSidedrawer)}
                                    isCollapsed={openSidedrawer}
                                />
                            )}
                            {/* <Sidebar sidebarCollapse={sidebarCollapse} sidebarHandler={()=>{
                           dispatch(sidebarCollapseHandler(!sidebarCollapse));
                        }} /> */}
                        </div>
                    )}
                    <main
                        className={`app-main ${clsx({
                            'collapse-by': !sidebarCollapse,
                            'ml-0 ml-0-0': letsMakeaMovie
                        })}`}>
                        {router.pathname === '/' && showWelcomeAlert && (
                            <WelcomeAlert
                                show={showWelcomeAlert}
                                setShow={handleChangeWelcomeAlert}
                            />
                        )}
                        {subheaderShow && (
                            <div
                                className={`app-main-subheader mb-2 ${clsx({
                                    'collapse-by': !sidebarCollapse,
                                    'left-0': letsMakeaMovie
                                })} `}>
                                {/* <p className="text-white">Rohail</p> */}
                                {!letsMakeaMovie && <SubHeader />}
                            </div>
                        )}
                        <div
                            className={`app-main-content ${clsx({
                                'app-main-content-margin': subheaderShow,
                                'blur-effect': router.pathname === '/' && showWelcomeAlert,
                                'ml-0': letsMakeaMovie
                            })}`}>
                            {children}
                        </div>
                    </main>
                </div>
                <footer
                    className={`app-footer ${clsx({
                        'collapse-by': !sidebarCollapse,
                        'ml-0': letsMakeaMovie
                    })}`}>
                    <Footer />
                </footer>
            </div>
        </React.Fragment>
    );
};

Layout.defaultProps = {
    title: 'ArtBot',
    meta: [
        {
            name: 'og:title',
            content: 'Artbot'
        },
        {
            name: 'og:description',
            content:
                'ArtBot.tv is a revolutionary video and audio marketplace with royalty crowdfunding backed by NFTs.  Our mission is to give creators a better home, and empower anyone to invest in their favorite creators or content ideas.'
        },
        {
            name: 'og:image',
            content:
                'https://artbot.mypinata.cloud/ipfs/QmXAJJTTas6YAtEP7n46dzFhyc7Y7pM49PzSTCEtb3pSNq?img-width=400'
        },
        {
            name: 'twitter:title',
            content: 'Artbot'
        },
        {
            name: 'twitter:description',
            content:
                'ArtBot.tv is a revolutionary video and audio marketplace with royalty crowdfunding backed by NFTs.  Our mission is to give creators a better home, and empower anyone to invest in their favorite creators or content ideas.'
        },
        {
            name: 'twitter:image',
            content:
                'https://artbot.mypinata.cloud/ipfs/QmXAJJTTas6YAtEP7n46dzFhyc7Y7pM49PzSTCEtb3pSNq?img-width=400'
        }
    ]
};

export default Layout;
