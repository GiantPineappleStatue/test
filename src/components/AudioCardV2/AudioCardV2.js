import React from 'react';
import { Star } from '../../../public/svg';
import MusicPlayer from './MusicPlayer';
const AudioCardV2 = ({ card, activeIdHandler }) => {
    return (
        <>
            <div className="audio_card_wrapper pointer" onClick={() => activeIdHandler(card._id)}>
                <div className="audio-card">
                    <div className="audio-card-left">
                        <div>
                            <img
                                src={
                                    'https://artbot.mypinata.cloud/ipfs/' +
                                    card.thumbnailHash +
                                    '?img-width=100'
                                }
                                height="64px"
                                width="64px"
                                alt="logo"
                            />
                        </div>
                        <div className="clearfix w-100">
                            <div className="artbot-pl-8 float-left">
                                <h4>
                                    {card.title.substring(0, 19)}
                                    {card.title.length > 19 ? '...' : ''}
                                </h4>
                                <span className="artist-img">
                                    {' '}
                                    <img
                                        className="rounded-circle"
                                        width="25"
                                        height="25"
                                        src={'https://www.w3schools.com/howto/img_avatar.png'}
                                        alt="artist"
                                    />
                                    <span className="artbot-pl-8">{card.username}</span>
                                </span>
                            </div>
                            <div className="audio-card-rating float-right">
                                <div className="d-flex align-items-center">
                                    <Star />
                                    {card.rating ? card.rating.toFixed(1) : '0.0'}
                                    {card.rating !== 0 && card?.ratingCount > 0
                                        ? `(${card?.ratingCount})`
                                        : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="music-sec">
                        <div className="music-player">
                            {/* <button className="play-btn">
                <PlayButton />
              </button> */}
                            <MusicPlayer />
                        </div>
                        {/* <div className="audio-title-time">{time}</div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AudioCardV2;
