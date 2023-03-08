import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import { Link } from 'react-router-dom';
const RelatedVideoCard = ({ video, type }) => {
    function convert(value) {
        if (value >= 1000000) {
            value = value / 1000000 + 'M';
        } else if (value >= 1000) {
            value = value / 1000 + 'K';
        }
        return value;
    }
    let path = '';
    if (type === 'video') path = `/video/${video._id}`;
    if (type === 'audio') path = `/audio/album/${video._id}`;
    if (type === 'image') path = `/image/album/${video._id}`;
    return (
        <div className="related-video mb-2">
            <Link to={path}>
                <Img
                    src={`https://artbot.mypinata.cloud/ipfs/${video.thumbnailHash}${type==='video'?'?img-width=300':'?img-width=200'}`}
                    alt="related-video"
                    className={`img-fluid related-video__img ${type} rounded`}
                />
                {type === 'video' && (
                    <span className="related-video__duration">{video.duration}</span>
                )}
                <P1 className="text-white related-video__title mb-0 ">{video.title}</P1>
                <div className="d-flex">
                    <div className="d-flex  ">
                        <Img
                            src={`${
                                video.user.profile_photo
                                    ? `https://artbot.mypinata.cloud/ipfs/${video.user.profile_photo}?img-width=15&img-height=15`
                                    : 'https://www.w3schools.com/howto/img_avatar.png'
                            }   `}
                            width="15"
                            height="15"
                            className={` ${type === 'video' ? 'rounded' : 'rounded-0'}  mr-1 `}
                        />
                        <P1 className="related-video__name mr-1 mb-0">{video.user.username}</P1>
                    </div>
                    <div className="d-flex  ">
                        <div className="line mx-1" />
                        <P1 className="related-video__views ml-1 mb-0">{convert(video.views)}</P1>
                    </div>
                </div>
            </Link>
        </div>
    );
};
RelatedVideoCard.defaulProps = {};
export default RelatedVideoCard;
