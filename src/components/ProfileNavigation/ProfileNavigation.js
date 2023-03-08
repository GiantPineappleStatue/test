import clsx from 'clsx';
import React from 'react';
import { useRouter } from 'next/router';
import P1 from '../UI/P1/P1';
import Icons from '../UI/ReactIcons/ReactIcons';
// eslint-disable-next-line react/display-name
const ProfileNavigation = React.memo(({ changehandler, active, activeUser, playlistHandler }) => {
    const history = useRouter();
    return (
        <div className="profile-navigation mt-3 d-flex flex-wrap align-content-center justify-content-between flex-wrap mb-4">
            <div className="d-flex flex-wrap align-items-center">
                <P1
                    onClick={() => changehandler('video')}
                    className={clsx({ 'rounded sub-menu-bg color-blue': active === 'video' })}>
                    Video
                </P1>
                <P1
                    onClick={() => changehandler('audio')}
                    className={clsx({ 'rounded sub-menu-bg color-purple': active === 'audio' })}>
                    Audio
                </P1>
                <P1
                    onClick={() => changehandler('about')}
                    className={clsx({ 'rounded sub-menu-bg color-blue': active === 'about' })}>
                    About
                </P1>
                {activeUser && (
                    <React.Fragment>
                        {' '}
                        <P1
                            onClick={() => changehandler('monetization')}
                            className={clsx({
                                'rounded sub-menu-bg color-blue': active === 'monetization'
                            })}>
                            Monetization
                        </P1>
                        <P1
                            onClick={() => changehandler('history')}
                            className={clsx({
                                'rounded sub-menu-bg color-blue': active === 'history'
                            })}>
                            Transaction History
                        </P1>
                        <P1
                            onClick={() => changehandler('wallet')}
                            className={clsx({
                                'rounded sub-menu-bg color-blue': active === 'wallet'
                            })}>
                            Wallet
                        </P1>
                        <P1
                            onClick={() => changehandler('subscriptions')}
                            className={clsx({
                                'rounded sub-menu-bg color-blue': active === 'subscriptions'
                            })}>
                            Subscriptions
                        </P1>
                    </React.Fragment>
                )}
            </div>
            {activeUser && (
                <div
                    className="pointer sub-menu-bg rounded subheader-icon py-1 ml-auto"
                    onClick={playlistHandler}>
                    <Icons.MdPlaylistAdd color={'#B3ACCF'} size={19} /> New Playlist{' '}
                </div>
            )}
            {activeUser && (active === 'video' || active === 'audio') && (
                <div
                    className="pointer sub-menu-bg rounded subheader-icon py-1 mx-2"
                    onClick={() => {
                        if (active === 'video') history.push('/video/upload');
                        if (active === 'audio') history.push('/audio/upload');
                    }}>
                    <Icons.FiUpload color={'#B3ACCF'} size={19} />
                </div>
            )}
        </div>
    );
});

export default ProfileNavigation;
