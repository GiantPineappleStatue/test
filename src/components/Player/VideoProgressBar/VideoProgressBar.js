import React from 'react';
import PropTypes from 'prop-types';

function VideoProgressBar({ played, progressMax, handleSeekTooltip, handleOnSeekChange, toolTip }) {
    return (
        <div className="video-progress">
            <progress id="progress-bar" value={played} min="0" max={progressMax}></progress>
            <input
                className="seek"
                id="seek"
                value={played || 0}
                min="0"
                onMouseMove={handleSeekTooltip}
                max={progressMax}
                onChange={handleOnSeekChange}
                type="range"
                step="1"
            />
            <div
                className="seek-tooltip"
                style={{ marginLeft: toolTip.position + 'px' }}
                id="seek-tooltip">
                {toolTip.text}
            </div>
        </div>
    );
}

VideoProgressBar.propTypes = {
    played: PropTypes.any,
    progressMax: PropTypes.string.isRequired,
    handleSeekTooltip: PropTypes.func.isRequired,
    handleOnSeekChange: PropTypes.func.isRequired,
    toolTip: PropTypes.object.isRequired
};

export default VideoProgressBar;
