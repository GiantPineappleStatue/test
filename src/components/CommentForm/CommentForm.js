import React from 'react';
import Img from '../UI/Img/Img';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { connect } from 'react-redux';

const CommentForm = ({ value, changeHandler, submitHandler, type, user }) => (
    <div>
        <form onSubmit={submitHandler}>
            <div className="row pt-1">
                <div className="col-1">
                    <div className="">
                        <Img
                            style={{ objectFit: 'cover', width: '40px', height: '40px' }}
                            src={
                                user?.profile_photo
                                    ? `https://artbot.mypinata.cloud/ipfs/${user.profile_photo}?img-width=40&img-height=40`
                                    : '/img/user-comment.png'
                            }
                            className=" border-radius-20"
                        />
                    </div>
                </div>
                <div className="col-11 my-auto ">
                    <div className="mr-2 mr-sm-0">
                        <Input
                            type="text"
                            value={value}
                            onChange={changeHandler}
                            className="comment-input mx-4  mx-sm-0"
                            placeholder="Write Your Comment"
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <Button className="btn comment-cancel__btn btn-sm">Cancel</Button>
                <Button
                    className={`btn ${type === 'video' && 'bg-color-blue'} ${
                        type === 'audio' && 'bg-color-purple'
                    } ${
                        type === 'image' && 'bg-color-green border-green'
                    } btn-primary rounded-10 btn-sm`}
                    type="submit">
                    Comment
                </Button>
            </div>
        </form>
    </div>
);

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(CommentForm);
