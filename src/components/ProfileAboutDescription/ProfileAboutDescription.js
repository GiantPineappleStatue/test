import React from 'react';
import P1 from '../UI/P1/P1';
import Icons from '../UI/ReactIcons/ReactIcons';
import Img from '../UI/Img/Img';
function ProfileAboutDescription({ editHandler, edit, user, update }) {
    return (
        <React.Fragment>
            <P1 className="text-white h6 mb-3">
                Default tab{' '}
                {update && (
                    <Icons.FaEdit
                        fontSize="medium"
                        className="pointer"
                        onClick={() => editHandler(!edit)}
                    />
                )}
            </P1>
            <P1 className="profile-sub-navigation__item-active py-4 color-blue px-3 mb-4 ">
                {user.default_tab && user.default_tab}
            </P1>
            <P1 className="text-white h6 mb-3">
                Channel Name{' '}
                {update && (
                    <Icons.FaEdit
                        fontSize="medium"
                        className="pointer"
                        onClick={() => editHandler(!edit)}
                    />
                )}
            </P1>
            <P1 className=" py-4 text-white  profile-sub-navigation__item-active px-3 mb-4 ">
                {user.profile_name ? user.profile_name : user.username}
            </P1>
            <P1 className="text-white h6 mb-3">
                Description{' '}
                {update && (
                    <Icons.FaEdit
                        fontSize="medium"
                        className="pointer"
                        onClick={() => editHandler(!edit)}
                    />
                )}
            </P1>
            <P1 className=" py-4 text-white px-3 mb-4 profile-sub-navigation__desc profile-sub-navigation__item-active ">
                {user.description && user.description}
            </P1>
            <P1 className="text-white h6 mb-3">
                Social Media Links{' '}
                {update && (
                    <Icons.FaEdit
                        fontSize="medium"
                        className="pointer"
                        onClick={() => editHandler(!edit)}
                    />
                )}
            </P1>
            <P1 className=" py-4 text-uppercase profile-sub-navigation__item-active text-white px-3 mb-4 ">
                <a href={`${user.twitter && user.twitter}`}>
                    <Img src={'/img/twitter.png'} width="20" height="20" /> Twitter{' '}
                </a>
                <a className="mx-2" href={`${user.facebook && user.facebook}`}>
                    <Img src={'/img/facebook.png'} width="20" height="20" /> FaceBook{' '}
                </a>
                <a href={`${user.instagram && user.instagram}`}>
                    <Img src={'/img/instagram.png'} width="20" height="20" /> Instagram{' '}
                </a>
            </P1>
        </React.Fragment>
    );
}

export default ProfileAboutDescription;
