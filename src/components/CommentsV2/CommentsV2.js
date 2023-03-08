import React from 'react';
import { useSelector } from 'react-redux';
import { DislikeIcon, LikeIcon } from '../../../public/svg';
import { getComments } from '../../services/util';

export default function CommentsV2({ videoId }) {
    const [comments, setComments] = React.useState([]);
    const user = useSelector((state) => state.auth.user);

    React.useState(async () => {
        const getComment = await getComments({
            mediaId: videoId,
            userId: user?._id || null
        });

        let commentResponse = [];
        if (getComment.status === 200) {
            commentResponse = getComment.data.comments;
        }
        setComments(commentResponse);
    }, []);

    return (
        <div className="comments-sec">
            <h2 className="heading">Comments</h2>
            {comments.map((item, index) => (
                <div key={index}>
                    <div className="comments-wrapper">
                        <div className="image-wrapper">
                            <img
                                src={'/images/Avatar.png'}
                                objectFit="contain"
                                // className="w-100"
                                // layout="fill"
                                alt="user"
                            />
                        </div>

                        <div className="comment-content">
                            <h3>{item.username}</h3>
                            <p>{item.comment}</p>
                            <div className="like-dislike-section">
                                <span>
                                    <LikeIcon /> 1{' '}
                                </span>
                                <span>
                                    <DislikeIcon /> 0{' '}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
