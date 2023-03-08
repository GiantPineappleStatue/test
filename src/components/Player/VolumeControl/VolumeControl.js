import React from 'react';
import IconButton from '@material-ui/core/IconButton/IconButton';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeMute from '@material-ui/icons/VolumeOff';
import PropsTypes from 'prop-types';
function VolumeControl({ onMute, volume, handleVolumeChange, muted }) {
    return (
        <div className="volume-controls">
            <IconButton className="btn-white" onClick={onMute}>
                {muted ? (
                    <VolumeMute fontSize="large" />
                ) : volume > 0.5 ? (
                    <VolumeUp fontSize="large" />
                ) : (
                    <VolumeDown fontSize="large" />
                )}
            </IconButton>

            <input
                className="volume"
                id="volume"
                value={volume}
                onChange={handleVolumeChange}
                data-mute="0.5"
                type="range"
                max="1"
                min="0"
                step="0.01"
            />
        </div>
    );
}
VolumeControl.propTypes = {
    volume: PropsTypes.number.isRequired,
    muted: PropsTypes.bool.isRequired,
    onMute: PropsTypes.func.isRequired,
    handleVolumeChange: PropsTypes.func.isRequired
};
export default React.memo(VolumeControl);
