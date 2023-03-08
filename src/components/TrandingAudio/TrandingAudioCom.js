import React, { Component } from 'react';

const TrandingAudioCom = ({ imgHash }) => {
    return (
        <div className="video-js">
            <img
                width="100%"
                src={`https://artbot.mypinata.cloud/ipfs/${imgHash}?img-width=300&img-height=190`}
            />
        </div>
    );
};
export default TrandingAudioCom;
