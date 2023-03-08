import React from 'react';
import {
    Player,
    BigPlayButton,
    LoadingSpinner,
    ControlBar,
    PlaybackRateMenuButton,
    ReplayControl,
    ForwardControl
} from 'video-react';
// import VideoPlayerUpNext from '../../VideoPlayerUpNext/VideoPlayerUpNext';

const VideoPlayer = React.forwardRef((props, ref) => (
    <div className="position-relative">
        <Player
            aspectRatio={props.aspectRatio}
            fluid={true}
            src={props.src}
            poster={props.poster}
            width="550"
            height="500"
            ref={ref}>
            <ControlBar>
                <ReplayControl seconds={10} order={2.2} />
                <ForwardControl seconds={10} order={3.2} />
                <PlaybackRateMenuButton rates={[2, 1.5, 1]} order={7.1} />
            </ControlBar>
            <BigPlayButton position="center" />
            <LoadingSpinner />
        </Player>
        {/* <VideoPlayerUpNext/> */}
    </div>
));

export default VideoPlayer;
