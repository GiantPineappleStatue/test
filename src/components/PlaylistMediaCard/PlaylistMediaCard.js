import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { playlistIdChange } from '../../redux/actions/searchAction';
const PlaylistMediaCard = ({
    type,
    active,
    src,
    duration,
    title,
    username,
    id,
    index,
    playlistId
}) => {
    const history = useRouter();
    const dispatch = useDispatch();
    return (
        <div
            onClick={() => {
                history.push({
                    pathname: `/${type === 'album' ? 'audio/album' : type}/${id}`
                });
                dispatch(playlistIdChange(playlistId));
            }}
            className={`playlist-video__body--card ${clsx({ active: active === id })}`}>
            <P1 className="my-auto text-white">
                {' '}
                {active === id ? <PlayArrowIcon fontSize="small" /> : index + 1}
            </P1>
            <div className="playlist-video__body--card--left">
                <Img src={`https://artbot.mypinata.cloud/ipfs/${src}?img-width=150`} className="img-fluid" />
                <P1 className="text-white">{duration}</P1>
            </div>
            <div className="playlist-video__body--card--right">
                <P1 className="mb-0 text-white playlist-video__body--card--right--title">
                    {title?.substring(0, 50)}
                    {title?.length > 50 ? '...' : ''}{' '}
                </P1>
                <P1 className="mb-0 playlist-video__body--card--right--user">{username}</P1>
            </div>
        </div>
    );
};

export default PlaylistMediaCard;
