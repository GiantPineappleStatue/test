import React from 'react';
import Img from '../UI/Img/Img';
import Link from 'next/link';
import Icons from '../UI/ReactIcons/ReactIcons';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

// Video Card Component
const ProjectCard = ({ video, type, className, currrentUser, profileUser, featuredHandler }) => {
    const history = useRouter();
    let url = `/videoFunding/${video._id}`;
    if (type === 'audio') {
        url = `/audioFunding/${video._id}`;
    }
    return (
        <div className={`video-card  ${className}`}>
            {currrentUser &&
                profileUser &&
                currrentUser._id === profileUser._id &&
                type === 'profileVideo' && (
                    <span
                        onClick={() => featuredHandler(video._id)}
                        className={`video-card__checkmark pointer ${clsx({
                            'bg-color-blue': profileUser.featured_video.find((i) => i === video._id)
                        })}`}>
                        <Icons.GoCheck fontSize={30} className="p-2 text-white" />
                    </span>
                )}
            {currrentUser &&
                profileUser &&
                currrentUser._id === profileUser._id &&
                type === 'profileVideo' && (
                    <span
                        onClick={() => history.push(`/video/edit/${video._id}`)}
                        className={`video-card__edit pointer `}>
                        <Icons.FaEdit fontSize={30} className="p-2 bg-secondary" />
                    </span>
                )}
            {currrentUser &&
                profileUser &&
                currrentUser._id === profileUser._id &&
                type === 'profileVideo' && (
                    <span
                        onClick={() => playlistPopupHandler(video._id)}
                        className={`video-card__add-playlist pointer `}>
                        <Icons.MdPlaylistAdd fontSize={30} className="p-1 bg-secondary" />
                    </span>
                )}
            <div className="pointer" onClick={() => history.push(url)}>
                <Img
                    className="video-card__thumbnail  d-block postition-relative"
                    src={'https://artbot.mypinata.cloud/ipfs/' + video.imageHash+'?img-width=300'}
                    alt="image"
                />

                {/* <span className="video-card__rating" style={{ color: '#1BA6FF' }}>
                    <i style={{ color: '#1BA6FF' }} className="fa fa-star" /> &nbsp;
                    0:0
                </span> */}
                {/* {video.maturityContent ? <div class="mat">Mature</div> : ''} */}
            </div>
            <div className="video-card-title__rows px-1">
                <div className="d-flex justify-content-between text-white">
                    <div className="video-card-title__rows-left  text-truncate">
                        {video.title.length > 32
                            ? video.title.substring(0, 32) + '...'
                            : video.title}{' '}
                        &nbsp;
                    </div>
                    {/* <div className="video-card-title__rows-right ">{video.duration}</div> */}
                </div>

                <div className="d-flex justify-content-between ">
                    <Link href={`/profile/${video.userId._id}`} className="pointer">
                        <div className="video-card__min float-left" style={{ color: '#1BA6FF' }}>
                            {video.userId.username ? video.userId.username : 'ArtBot User'}
                        </div>
                    </Link>
                    {/* <div
                        className="video-card-title__right text-white text-capitalize "
                        style={{ overflow: 'hidden' }}>
                        0:00
                    </div> */}
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    currrentUser: state.auth.user,
    profileUser: state.profile.profileUser.user
});
export default connect(mapStateToProps)(ProjectCard);
