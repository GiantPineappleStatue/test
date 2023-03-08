import React from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList/MenuList';

function PopperUi({ id, open, openHandler, anchorEl, placement, children }) {
    return (
        <Popper
            id={id}
            style={{ minWidth: '250px', background: 'rgba(0,0,0,0.5)', color: 'white' }}
            open={open}
            anchorEl={anchorEl}
            placement={placement}
            transition
            onClick={() => openHandler(!open)}>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}>
                        <ClickAwayListener onClickAway={() => openHandler(!open)}>
                            <MenuList>{children}</MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
}
PopperUi.defaultProps = {
    placement: 'top'
};

PopperUi.propTypes = {
    id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    openHandler: PropTypes.func.isRequired,
    placement: PropTypes.string.isRequired,
    anchorEl: PropTypes.object
};

export default PopperUi;
