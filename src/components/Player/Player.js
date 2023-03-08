import React, { useRef, useState } from 'react';
import PropsTypes from 'prop-types';
import screenful from 'screenfull';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import PlayPauseButton from './PlayPauseButton/PlayPauseButton';
import VolumeControl from './VolumeControl/VolumeControl';
import PlayTimers from './PlayTimers/PlayTimers';
import Settings from './Settings/Settings';
import PictureInPicture from './PictureInPictureMode/PictureInPictureMode';
import FullScreenAndExit from './FullScreenAndExit/FullScreenAndExit';
import VideoProgressBar from './VideoProgressBar/VideoProgressBar';
import clsx from 'clsx';
const Player = React.forwardRef(
    (
        {
            poster,
            src,
            children,
            levels,
            onQualityChange,
            onPlay,
            onPause,
            onEnd,
            onWaiting,
            onTimeUpdate
        },
        ref
    ) => {
        const [videoProps, setVideoProps] = useState({
            playing: false,
            toolTip: {
                text: '00:00',
                position: 0
            },
            playbackRate: 1
        });
        const [timers, setTimers] = useState({
            currentTime: '00:00',
            duration: '00:00',
            played: 0,
            progressMax: '0'
        });
        const [fullScreen, setFullScreen] = useState(false);
        const [volumeControls, setVolumeControls] = useState({ volume: 1, muted: false });
        const [loading, setLoading] = useState(false);
        const [showMobile, setShowMobile] = useState(false);
        const playerContainerRef = useRef();
        React.useEffect(() => {
            setShowMobile(!showMobile);
            // setTimeout(() => setShowMobile(false), 10000);
            // document.addEventListener('keyup', keyboardShortcuts);
            ref.current.addEventListener('timeupdate', updateTime);
            ref.current.addEventListener('playing', onPlayHandle);
            ref.current.addEventListener('pause', onPauseHandle);
            ref.current.addEventListener('ended', onEndedHandle);
            ref.current.addEventListener('waiting', onWaitingHandle);
            if (ref && ref.current) {
                setTimers({
                    currentTime: format(ref.current.currentTime),
                    duration: format(ref.current.duration),
                    progressMax: Math.floor(ref.current.duration).toString()
                });
            }
            return () => {
                try {
                    // document.removeEventListener('keyup', keyboardShortcuts);
                    ref.current.removeEventListener('timeupdate', updateTime);
                    ref.current.removeEventListener('playing', onPlayHandle);
                    ref.current.removeEventListener('pause', onPauseHandle);
                    ref.current.removeEventListener('ended', onEndedHandle);
                    ref.current.removeEventListener('waiting', onWaitingHandle);
                } catch (error) {}
            };
        }, []);
        const onPlayHandle = () => {
            setLoading(false);
            onPlay();
        };
        const onPauseHandle = () => {
            onPause();
        };
        const onEndedHandle = () => {
            setVideoProps({
                ...videoProps,
                playing: false
            });
            onEnd();
        };
        const onWaitingHandle = () => {
            setLoading(true);
            onWaiting();
        };

        function keyboardShortcuts(event) {
            const { key } = event;
            switch (key) {
                case ' ':
                    handleOnPlayPause();
                    // animatePlayback();
                    if (ref.current.paused) {
                        //   showControls();
                    } else {
                        //   setTimeout(() => {
                        //     hideControls();
                        //   }, 2000);
                    }
                    break;
                case 'm':
                    onMute();
                    break;
                case 'f':
                    toggleFullScreen();
                    break;
                case 'p':
                    pip();
                    break;
                case 'ArrowUp':
                    volumeShortKeyHandler('up');
                    break;
                case 'ArrowDown':
                    volumeShortKeyHandler('down');
                    break;
                case 'ArrowRight':
                    playShortKeyHandler('next');
                    break;
                case 'ArrowLeft':
                    playShortKeyHandler('prev');
                    break;
                case 'Escape':
                    handleToggleScreen();
                    break;
                default:
                    break;
            }
        }
        const playShortKeyHandler = (diraction) => {
            if (diraction === 'next') {
                ref.current.currentTime = ref.current.currentTime + 10;
            } else if (diraction === 'prev') {
                ref.current.currentTime = ref.current.currentTime + 10;
            }
        };
        const volumeShortKeyHandler = (direction) => {
            if (direction == 'up') {
                // if not fully cranked yet, increase volume
                if (ref.current.volume < 0.8) {
                    ref.current.volume = ref.current.volume + 0.2;
                    setVolumeControls({ volume: ref.current.volume + 0.2, muted: false });
                }
            } else if (direction == 'down') {
                // if not muted, decrease volume
                if (ref.current.volume > 0.2) {
                    ref.current.volume = ref.current.volume - 0.2;
                    setVolumeControls({
                        volume: ref.current.volume - 0.2,
                        muted: ref.current.volume - 0.2 <= 0 ? true : false
                    });
                }
            }
        };
        const handlePlaybackRate = (val) => {
            ref.current.playbackRate = val;
            setVideoProps({
                ...videoProps,
                playbackRate: val
            });
        };
        const format = (seconds) => {
            if (isNaN(seconds)) {
                return `00:00`;
            }
            const date = new Date(seconds * 1000);
            const hh = date.getUTCHours();
            const mm = date.getUTCMinutes();
            const ss = date.getUTCSeconds().toString().padStart(2, '0');
            if (hh) {
                return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
            }
            return `${mm}:${ss}`;
        };
        const updateTime = () => {
            const timeDisplayFormat = 'normal';
            const currentTime = ref && ref.current ? ref.current.currentTime : '00:00';

            const duration = ref && ref.current ? ref.current.duration : '00:00';
            const elapsedTime =
                timeDisplayFormat == 'normal'
                    ? format(currentTime)
                    : `-${format(duration - currentTime)}`;

            const totalDuration = format(duration);
            setTimers({
                ...timers,
                currentTime: elapsedTime,
                duration: totalDuration,
                played: ref.current.currentTime,
                progressMax: Math.floor(ref.current.duration).toString()
            });
            onTimeUpdate();
        };
        const toggleFullScreen = async () => {
            await screenful.toggle(playerContainerRef.current);
            handleToggleScreen();
        };
        const handleToggleScreen = () => {
            if (typeof window !== 'undefined') setFullScreen(document.webkitIsFullScreen);
        };
        const pip = async () => {
            try {
                await ref.current.requestPictureInPicture();
            } catch (error) {}
        };
        const handleOnPlayPause = () => {
            const vid = ref.current;
            if (vid.paused || vid.ended) {
                ref.current.play();
                setShowMobile(true);
                if (!ref.current.paused) setTimeout(() => setShowMobile(false), 10000);
                setVideoProps({
                    ...videoProps,
                    playing: true
                });
            } else {
                ref.current.pause();
                setShowMobile(true);
                setVideoProps({
                    ...videoProps,
                    playing: false
                });
            }
        };
        const onMute = () => {
            setVolumeControls({
                muted: !volumeControls.muted,
                volume: !volumeControls.muted ? 0 : 1
            });
            ref.current.muted = !volumeControls.muted;
        };
        const handleVolumeChange = (e) => {
            const newVal = e.target.value;
            console.log(newVal);
            ref.current.volume = newVal;
            setVolumeControls({ volume: newVal, muted: +newVal === 0 ? true : false });
        };
        const handleOnSeekChange = (e) => {
            const val = e.target.value;
            ref.current.currentTime = val;
            setTimers({
                ...timers,
                played: val
            });
        };
        const handleSeekTooltip = (event) => {
            const skipTo = Math.round(
                (event.nativeEvent.offsetX / event.target.clientWidth) *
                    parseInt(event.target.getAttribute('max'), 10)
            );
            const time = format(skipTo);
            setVideoProps({
                ...videoProps,
                toolTip: {
                    text: time,
                    position: event.nativeEvent.offsetX
                }
            });
        };
        const handleControlToggleClicked = (e) => {
            if (e.target !== e.currentTarget) return;
            setShowMobile(!showMobile);
            handleOnPlayPause();
            if (!ref.current.paused) setTimeout(() => setShowMobile(false), 10000);
        };
        const handleControlToggleMove = (e) => {
            if (e.target !== e.currentTarget) return;
            setShowMobile(!showMobile);
            if (!ref.current.paused) setTimeout(() => setShowMobile(false), 10000);
        };
        const { toolTip } = videoProps;
        const { currentTime, duration, played, progressMax } = timers;
        const { volume, muted } = volumeControls;
        return (
            <div className="container-fluid1 ">
                <div
                    className="video-player-container"
                    id="video-player-container"
                    ref={playerContainerRef}>
                    <div className="playback-animation" id="playback-animation">
                        {loading && <CircularProgress color="inherit" size={80} />}
                    </div>

                    <video
                        controls={false}
                        controlsList="nodownload"
                        ref={ref}
                        src={src}
                        className={`video-player ${clsx({ 'video-player-full': fullScreen })} `}
                        id="video"
                        preload="metadata"
                        poster={poster}>
                        {children}
                    </video>

                    <div
                        className="video-controls-container"
                        onMouseMove={() => setShowMobile(true)}
                        onClick={handleControlToggleClicked}
                        onMouseEnter={handleControlToggleMove}>
                        <div
                            className={`video-controls-mobile-container d-block d-md-none  ${
                                showMobile ? 'show-mobile' : ''
                            } `}>
                            <div className="video-controls-mobile__settings">
                                <Settings
                                    levels={levels}
                                    handlePlaybackRate={handlePlaybackRate}
                                    playbackRate={videoProps.playbackRate}
                                    onQualityChange={onQualityChange}
                                    placement="bottom"
                                />
                            </div>
                            <div className="video-controls-mobile__play">
                                {!loading && (
                                    <PlayPauseButton
                                        playing={videoProps.playing}
                                        handleOnPlayPause={handleOnPlayPause}
                                    />
                                )}
                            </div>
                            <div className="video-controls-mobile">
                                <PlayTimers currentTime={currentTime} duration={duration} />
                                <div className="video-controls-mobile__progress">
                                    <VideoProgressBar
                                        played={played}
                                        progressMax={progressMax}
                                        handleOnSeekChange={handleOnSeekChange}
                                        handleSeekTooltip={handleSeekTooltip}
                                        toolTip={toolTip}
                                    />
                                </div>

                                <FullScreenAndExit
                                    fullscreen={fullScreen}
                                    toggleFullScreen={toggleFullScreen}
                                />
                            </div>
                        </div>

                        <div
                            className={`video-controls d-none d-sm-none d-md-block ${
                                showMobile ? 'show' : ''
                            }`}
                            id="video-controls">
                            <VideoProgressBar
                                played={played}
                                progressMax={progressMax}
                                handleOnSeekChange={handleOnSeekChange}
                                handleSeekTooltip={handleSeekTooltip}
                                toolTip={toolTip}
                            />

                            <div className="bottom-controls">
                                <div className="left-controls">
                                    <PlayPauseButton
                                        playing={videoProps.playing}
                                        handleOnPlayPause={handleOnPlayPause}
                                    />
                                    <VolumeControl
                                        onMute={onMute}
                                        volume={volume}
                                        handleVolumeChange={handleVolumeChange}
                                        muted={muted}
                                    />
                                    <PlayTimers currentTime={currentTime} duration={duration} />
                                </div>

                                <div className="right-controls text-white">
                                    <Settings
                                        levels={levels}
                                        handlePlaybackRate={handlePlaybackRate}
                                        playbackRate={videoProps.playbackRate}
                                        onQualityChange={onQualityChange}
                                        placement="top"
                                    />

                                    <PictureInPicture pipHandler={pip} />
                                    <FullScreenAndExit
                                        fullscreen={fullScreen}
                                        toggleFullScreen={toggleFullScreen}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

Player.defaultProps = {
    src: '',
    levels: {
        list: [],
        initial: -1,
        loaded: 0
    },
    poster: '',
    onPlay: () => {},
    onPause: () => {},
    onEnd: () => {},
    onWaiting: () => {},
    onTimeUpdate: () => {},
    onQualityChange: () => {}
};

Player.propTypes = {
    poster: PropsTypes.string.isRequired,
    src: PropsTypes.string,
    levels: PropsTypes.object,
    onQualityChange: PropsTypes.func,
    onPlay: PropsTypes.func,
    onPause: PropsTypes.func,
    onEnd: PropsTypes.func,
    onWaiting: PropsTypes.func,
    onTimeUpdate: PropsTypes.func
    // ref:PropsTypes.object.isRequired
};

export default Player;
