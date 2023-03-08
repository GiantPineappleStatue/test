import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Typography from '@material-ui/core/Typography/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckIcon from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton/IconButton';
import PopperUi from '../PopperUi/PopperUi';

const Settings = ({ playbackRate, handlePlaybackRate, levels, onQualityChange, placement }) => {
    const [popover, setPopover] = React.useState(false);
    const [open, setOpen] = useState(false);
    const [quality, setQuality] = useState(false);
    const settingRef = useRef();
    return (
        <React.Fragment>
            <IconButton
                aria-describedby="settingsId"
                className="btn-white"
                ref={settingRef}
                id="settingsId"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen((prev) => !prev);
                }}>
                <SettingsIcon fontSize={placement === 'bottom' ? 'default' : 'large'} />
            </IconButton>
            {/* Play back Speed Control */}
            <PopperUi
                placement={placement}
                id="settingsId"
                anchorEl={settingRef.current}
                open={popover}
                openHandler={setPopover}>
                <MenuItem
                    onClick={() => {
                        setOpen(!open);
                        setPopover(!popover);
                    }}>
                    {' '}
                    <ArrowBackIosIcon fontSize="small" /> Playback Speed{' '}
                </MenuItem>
                <hr className="settings-hr-line" />
                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map((item, i) => (
                    <MenuItem
                        onClick={() => {
                            handlePlaybackRate(item);
                            setPopover(!popover);
                            setOpen(!open);
                        }}
                        key={i}>
                        {' '}
                        {item === playbackRate && <CheckIcon fontSize="small" />}&nbsp; {item}
                    </MenuItem>
                ))}
            </PopperUi>
            {/* Quality Control */}
            <PopperUi
                id="settingsId"
                placement={placement}
                openHandler={setQuality}
                open={quality}
                anchorEl={settingRef.current}>
                <MenuItem
                    onClick={() => {
                        setOpen(!open);
                        setQuality(!quality);
                    }}>
                    {' '}
                    <ArrowBackIosIcon fontSize="small" /> Quality{' '}
                </MenuItem>
                <hr className="settings-hr-line" />
                {[...levels.list].reverse().map((item, i) => (
                    <MenuItem
                        onClick={() => {
                            onQualityChange(levels.list.length - i - 1);
                            setQuality(!quality);
                            setOpen(!open);
                        }}
                        key={i}>
                        {' '}
                        {Math.sign(levels.initial) !== -1 &&
                            levels.list.length - i - 1 === levels.loaded && (
                                <CheckIcon fontSize="small" />
                            )}
                        &nbsp; {item.name}
                    </MenuItem>
                ))}
                <MenuItem
                    onClick={() => {
                        onQualityChange(-1);
                        setQuality(!quality);
                        setOpen(!open);
                    }}>
                    {' '}
                    {Math.sign(levels.initial) === -1 && <CheckIcon fontSize="small" />}&nbsp; Auto
                </MenuItem>
            </PopperUi>

            <PopperUi
                open={open}
                placement={placement}
                openHandler={setOpen}
                id="settingsId"
                anchorEl={settingRef.current}>
                <MenuItem
                    onClick={() => {
                        setOpen(false);
                        setPopover(!popover);
                    }}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Typography>Playback Speed </Typography>
                        <Typography>{playbackRate}x</Typography>
                        <ArrowForwardIosIcon fontSize="small" />
                    </Grid>
                </MenuItem>
                {levels.list.length > 0 && (
                    <MenuItem
                        onClick={() => {
                            setOpen(false);
                            setQuality(!quality);
                        }}>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Typography>Quality</Typography>
                            <Typography>
                                {Math.sign(levels.initial) === -1 && 'Auto'}&nbsp;
                                {Math.sign(levels.loaded) !== -1 &&
                                    levels.list[levels.loaded]?.name}
                            </Typography>
                            <ArrowForwardIosIcon fontSize="small" />
                        </Grid>
                    </MenuItem>
                )}
            </PopperUi>
        </React.Fragment>
    );
};

Settings.propTypes = {
    placement: PropTypes.string.isRequired
};

export default React.memo(Settings);
