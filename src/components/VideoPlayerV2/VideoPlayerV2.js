import React from 'react';
import ReactPlayer from 'react-player';
import { AddToPlaylist, InfoIcon, Star, StarOutline } from '../../../public/svg';
import Image from 'next/image';
import BotButton from '../UI/BotButton/BotButton';
import VideoModal from '../VideoModelV2/VideoModelV2';
const VideoPlayerV2 = ({ title, time, artistName, status, views }) => {
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    return (
        <>
            <div className="player-wrapper">
                <ReactPlayer
                    url="/video.mp4"
                    playing={true}
                    volume={0}
                    muted={true}
                    loop={true}
                    height="100%"
                    width="100%"
                    className="react-player"
                />
                {/* <VideoModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    handleClose={() => setModalShow(false)}
                /> */}
                <div className="video-player-content">
                    <div className="views-status">
                        <span>{status}</span>
                        <span>{views}</span>
                    </div>
                    <div className="rating">
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <StarOutline />
                        <span> 4</span>
                    </div>
                    <h1 className="titile">{title}</h1>
                    <span className="time">{time}</span>
                    <div className="artist">
                        <Image src="/images/Artist.png" height="24" width="24" alt="artist" />
                        <span>{artistName}</span>
                    </div>
                    <div className="d-flex">
                        <BotButton
                            buttonText={'Add to Playlist'}
                            styleclass={'btn-light'}
                            variant={'light'}
                            icon={<AddToPlaylist />}
                            hasIcon={true}
                            size={'md'}></BotButton>
                        <BotButton
                            buttonText={'More Info'}
                            styleclass={'btn-dark bg-secondary info-btn'}
                            variant={'light'}
                            icon={<InfoIcon />}
                            hasIcon={true}
                            size={'md'}
                            onClick={handleShow}></BotButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoPlayerV2;
