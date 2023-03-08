import React, { useState } from 'react';
import Sidebar from '../SidebarV2/SidebarV2';
import Header from '../HeaderV2/HeaderV2';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import SubHeader from '../SubHeader/SubHeader';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useRouter } from 'next/router';
import { subheaderStateChange } from '../../redux/actions/videoCategory';
NProgress.configure({ easing: 'ease', speed: 100 });
Router.events.on('routeChangeStart', () => {
    NProgress.start();
});
Router.on;
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
const LayoutV2 = ({ children, title, meta }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const subheaderShow = useSelector((state) => state.videoCategory.subHeaderVisible);
    const letsMakeaMovie = useSelector((state) => state.filter.letsMakeMovie);
    const toggleHandler = () => {
        setIsCollapsed(!isCollapsed);
    };
    React.useEffect(() => {
        switch (router.pathname) {
            case '/video':
            case '/audio':
            case '/video/upload':
            case '/audio/upload':
            case '/audio/tracks':
            case '/video/monetization':
            case '/audio/monetization':
            case '/playlist':
                dispatch(subheaderStateChange(true));
                break;
            default:
                dispatch(subheaderStateChange(false));
                break;
        }
    }, [router]);
    return (
        <>
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
            <div className={`dashboard-layout-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-wrapper">
                    <Sidebar onToggle={toggleHandler} isCollapsed={isCollapsed} />
                </div>
                <div className="right-area">
                    <Header onToggle={toggleHandler} isCollapsed={isCollapsed} />
                    {subheaderShow && (
                        <div className={`navbar navbar-expand navbar-light h-50 my-1 subheader `}>
                            {/* <p className="text-white">Rohail</p> */}
                            {!letsMakeaMovie && <SubHeader />}
                        </div>
                    )}
                    <main className="main-wrapper">{children}</main>
                </div>
            </div>
        </>
    );
};
LayoutV2.defaultProps = {
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

export default LayoutV2;
