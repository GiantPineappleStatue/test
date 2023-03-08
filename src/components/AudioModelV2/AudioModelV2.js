import React from 'react';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';
import { Star, StarOutline } from '../../../public/svg';
import BotButton from '../UI/BotButton/BotButton';
import TredingAudios from '../TrendingAudios/TrendingAudios';
import Comments from '../CommentsV2/CommentsV2';
import ReactHtmlParser from 'react-html-parser';
import P1 from '../UI/P1/P1';
import { cutString } from '../../utils/cutString';
import { timeago } from '../../utils/relativeTime';
import AudioPlayerCard from '../AudioPlayerCard/AudioPlayerCard';
const ratingCount = {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
    5: 0
};
const AudioModelV2 = ({ video, show, handleClose, onHide }) => {
    const [showMore, setShowMore] = React.useState(false);

    return (
        <>
            <Modal size="xl" className="ModalWrapper" show={show} onHide={handleClose} centered>
                <Modal.Header
                    closeButton
                    onClick={handleClose}
                    className="btn-close"></Modal.Header>

                <Modal.Body className="pt-0">
                    {/* <ReactPlayer
                        url={video.video.mediaUrl}
                        loop={true}
                        controls={true}
                        playIcon={<PlayButton />}
                        height="100%"
                        width="100%"
                        className="react-player"
                    /> */}
                    <AudioPlayerCard
                        title={video.video.title}
                        username={video.video.user.username}
                        files={video.video.files.length ? video.video.files : []}
                        thumbnailImg={video.video.thumbnailHash}
                        onPlay={() => {}}
                        onPause={() => {}}
                        onEnded={() => {}}
                        subscriberOnly={video.subscriberOnly}
                    />
                    <div className="video-model-content">
                        <div className="video-model-title-section">
                            <div className="title-tags">
                                <a>Drama / Superhero</a>
                                <h2>{video.video.title}</h2>
                                <span>{video.video.views} views</span>
                                <span className="ml-2">
                                    {timeago(Date.parse(video.video.created_at))}
                                </span>
                            </div>
                            <div className="rating-section">
                                <div className="rating">
                                    <Star />
                                    <span>
                                        {video.video.rating.toFixed(1)} ({video.video.ratingCount})
                                    </span>
                                </div>
                                <div className="like-dislike-section">
                                    {/* <div className="like">
                                        <LikeIcon />
                                        <span>12</span>
                                    </div>
                                    <div className="dislike">
                                        <DislikeIcon />
                                        <span>3</span>
                                    </div> */}
                                    <div className="stars-list">
                                        {[...Array(Math.floor(video.video.rating)).keys()].map(
                                            (item, i) => (
                                                <Star key={i} />
                                            )
                                        )}
                                        {video.video.rating > 0 &&
                                            [
                                                ...Array(
                                                    ratingCount[Math.floor(video.video.rating)]
                                                ).keys()
                                            ].map((item, i) => <StarOutline key={i} />)}
                                        {video.video.rating === 0 &&
                                            [...Array(Math.floor(5)).keys()].map((item, i) => (
                                                <StarOutline key={i} />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="subscription-section">
                            <div className="d-flex mb-2">
                                <div>
                                    <Image
                                        src="/images/Avatar.png"
                                        height="37"
                                        width="37"
                                        alt="user"
                                    />
                                </div>
                                <div>
                                    <h3 className="sub-heading">{video.video.user.username}</h3>
                                    {/* <p className="total-subscriber">34M Subscribers</p> */}
                                </div>
                            </div>
                            <div>
                                <BotButton
                                    buttonText={'Subscribe'}
                                    styleclass={'btn-light'}
                                    variant={'light'}
                                    icon={''}
                                    hasIcon={false}
                                    size={'md'}></BotButton>
                            </div>
                        </div>
                        <div className="description">
                            <h3>Description</h3>
                            <div>
                                {!showMore &&
                                    ReactHtmlParser(cutString(video.video.description, 300))}
                                {showMore &&
                                    ReactHtmlParser(
                                        video.video.description.substring(
                                            0,
                                            video.video.description.length
                                        )
                                    )}
                                <div className="d-flex justify-content-end">
                                    {video.video.description.length > 300 && (
                                        <P1
                                            className="text-white mb-0 pointer"
                                            onClick={() => setShowMore(!showMore)}>
                                            {!showMore ? 'SHOW MORE' : 'SHOW LESS'}
                                        </P1>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-2">
                        <TredingAudios
                            data={video.relatedVideos.slice(0, 8)}
                            heading="Trending Audios"
                        />
                    </div>
                    <div>
                        <Comments videoId={video.video._id} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

AudioModelV2.defaultProps = {
    video: {
        relatedVideos: [],
        user: {
            username: ''
        },
        video: {
            _id: '',
            mediaUrl: '',
            title: '',
            description: '',
            views: 0,
            rating: 0,
            ratingCount: 0,
            created_at: '',
            files: []
        }
    }
};

export default AudioModelV2;
