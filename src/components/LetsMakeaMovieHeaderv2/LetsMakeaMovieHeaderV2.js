import React from 'react';
import Brand from '../Brand/Brand';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { useSelector } from 'react-redux';
import ReactIcons from '../UI/ReactIcons/ReactIcons';
import P1 from '../UI/P1/P1';
import { useRouter } from 'next/router';

const LetsMakeaMovieHeaderV2 = () => {
    const router = useRouter();
    const user = useSelector((state) => state.auth.authToken);

    return (
        <div className="d-flex lets-make-movie-header-v2 justify-content-between px-4 align-items-center mb-3">
            <div>
                <P1 className="mb-0 lets-make-movie-header-v2-toggle-btn">
                    <ReactIcons.FiMenu size={25} />
                </P1>
            </div>
            <div className="ml-md-5">
                <Brand movie={'/letsmakeamoviev2'} />
            </div>
            <div className="d-flex lets-make-movie-header-v2-auth-btn justify-content-between align-items-center">
                {!user ? (
                    <React.Fragment>
                        <P1 className="mb-0 pointer" onClick={() => router.push('/signup')}>
                            <a className={` `}>Sign Up</a>
                        </P1>
                        <P1 className="mb-0 pointer" onClick={() => router.push('/login')}>
                            <a className={` `}>Log In</a>
                        </P1>
                    </React.Fragment>
                ) : (
                    <ProfileMenu movie={false} />
                )}
            </div>
        </div>
    );
};

export default LetsMakeaMovieHeaderV2;
