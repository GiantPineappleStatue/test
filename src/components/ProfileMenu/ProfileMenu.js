/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Img from '../UI/Img/Img';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import P1 from '../UI/P1/P1';
import { logout } from '../../redux/reducers/auth.duck';
import { logoutFromServer } from '../../services/util';
import Span from '../UI/Span/Span';
import { profileReferral } from '../../redux/actions/profile';
import BotButton from '../UI/BotButton/BotButton';
const ProfileMenu = () => {
    const user = useSelector((state) => state.auth);
    const isMovie = useSelector((state) => state.filter.letsMakeMovie);
    const referralDialog = useSelector((state) => state.profile.referralDialog);

    const dispatch = useDispatch();
    if (!user.authToken) {
        let content = (
            <>
                <Link href="/signup">
                    <BotButton
                        buttonText={'sign up'}
                        styleclass={'btn-light'}
                        variant={'dark'}
                        icon={''}
                        hasIcon={false}
                        size={'md'}
                    />
                </Link>
                <Link href="/login">
                    <BotButton
                        buttonText={'login'}
                        styleclass={'btn-light'}
                        variant={'light'}
                        icon={''}
                        hasIcon={false}
                        size={'sm'}
                    />
                </Link>
            </>
        );
        if (isMovie) {
            content = (
                <div className="mt-4" onClick={() => Router.push('/login')}>
                    <a className="text-light login-button">Login</a>
                </div>
            );
        }
        return content;
    }

    return (
        <div className="d-flex align-items-center">
            <P1 className=" mb-0 d-none d-sm-block" style={{ color: '#8CDE0D' }}>
                {user.user.username}
            </P1>
            <div className="dropdown">
                <a
                    className="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {!user.user?.profile_photo ? (
                        <span className="p-2 px-3 mr-2 rounded text-uppercase text-white font-weight-bold profile-icon-bg">
                            {user.user && user.user.username.split('')[0]}
                        </span>
                    ) : (
                        <Img
                            className="avatar"
                            src={`https://artbot.mypinata.cloud/ipfs/${user.user.profile_photo}?img-width=100`}
                            alt="user_profile_pic"
                        />
                    )}
                </a>
                <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenuButton">
                    {!isMovie && (
                        <Link href={`/profile/${user.user._id}`}>
                            <a className="dropdown-item">Profile</a>
                        </Link>
                    )}
                    {isMovie && (
                        <div>
                            <Span
                                className="pointer"
                                onClick={() => dispatch(profileReferral(!referralDialog))}>
                                <a className="dropdown-item">Referrals</a>
                            </Span>
                            <Link href={`/backing`}>
                                <a className="dropdown-item">Backing Tier</a>
                            </Link>
                        </div>
                    )}
                    {user.user.isAdmin && (
                        <Link href="/admin">
                            <a className="dropdown-item">Admin Dashboard</a>
                        </Link>
                    )}
                    <div
                        className="pointer"
                        onClick={() => {
                            dispatch(logout());
                            logoutFromServer();
                            if (isMovie) Router.push('/letsmakeamovie');
                            else Router.push('/');
                        }}>
                        <a className="dropdown-item">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfileMenu;
