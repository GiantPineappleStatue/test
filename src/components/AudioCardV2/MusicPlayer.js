import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
export default function MusicPlayer() {
    return (
        <div>
            <div className="waves-wrapper img-fluid">
                <AudioPlayer
                    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                    showJumpControls={false}
                    showDownloadProgress={false}
                    showFilledProgress={false}
                    hasDefaultKeyBindings={false}
                />
            </div>
        </div>
    );
}
