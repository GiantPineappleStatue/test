import React from 'react';
import { Star } from '../../../public/svg';
import MusicPlayer from '../AudioCardV2/MusicPlayer';
import { useRouter } from 'next/router';
const AudioCardDetailV2 = ({ card }) => {
    const router = useRouter();
    return (
        <>
            <div
                style={{ width: '200px' }}
                className="audio_card_wrapper audio_card_detail_wrapper pointer"
                onClick={() => router.push(`/audio/album/${card._id}`)}>
                <div className="audio-card">
                    <img
                        src={
                            'https://artbot.mypinata.cloud/ipfs/' +
                            card.thumbnailHash +
                            '?img-width=300'
                        }
                        className="img-fluid"
                        // height="64px"
                        // width="64px"
                        alt="logo"
                    />
                    <div className="audio-card-left1">
                        <h4>
                            {card.title.substring(0, 19)}
                            {card.title.length > 19 ? '...' : ''}
                        </h4>
                        <div className="clearfix w-100">
                            <div className="artbot-pl-8 float-left">
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
                            {/* <MusicPlayer /> */}
                        </div>
                        {/* <div className="audio-title-time">{time}</div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AudioCardDetailV2;
