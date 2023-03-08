import React from 'react';
import P1 from '../UI/P1/P1';
import clsx from 'clsx';
function ProfileSubNavigation() {
    const [category, setCategory] = React.useState('trending');
    return (
        <div className="d-flex profile-sub-navigation ">
            <P1
                onClick={() => setCategory('trending')}
                className={`profile-sub-navigation__item ${clsx({
                    'profile-sub-navigation__item-active': category === 'trending'
                })}  px-3 py-2 mr-3`}
                style={{
                    fontWeight: '400',
                    fontSize: '14px',
                    textTransform: 'initial'
                }}>
                Trending
            </P1>
            <P1
                onClick={() => setCategory('newest')}
                className={`profile-sub-navigation__item ${clsx({
                    'profile-sub-navigation__item-active': category === 'newest'
                })}  px-3 py-2 mr-3`}
                style={{
                    fontWeight: '400',
                    fontSize: '14px',
                    textTransform: 'initial'
                }}>
                Newest
            </P1>
            <P1
                onClick={() => setCategory('most_liked')}
                className={`profile-sub-navigation__item ${clsx({
                    'profile-sub-navigation__item-active': category === 'most_liked'
                })}  px-3 py-2`}
                style={{
                    fontWeight: '400',
                    fontSize: '14px',
                    textTransform: 'initial'
                }}>
                Most Liked
            </P1>
        </div>
    );
}

export default ProfileSubNavigation;
