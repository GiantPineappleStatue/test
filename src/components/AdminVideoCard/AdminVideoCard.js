import React from 'react';
import Img from '../UI/Img/Img';
import { Link } from 'react-router-dom';
import P1 from '../UI/P1/P1';
{
    /** Video Card Component  */
}
export default ({ video, type, className, changeHandler }) => {
    let url = '';
    if (type === 'audio') url = `/audio/album/${video._id}`;
    if (type === 'video') url = `/video/${video._id}`;
    if (type === 'image') url = `/image/album/${video._id}`;
    return (
        <div className={`video-card  ${className}`}>
            <Link to={url}>
                <Img
                    className="video-card__thumbnail  d-block postition-relative"
                    src={`https://artbot.mypinata.cloud/ipfs/${
                        video.thumbnailHash ? video.thumbnailHash : video.hash
                    }${type==='video'?'?img-width=300':'?img-width=200'}`}
                    alt="image"
                />
            </Link>
            {/* {video.maturityContent ? <div class="mat">Mature</div> : ''} */}
            <div className="video-card-title__rows px-3">
                <div className="d-flex justify-content-between text-white">
                    <div className="video-card-title__rows-left  text-truncate">
                        {video.title} &nbsp;
                    </div>
                </div>

                <div className="d-flex justify-content-between ">
                    <div className="video-card__min float-left" style={{ color: '#1BA6FF' }}>
                        {video.duration}
                    </div>
                    <div
                        className="video-card-title__right text-white text-capitalize "
                        style={{ overflow: 'hidden' }}>
                        <P1
                            className="mb-0 btn btn-primary btn-lg"
                            onClick={() => changeHandler(video._id, video.approved)}>
                            {video.approved ? 'UnApprove' : 'Approve'}
                        </P1>
                    </div>
                </div>
            </div>
        </div>
    );
};
