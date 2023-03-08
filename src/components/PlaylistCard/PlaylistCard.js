import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import Icons from '../UI/ReactIcons/ReactIcons';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Span from '../UI/Span/Span';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { playlistIdChange } from '../../redux/actions/searchAction';
const PlaylistCard = ({ src, count, id, playlistId, type }) => {
    const history = useRouter();
    const dispatch = useDispatch();
    const onClickHandle = () => {
        if (id) {
            history.push({ pathname: `/${type === 'audio' ? 'audio/album' : type}/${id}` });
            dispatch(playlistIdChange(playlistId));
        }
    };
    return (
        <div className="playlist-card pointer" onClick={onClickHandle}>
            <Img src={`https://artbot.mypinata.cloud/ipfs/${src}?img-width=300`} className="playlist-card__img img-fluid" />
            <div className="playlist-card__right">
                <P1 className="mb-1 text-white h4">{count}</P1>
                <Icons.MdPlaylistAdd size={30} />
            </div>
            <div className="playlist-card__play">
                <P1 className="mb-0 ">
                    <PlayArrowIcon fontSize="large" />
                    &nbsp;<Span className="font-weight-bold">Play All</Span>
                </P1>
            </div>
        </div>
    );
};
PlaylistCard.defaultProps = {
    src:
        'https://edufolios.org/jsmithportfolio/wp-content/themes/edufolios/images/defaults/default-cover.gif'
};

export default PlaylistCard;
