import React from 'react';
import Button from '@material-ui/core/Button/Button';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function SimpleSnackbar({ open, handleClose, handleUndo, message }) {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            color="success"
            action={
                <React.Fragment>
                    <Button color="secondary" size="small" onClick={handleUndo}>
                        UNDO
                    </Button>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    );
}
