import React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';

const DialogBox = ({ className, children, scroll, open, handleClose, fullWidth, maxWidth }) => {
    return (
        <Dialog
            className={className}
            open={open}
            onClose={handleClose}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            aria-labelledby="form-dialog-title"
            scroll={scroll}>
            {children}
        </Dialog>
    );
};
DialogBox.defaultProps = {
    fullWidth: false,
    maxWidth: 'sm'
};
export default React.memo(DialogBox);
