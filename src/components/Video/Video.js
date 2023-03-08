import React from 'react';

const VideoApp = ({ imgHash }) => {
    return (
        <div className="video-js">
            <img
                width="100%"
                className="img-fluid"
                src={`https://artbot.mypinata.cloud/ipfs/${imgHash}?img-width=400&img-height=200`}
            />
        </div>
    );
};
export default VideoApp;
