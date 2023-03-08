import React from 'react';
import PropType from 'prop-types';

function PlayTimers({ currentTime, duration }) {
    return (
        <div className="time text-white">
            <time id="time-elapsed">{currentTime}</time>
            <span> / </span>
            <time id="duration">{duration}</time>
        </div>
    );
}

PlayTimers.propTypes = {
    currentTime: PropType.string.isRequired,
    duration: PropType.string.isRequired
};

export default PlayTimers;
