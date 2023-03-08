import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import { fancyTimeFormat } from '../../utils/fancyTimeFormat';
import clsx from 'clsx';

export default ({ audio, thumbnailImg, count, handleChange, current }) => {
    if (audio === null) return <span />;
    return (
        <div
            className={`audio-playlist-card ${clsx({
                'audio-active': count === current
            })} audio-card__current row no-gutters`}
            onClick={handleChange}>
            <div className="col-1">
                <Img
                    src={`https://artbot.mypinata.cloud/ipfs/${thumbnailImg}?img-width=30&img-height=30`}
                    width="30"
                    height="30"
                    className=" rounded audio-playlist-card__img"
                    alt="audio_playlist"
                />
            </div>
            <div className="col-1 my-auto">
                <P1 className="mb-0 audio-playlist-card__count">{count + 1}</P1>
            </div>
            <div className="col-9 my-auto">
                <P1 className="mb-0 audio-playlist-card__title">{audio.title}</P1>
            </div>
            <div className="col-1 my-auto">
                <P1 className="mb-0 text-right audio-playlist-card__duration">
                    {fancyTimeFormat(audio.duration)}
                </P1>
            </div>
        </div>
    );
};
