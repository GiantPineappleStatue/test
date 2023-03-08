import React from 'react';
import P1 from '../UI/P1/P1';
import AudioPlaylistCard from '../AudioPlaylistCard/AudioPlaylistCard';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
const AudioPlayerCard = (props) => {
    const [audioIndex, setIndex] = React.useState(0);

    const handleChange = (i) => {
        setIndex(i);
        localStorage.setItem('audioIndex', i);
    };
    return (
        <React.Fragment>
            <div className="row no-gutters audio-card">
                <div className="col-md-4">
                    <div
                        className="audio-card__side-img"
                        style={{
                            backgroundImage: `url(https://artbot.mypinata.cloud/ipfs/${props.thumbnailImg}?img-width=300)`
                        }}
                    />
                </div>
                <div className="col-md-8">
                    <div className="audio-card__main-img">
                        {/** Three Dot Menu and Favoriate Icon */}
                        <div className="d-flex justify-content-end mb-5" />
                        <P1 className="h2  pt-3 text-center text-white">
                            {props.title && props.title}
                        </P1>
                        <P1 className="font-14 mb-1 text-center text-white">
                            {props?.files[audioIndex]?.title}
                        </P1>
                        <P1 className="h5 text-center mb-3 font-weight-normal ">
                            {props.username}
                        </P1>
                        <div className="d-flex justify-content-center py-5 ">
                            {/** https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3 */}
                            {props.files[0] !== null && (
                                <AudioPlayer
                                    autoPlay={false}
                                    onPlay={props.onPlay}
                                    onPause={props.onPause}
                                    onEnded={props.onEnded}
                                    src={
                                        props.files[0]
                                            ? `https://artbot.mypinata.cloud/ipfs/${props.files[audioIndex].hash}?stream=true`
                                            : null
                                    }
                                    // other props here
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex audio ">
                <div>
                    <P1
                        className=" m-0 mt-1 mb-1 text-white h5 text-rotation "
                        style={{ letterSpacing: '.4rem' }}>
                        TRACKS
                    </P1>
                    <div>
                        <div
                            className="mt-2"
                            style={{
                                width: '2px',
                                height: '90px',
                                background: '#b8b5bc',
                                margin: 'auto'
                            }}
                        />
                    </div>
                </div>
                <div className="container-fluid m-0 p-0 audio-playlist">
                    <div className="d-flex flex-column py-3 px-2">
                        {props.files.map((audio, i) => (
                            <AudioPlaylistCard
                                audio={audio}
                                key={i}
                                handleChange={() => handleChange(i)}
                                count={i}
                                thumbnailImg={props.thumbnailImg}
                                current={audioIndex}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AudioPlayerCard;
