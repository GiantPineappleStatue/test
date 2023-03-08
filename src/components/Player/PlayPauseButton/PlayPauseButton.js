import React from 'react';
import IconButton from '@material-ui/core/IconButton/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import PropsTypes from 'prop-types';
function PlayPauseButton({ playing, handleOnPlayPause }) {
    return (
        <React.Fragment>
            {playing ? (
                <IconButton className="btn-white" onClick={handleOnPlayPause}>
                    <PauseIcon fontSize="large" />
                </IconButton>
            ) : (
                <IconButton className="btn-white" onClick={handleOnPlayPause}>
                    <PlayArrowIcon fontSize="large" />
                </IconButton>
            )}
        </React.Fragment>
    );
}

PlayPauseButton.propTypes = {
    playing: PropsTypes.bool.isRequired,
    handleOnPlayPause: PropsTypes.func.isRequired
};

export default PlayPauseButton;
