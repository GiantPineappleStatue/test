import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import Grow from '@material-ui/core/Grow/Grow';
import Paper from '@material-ui/core/Paper/Paper';
import MenuList from '@material-ui/core/MenuList/MenuList';
import Popper from '@material-ui/core/Popper/Popper';

const PopperUi = ({ children, open, setOpen, anchorEl, className, childClassName }) => (
    <Popper
        className={`${className} rounded`}
        placement="bottom-end"
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal={true}
        modifiers={{
            flip: {
                enabled: false
            },
            preventOverflow: {
                enabled: true,
                boundariesElement: 'window'
            },
            arrow: {
                enabled: true,
                element: anchorEl
            }
        }}>
        {({ TransitionProps, placement }) => (
            <Grow
                {...TransitionProps}
                style={{
                    transformOrigin: 'right'
                }}>
                <Paper className={`rounded-0 ${childClassName}`}>
                    <ClickAwayListener onClickAway={() => setOpen(false)}>
                        <MenuList autoFocusItem={open} id="menu-list-grow">
                            {children}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Grow>
        )}
    </Popper>
);
PopperUi.defaultProps = {
    childClassName: 'p-3'
};

export default PopperUi;
