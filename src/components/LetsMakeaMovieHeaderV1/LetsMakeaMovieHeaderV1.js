import React from 'react';
import Brand from '../Brand/Brand';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import Link from 'next/link';
import P1 from '../UI/P1/P1';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

const LetsMakeaMovieHeaderV1 = () => {
    const user = useSelector((state) => state.auth.authToken);

    return (
        <div className="d-flex justify-content-between px-1">
            <Brand movie={'/letsmakeamovie'} />
            <div className="d-flex justify-content-between align-items-center">
                <Link href="/">
                    <P1
                        className={`mb-0 pointer mr-3 text-light profile-icon-bg p-3 marketplace ${clsx(
                            { 'mt-4': !user }
                        )}`}>
                        Demo Marketplace (WIP)
                    </P1>
                </Link>
                <ProfileMenu movie={true} />
            </div>
        </div>
    );
};

export default LetsMakeaMovieHeaderV1;
