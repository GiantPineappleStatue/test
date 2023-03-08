import React from 'react';
import P1 from '../UI/P1/P1';
import Img from '../UI/Img/Img';
import Button from '../UI/Button/Button';
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentForm from '../CommentForm/CommentForm';
import { timeago } from '../../utils/relativeTime';
import VideoReportDialog from '../VideoReportDialog/VideoReportDialog';
const CommentCard = ({ comment }) => {
    const [reply, setReply] = React.useState(false);
    const [report, setReport] = React.useState(false);
    return (
        <div className="d-flex comment-card mb-1">
            {report && <VideoReportDialog content_type="comment" id={comment._id} />}
            <div style={{ width: 40, height: 60 }}>
                <Img
                    src={'/img/user-comment.png'}
                    className="img-fluid comment-card__img border-radius-20"
                />
            </div>
            <div className="d-flex flex-column ml-3 w-100">
                <div className="">
                    <P1 className="mb-0 mr-1 d-inline-block comment-card__name text-white">
                        {comment.userName}
                    </P1>{' '}
                    <small className="pt-1 comment-card__date">
                        {timeago(Date.parse(comment.timestamp))}
                    </small>
                </div>
                <P1 className="mb-0 color-white-light comment-card__comment font-weight-light ">
                    {comment.comment}{' '}
                </P1>
                <div className="d-flex  text-white">
                    {/* <Button className="btn p-0  comment-card__bottom">
						<ThumbUpAltIcon className="comment-card__thumbsUp" fontSize="small" color="inherit" />
						<span className="comment-card__thumbs-count" />
					</Button> */}
                    {/* <Button className="btn p-0 mx-2 comment-card__bottom" onClick={() => setReply(!reply)}>
						Reply
					</Button> */}
                    <Button
                        className="btn p-0 comment-card__bottom"
                        onClick={() => setReport(!report)}>
                        Report
                    </Button>
                </div>
                {reply && <CommentForm />}
            </div>
        </div>
    );
};
export default CommentCard;
