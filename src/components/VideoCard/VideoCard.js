import React from 'react';
import Img from '../UI/Img/Img';
import Link from 'next/link';
import Icons from '../UI/ReactIcons/ReactIcons';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

// Video Card Component
const VideoCard = ({
    video,
    type,
    className,
    currrentUser,
    profileUser,
    featuredHandler,
    playlistPopupHandler
}) => {
    const history = useRouter();
    let url = '';
    if (type === 'audio') url = `/audio/album/${video._id}`;
    if (type === 'video' || type === 'profileVideo') url = `/video/${video._id}`;
    if (type === 'image') url = `image/album/${video._id}`;
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
                    src={'https://artbot.mypinata.cloud/ipfs/' + video.thumbnailHash+`${type==='video'?'?img-width=300':'?img-width=200'}`}
                    alt="image"
                />

                <span className="video-card__rating" style={{ color: '#1BA6FF' }}>
                    <i style={{ color: '#1BA6FF' }} className="fa fa-star" /> &nbsp;
                    {video.rating ? video.rating.toFixed(1) : '0.0'}&nbsp;{' '}
                    {video.rating !== 0 ? `(${video?.ratingCount})` : ''}
                </span>
                {/* {video.maturityContent ? <div class="mat">Mature</div> : ''} */}
                {video.maturityContent ? (
                    <div
                        className="video-card__mature"
                        style={{
                            position: 'absolute',
                            right: '0px',
                            padding: '0px 10px',
                            background: 'rgba(0,0,0,0.7)',
                            borderRadius: '10px 0px 0px 0px',
                            color: 'red',
                            bottom: '41px',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            zIndex: '10'
                        }}>
                        Mature
                    </div>
                ) : null}
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
                    <Link href={`/profile/${video.user}`} className="pointer">
                        <div className="video-card__min float-left" style={{ color: '#1BA6FF' }}>
                            {video.username ? video.username : 'ArtBot User'}
                        </div>
                    </Link>
                    <div
                        className="video-card-title__right text-white text-capitalize "
                        style={{ overflow: 'hidden' }}>
                        {video.duration}
                        {/* {video.genre && video.genre.split(',')[0]} */}
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
export default connect(mapStateToProps)(VideoCard);
