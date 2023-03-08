import React, { useState } from 'react';
import P1 from '../UI/P1/P1';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Icons from '../UI/ReactIcons/ReactIcons';
import PlaylistMediaCard from '../PlaylistMediaCard/PlaylistMediaCard';
import Span from '../UI/Span/Span';

const VideoPlaylist = ({ playlist, active, type }) => {
    const [show, setShow] = useState(true);

    return (
        <div className="playlist-video">
            <div className="playlist-video__head d-flex justify-content-between align-items-center">
                <P1 className="mb-0 text-white font-weight-bold">
                    {playlist.title}&nbsp;
                    <Span className="font-weight-light">
                        {' '}
                        {playlist.list.findIndex((item) => item._id === active) + 1}/
                        {playlist.list.length}
                    </Span>
                </P1>
                <IconButton onClick={() => setShow((prev) => !prev)}>
                    {show ? (
                        <Icons.IoIosArrowUp color="white" size={30} />
                    ) : (
                        <Icons.IoIosArrowDown color="white" size={30} />
                    )}
                </IconButton>
            </div>
            <div className="playlist-video__body">
                {show &&
                    playlist?.list.map((item, i) => (
                        <PlaylistMediaCard
                            playlistId={playlist._id}
                            key={i}
                            type={item.type}
                            src={item.thumbnailHash}
                            duration={item.duration}
                            title={item.title}
                            username={item.username}
                            active={active}
                            index={i}
                            id={item._id}
                        />
                    ))}
            </div>
        </div>
    );
};

export default VideoPlaylist;
