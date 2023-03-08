import React from 'react';
import PropTypes from 'prop-types';
import PictureInPicture from '@material-ui/icons/PictureInPictureAlt';
import IconButton from '@material-ui/core/IconButton/IconButton';
function PictureInPictureMode({ pipHandler }) {
    return (
        <IconButton onClick={() => pipHandler()} className="btn-white">
            <PictureInPicture fontSize="large" />
        </IconButton>
    );
}

PictureInPictureMode.propTypes = {
    pipHandler: PropTypes.func.isRequired
};

export default React.memo(PictureInPictureMode);
