import React from 'react';
import Img from '../UI/Img/Img';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Icons from '../UI/ReactIcons/ReactIcons';
import { connect } from 'react-redux';

// Profile Audio and Image Card Card Component
const ProfileAudioAndImageCard = ({
    video,
    type,
    className,
    currrentUser,
    profileUser,
    featuredHandler
}) => {
    const history = useRouter();
    let url = '';
    if (type === 'audio' || type === 'profileAudio') url = `/audio/album/${video._id}`;
    if (type === 'image' || type === 'profileImage') url = `/image/album/${video._id}`;
    return (
        <div className={`video-card ${className} profile-audio-card`}>
            {currrentUser &&
                profileUser &&
                currrentUser._id === profileUser._id &&
                (type === 'profileImage' || type === 'profileAudio') && (
                    <span
                        onClick={() => featuredHandler(video._id)}
                        className={`video-card__checkmark  pointer ${clsx({
                            'bg-color-green':
                                profileUser.featured_2d3d.find((i) => i === video._id) &&
                                type === 'profileImage',
                            'bg-color-purple':
                                profileUser.featured_audio.find((i) => i === video._id) &&
                                type === 'profileAudio'
                        })}`}>
                        <Icons.GoCheck fontSize={30} className="p-2 text-white" />
                    </span>
                )}
            {currrentUser &&
                profileUser &&
                currrentUser._id === profileUser._id &&
                (type === 'profileImage' || type === 'profileAudio') && (
                    <span
                        onClick={() => {
                            if (type === 'profileAudio') history.push(`/audio/edit/${video._id}`);
                            if (type === 'profileImage') history.push(`/image/edit/${video._id}`);
                        }}
                        className={`video-card__edit  pointer `}>
                        <Icons.FaEdit fontSize={30} className="p-2 text-white" />
                    </span>
                )}
            <div className="pointer" onClick={() => history.push(url)}>
                <Img
                    className="video-card__thumbnail  d-block postition-relative"
                    src={'https://artbot.mypinata.cloud/ipfs/' + video.thumbnailHash+'?img-width=200'}
                    alt="image"
                />
                <span
                    className={`video-card__rating ${clsx({
                        'color-purple-light': type === 'audio' || type === 'profileAudio',
                        'color-green': type === 'image' || type === 'profileImage'
                    })}`}
                    style={{ color: '#1BA6FF' }}>
                    <i className="fa fa-star" /> &nbsp;
                    {video.rating ? video.rating.toFixed(1) : '0.0'}&nbsp;{' '}
                    {video.rating !== 0 ? `(${video.ratingCount})` : ''}
                </span>
                {/* {video.maturityContent ? <div class="mat">Mature</div> : ''} */}
                <div className="video-card-title__rows px-1">
                    <div className="d-flex justify-content-between text-white">
                        <div className="video-card-title__rows-left  text-truncate">
                            {video.title.substring(0, 25)} &nbsp;
                        </div>
                        {/* <div className="video-card-title__rows-right ">{video.duration}</div> */}
                    </div>
                    <div className="d-flex justify-content-between ">
                        <div
                            className={`video-card__min float-left ${clsx({
                                'color-purple': type === 'audio' || type === 'profileAudio',
                                'color-green': type === 'image' || type === 'profileImage'
                            })}  `}>
                            {video.username ? video.username : video.user.username}
                        </div>
                        <div
                            className="video-card-title__right text-white text-capitalize "
                            style={{ overflow: 'hidden' }}>
                            {video.duration}
                            {/* {video.genre && video.genre.split(',')[0]} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    currrentUser: state.auth.user,
    profileUser: state.profile.profileUser.user
});
export default connect(mapStateToProps)(ProfileAudioAndImageCard);
