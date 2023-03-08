import React from 'react';
import VideoChannelInfo from '../../components/VideoChannelInfo/VideoChannelInfo';
import { connect } from 'react-redux';
import { videoEditUrl } from '../../redux/actions/videoCategory';
import { isFollow, addFollow, removeFollow, getComments, saveComment } from '../../services/util';
import { paymentProfile, selectSubscription } from '../../redux/actions/profile';
import CircularProgress from '../../components/UI/CircularProgress/CircularProgress';
import Player from '../../components/Player/Player';
import Layout from '../../components/Layout/Layout';
import { getOneProject, paymentProjectStripe } from '../../services/project';
import ProjectRevenue from '../../components/ProjectRevenue/ProjectRevenue';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import ProjectTabs from '../../components/ProjectTabs/ProjectTabs';
import VideoCommentSection from '../../components/VideoCommentSection/VideoCommentSection';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectSupport from '../../components/ProjectSupport/ProjectSupport';
import Dialog from '../../components/UI/Dialog/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import ProjectTeam from '../../components/ProjectTeam/ProjectTeam';
import AudioPlayerCard from '../../components/AudioPlayerCard/AudioPlayerCard';

class SingleAudioFunding extends React.Component {
    constructor(props) {
        super(props);
        this.player = React.createRef();
    }
    state = {
        following: false,
        tab: 'comments',
        videoAdmin: false,
        subscribe: false,
        videoUrl: '',
        modelOpen: false,
        progress: {
            show: false,
            value: 0
        },
        comments: [],
        commentInput: {
            value: '',
            touch: false,
            error: false
        },
        donateValue: {
            value: '',
            touch: false,
            error: false,
            validate: /^[1-9]\d*$/
        },
        model: {
            open: false,
            message: ''
        },
        amount: null
    };
    _Mounted = false;

    async componentDidMount() {
        this._Mounted = true;
        if (this._Mounted) {
            this.getVideoAdditionalData();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.video._id !== prevProps.video._id) {
            clearInterval(this.state.videoInterval);
            this.getVideoAdditionalData();
        }
    }

    componentWillUnmount() {
        this._Mounted = false;
        try {
            this.props.videoEditUrl('');
        } catch (error) {}
    }
    getVideoAdditionalData = async () => {
        this.checkIsFollowing();
        this.getVideoComments();
    };

