/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import ReactIcons from '../UI/ReactIcons/ReactIcons';
const MovieCreatorCard = ({ thumbnailSrc, videoSrc, title, desc, index, openPopup }) => {
    return (
        <div className="movie-creator-section-card">
            <div className="movie-creator-section-card-top">
                <Img
                    onClick={() => openPopup(index)}
                    className="movie-creator-section-card--img img-fluid pointer"
                    src={thumbnailSrc}
                    alt="image thumbnail"
                />
                {videoSrc && (
                    <div
                        className="movie-creator-section-card-top--btn"
                        onClick={() => openPopup(index)}>
                        <ReactIcons.AiOutlinePlayCircle size={40} />
                    </div>
                )}
            </div>
            <div className="movie-creator-section-card-below">
                <P1 className="movie-creator-section-card-below--title">{title}</P1>

                <P1 className="movie-creator-section-card-below--desc text-capitalize">{desc}</P1>
            </div>
        </div>
    );
};

export default MovieCreatorCard;
