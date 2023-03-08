import React from 'react';
import Rating from '@material-ui/lab/Rating/Rating';
import { Link } from 'react-router-dom';
import P1 from '../UI/P1/P1';
import Img from '../UI/Img/Img';
import ReactHtmlParser from 'react-html-parser';
import { timeago } from '../../utils/relativeTime';
export default function SearchCard({
    id,
    src,
    title,
    desc,
    duration,
    rating,
    category,
    uploadDate,
    tag,
    type
}) {
    let url = '';
    if (type === 'album') url = `/audio/album/${id}`;
    if (type === 'image_album') url = `/image/album/${id}`;
    if (type === 'video') url = `/video/${id}`;
    return (
        <Link to={url}>
            <div className="row search-card mb-2 no-gutters">
                <div className="col-md-3  search-card-left">
                    <Img src={src} className="w-100 h-100 search-card-left__img" />
                    {type === 'video' && (
                        <span className="search-card-left__duration">{duration}</span>
                    )}
                </div>
                <div className="col-md-9 search-card-right">
                    <div className="ml-2">
                        <div className="search-card-right__rating d-inline-flex">
                            <Rating
                                className="search-card-right__rating"
                                name="read-only"
                                size="small"
                                value={rating || 0}
                                readOnly
                            />
                            <small className="">{rating || 0}.0</small>
                        </div>
                        <P1 className="text-white mb-0 h5 font-weight-light search-card-right__title">
                            {title}
                        </P1>
                        <small className="text-white mb-2  font-weight-light search-card-right__category">
                            {category}{' '}
                            <span className="align-self-center mx-2 font-weight-bold">.</span>
                            {timeago(Date.parse(uploadDate))}
                        </small>
                        <div className="text-black-light mb-1 search-card-right__desc">
                            {desc && ReactHtmlParser(desc.substring(0, 200))}
                        </div>
                        {timeago(Date.parse(uploadDate)).includes('day ago') && (
                            <P1 className="search-card-right__tag text-white">{tag}</P1>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
