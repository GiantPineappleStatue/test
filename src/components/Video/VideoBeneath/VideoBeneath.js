import React from 'react';
import { BsStarFill } from 'react-icons/bs';
import parser from 'react-html-parser';

const VideoBeneath = (props) => {
    const { title, tagline, ratingNumber, time, titlefont, tagfont, video, audio, rating } = props;
    return (
        <div className="video-beneath py-2">
            <div className=" left">
                <h4
                    style={{
                        fontSize: titlefont ? '14px' : '18px'
                    }}>
                    {title.length > 30 ? title.substring(0, 30) + '...' : title}
                </h4>
                <div className="ratings">
                    <BsStarFill
                        color={video ? '#00BFFF ' : audio ? ' #8855F3' : '#90e40d'}
                        size="16"
                        style={{ paddingRight: '2px' }}
                    />
                    <span
                        className="rating"
                        style={{
                            paddingRight: '2px',
                            fontSize: titlefont ? '12px' : '16px'
                        }}>
                        {rating}
                    </span>{' '}
                    {ratingNumber && (
                        <span
                            className="rating"
                            style={{
                                fontSize: titlefont ? '12px' : '16px'
                            }}>
                            ({ratingNumber})
                        </span>
                    )}
                </div>
            </div>
            <div className="titleTagline">
                <span style={{ fontSize: tagfont ? tagfont : '14px' }}>
                    {parser(tagline?.substring(0, 10))}
                </span>
                <span>{time}</span>
            </div>
        </div>
    );
};

export default VideoBeneath;
