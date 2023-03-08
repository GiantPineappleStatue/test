import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import Rating from '@material-ui/lab/Rating/Rating';
import clsx from 'clsx';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';

function ProfileVideoCard({ type, video, className }) {
    let styleAudio = {};
    let styleVideo = { maxWidth: '50rem' };
    let url = '';
    if (type === 'audio') url = `/audio/album/${video._id}`;
    if (type === 'video') {
        url = `/video/${video._id}`;
    }
    if (type === 'image') url = `image/album/${video._id}`;
    if (type !== 'video') {
        styleAudio = { minHeight: '13rem' };
        styleVideo = { maxWidth: '35rem' };
    }
    if (type === 'album') url = `/audio/album/${video._id}`;
    if (type === 'image_album') url = `/image/album/${video._id}`;
    return (
        <Link href={url}>
            <div className={`d-flex mb-2 mb-sm-0 profile-card ${className}`} style={styleVideo}>
                <div className="w-50 profile-card-left " style={styleAudio}>
                    <Img
                        src={'https://artbot.mypinata.cloud/ipfs/' + video.thumbnailHash+'?img-width=300'}
                        className="w-100 h-100 profile-card-left__img"
                    />
                    <span className="profile-card-left__duration">{video.duration}</span>
                </div>
                <div className="w-50 ml-2 profile-card-right">
                    <P1 className="text-white  profile-card-right__title mb-1">{video.title}</P1>
                    <div
                        className={`d-flex ${clsx({
                            'color-blue': type === 'video',
                            'color-purple': type === 'audio',
                            'color-green': type === 'image'
                        })}`}>
                        {' '}
                        <Rating
                            readOnly
                            className={` profile-card-right__rating ${clsx({
                                'color-blue': type === 'video',
                                'color-purple': type === 'audio',
                                'color-green': type === 'image'
                            })}`}
                            value={Number(video.rating?.toFixed(1))}
                        />
                        <P1 className="ml-1 mb-0 profile-card-right__rating-value">
                            {video.rating}&nbsp;{' '}
                            {(video.rating !== 0 && video?.ratingCount )? `(${video?.ratingCount})` : ''}
                        </P1>
                    </div>
                    <div className="profile-card-right__desc text-break ">
                        {ReactHtmlParser(
                            video.description?.substring(
                                0,
                                className === 'featured-videos' ? 300 : 70
                            )
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProfileVideoCard;
