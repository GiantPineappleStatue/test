import React from 'react';
import { Star } from '../../../public/svg';
import { cutString } from '../../utils/cutString';
const VideoCardV2 = ({ card, styleclass, activeIdHandler }) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <div
                className={`${styleclass} video-card_wrapper pointer`}
                onClick={() => activeIdHandler(card._id)}>
                <div className="card">
                    <div className="video_section">
                        <img
                            src={
                                'https://artbot.mypinata.cloud/ipfs/' +
                                card.thumbnailHash +
                                '?img-width=300'
                            }
                        />
                    </div>

                    <div className="description_wrapper">
                        <div className="video_des">
                            <div className="video-title">
                                <div>
                                    <img
                                        className="rounded-circle"
                                        width="35"
                                        height="35"
                                        src={'https://www.w3schools.com/howto/img_avatar.png'}
                                        alt="person"
                                    />
                                </div>
                                <div className="video-title-text">
                                    <a>{cutString(card.title, 20)}</a>{' '}
                                    <span className="video-title-time">{card.username}</span>
                                </div>
                            </div>
                            <div className="rating">
                                <Star />
                                {card.rating ? card.rating.toFixed(1) : '0.0'}
                                {card.rating !== 0 && card?.ratingCount > 0
                                    ? `(${card?.ratingCount})`
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoCardV2;