    checkIsFollowing = async () => {
        const { userId, video } = this.props;
        const { user } = this.props;
        if (userId && user) {
            const response = await isFollow({
                following: user._id
            });
            if (response) {
                this.setState({ following: response.following });
            }
        }
    };
    addOrRemoveFollowing = async () => {
        const { following } = this.state;
        const { userId, user } = this.props;
        if (userId) {
            if (following) {
                const response = await removeFollow({
                    following: user._id
                });
                if (response.code === 'ABT0000') this.setState({ following: false });
            } else {
                const response = await addFollow({
                    following: user._id
                });
                if (response.code === 'ABT0000') this.setState({ following: true });
            }
        }
    };
    tabChangeHandler = (current) => {
        this.setState({ tab: current });
    };
    getVideoComments = async () => {
        const { video, user } = this.props;
        if (video) {
            const getComment = await getComments({
                mediaId: video._id,
                userId: user?._id
            });

            let commentResponse = [];
            if (getComment.status === 200) {
                commentResponse = getComment.data.comments;
            }
            this.setState({ comments: commentResponse });
        }
    };
    submitCommentHandler = async (event) => {
        const { userId, video } = this.props;
        event.preventDefault();
        if (userId) {
            const result = await saveComment({
                mediaId: video._id,
                parentId: '0',
                comment: this.state.commentInput.value
            });
            if (result.code === 'ABT0000') {
                this.getVideoComments();
                this.setState({ commentInput: { value: '', touch: false, error: false } });
            }
        }
    };
    onStripeSuccessHandler = async (token) => {
        const { donateValue } = this.state;
        const { video, user, userId } = this.props;
        const reqData = {};
        reqData.token = token;
        reqData.projectId = video._id;
        reqData.payTo = user._id;
        reqData.amount = donateValue.value;
        const res = await paymentProjectStripe(reqData);
        if (res.code === 'ABT0000') {
            this.setState({
                model: { open: true, message: res.message },
                amount: res.project.amountCalculated
            });
        } else {
            this.setState({ model: { open: true, message: res.message } });
        }
    };
    render() {
        const {
            following,
            progress,
            tab,
            comments,
            commentInput,
            donateValue,
            model,
            amount
        } = this.state;
        const { userId, relatedVideos, video, user } = this.props;
        const metaSEO = [
            {
                name: 'og:title',
                content: video.title
            },
            {
                name: 'og:description',
                content: video.description
            },
            {
                name: 'og:image',
                content: `https://artbot.mypinata.cloud/ipfs/${video.imageHash}?img-width=300`
            },
            {
                name: 'twitter:title',
                content: video.title
            },
            {
                name: 'twitter:description',
                content: video.description
            },
            {
                name: 'twitter:image',
                content: `https://artbot.mypinata.cloud/ipfs/${video.imageHash}?img-width=300`
            }
        ];
        return (
            <Layout meta={metaSEO}>
                <div className="container-fluid">
                    {model.open && (
                        <Dialog
                            className="custom-dialog "
                            open={model.open}
                            handleClose={() =>
                                this.setState({ model: { open: !model.open, message: '' } })
                            }
                            scroll="body">
                            <DialogContent dividers={true}>
                                <div className="row col-12 text-light" tabIndex={-1}>
                                    {model.message}
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                    {/** Video Play Component  */}
                    {progress.show && <CircularProgress value={progress.value} strokeWidth={4} />}
                    <div className="row ">
                        <div className="col-md-12 col-sm-12 col-xl-8 p-0">
                            {video && (
                                <AudioPlayerCard
                                    title={video.title}
                                    username={user.username}
                                    files={video.audios}
                                    thumbnailImg={video.imageHash}
                                />
                            )}

                            {/** Video Channel Info  */}
                            {video && (
                                <VideoChannelInfo
                                    title={video.title}
                                    rating={0}
                                    ratingCount={0}
                                    user={user}
                                    userId={userId ? userId._id : null}
                                    follow={following}
                                    followHandler={this.addOrRemoveFollowing}
                                    content_type="audio"
                                    id={video._id}
                                />
                            )}
                            <ProjectTabs
                                type="audio"
                                current={tab}
                                changeHandler={this.tabChangeHandler}
                            />
                            {video && tab === 'description' && (
                                <VideoDescription
                                    description={video.description}
                                    uploaded_date={video.createdAt}
                                />
                            )}

                            {video && tab === 'risk' && (
                                <VideoDescription
                                    description={video.riskAndChallanges}
                                    uploaded_date={video.createdAt}
                                />
                            )}
                            {/** Project Team Card */}
                            {video && video.team.length > 0 && tab === 'team' && (
                                <ProjectTeam team={video.team} />
                            )}

                            {/** Comment Section */}
                            {video && tab === 'comments' && (
                                <VideoCommentSection
                                    comments={comments}
                                    value={commentInput.value}
                                    changeHandler={(event) =>
                                        this.setState({
                                            commentInput: {
                                                value: event.target.value,
                                                touch: true,
                                                error: false
                                            }
                                        })
                                    }
                                    submitHandler={this.submitCommentHandler}
                                    type="audio"
                                />
                            )}
                        </div>
                        <div className="col-md-12 col-sm-12  col-xl-4  sidebar1">
                            {/** Side bar Auto Play Button */}
                            <ProjectRevenue project={video} amount={amount} />
                            {/** Project Support */}
                            <ProjectSupport
                                userId={userId}
                                donate={donateValue}
                                onSuccess={this.onStripeSuccessHandler}
                                donateChange={(e) =>
                                    this.setState({
                                        donateValue: {
                                            value: e.target.value,
                                            touch: true,
                                            error: !/^[1-9]\d*$/.test(e.target.value)
                                        }
                                    })
                                }
                            />
                            {/** Side bar related Videos */}
                            {relatedVideos.length > 0 &&
                                relatedVideos.map((item, i) => (
                                    <ProjectCard video={item} key={i} type="project" />
                                ))}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

SingleAudioFunding.getInitialProps = async (ctx) => {
    const response = await getOneProject(ctx.query.id, 'audio');
    return {
        id: response.project._id,
        relatedVideos: response.relatedProjects,
        video: response.project,
        user: response.project.userId
    };
};

const mapStateToProps = (state) => ({
    userId: state.auth.user,
    subscrPrice: state.profile.selectedSubscription,
    subscrMonth: state.profile.planDuration
});

export default connect(mapStateToProps, { videoEditUrl, selectSubscription, paymentProfile })(
    SingleAudioFunding
);
