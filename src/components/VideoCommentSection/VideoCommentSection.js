import React from 'react';
import P1 from '../UI/P1/P1';
import CommentCard from '../CommentCard/CommentCard';
import CommentForm from '../CommentForm/CommentForm';
import Icons from '../UI/ReactIcons/ReactIcons';
import clsx from 'clsx';
export default React.memo(({ comments, value, changeHandler, submitHandler, type }) => {
    const [show, setShow] = React.useState(false);
    return (
        <div className="container-fluid bg-primary-light py-3 px-4 comment">
            <div className="d-flex justify-content-between">
                <P1 className="text-white mb-0">{comments.length} Comments</P1>
                <Icons.BsArrowUpDown
                    className="pointer d-block d-sm-none"
                    onClick={() => setShow(!show)}
                />
            </div>
            {/** Comment Form */}
            <CommentForm
                value={value}
                type={type}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
            />
            {/** Comments */}
            <div className={`d-none d-sm-block ${clsx({ 'd-block': show })}`}>
                {comments &&
                    comments.map((comment, i) => <CommentCard key={i} comment={comment} />)}
            </div>
        </div>
    );
});
