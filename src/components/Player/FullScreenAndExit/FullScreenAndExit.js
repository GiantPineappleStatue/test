import React from 'react';
import PropTypes from 'prop-types';
import FullScreen from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import IconButton from '@material-ui/core/IconButton/IconButton';

function FullScreenAndExit({ fullscreen, toggleFullScreen }) {
    return (
        <React.Fragment>
            {fullscreen ? (
                <IconButton onClick={toggleFullScreen} className="btn-white">
                    <FullscreenExitIcon fontSize="large" />
                </IconButton>
            ) : (
                <IconButton onClick={toggleFullScreen} className="btn-white">
                    <FullScreen fontSize="large" />
                </IconButton>
            )}
        </React.Fragment>
    );
}

FullScreenAndExit.propTypes = {
    fullscreen: PropTypes.bool.isRequired,
    toggleFullScreen: PropTypes.func.isRequired
};

export default React.memo(FullScreenAndExit);
