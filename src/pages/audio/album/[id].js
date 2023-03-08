import React, { Component } from 'react';
import P1 from '../../../components/UI/P1/P1';
// import RelatedVideoCard from '../../../components/RelatedVideoCard/RelatedVideoCard';
import AudioPlayerCard from '../../../components/AudioPlayerCard/AudioPlayerCard';
import VideoChannelInfo from '../../../components/VideoChannelInfo/VideoChannelInfo';
import WatchAndRevenue from '../../../components/WatchAndRevenue/WatchAndRevenue';
import VideoGenrTags from '../../../components/VideoGenrTags/VideoGenrTags';
import VideoDescription from '../../../components/VideoDescription/VideoDescription';
import VideoCommentSection from '../../../components/VideoCommentSection/VideoCommentSection';
import { connect } from 'react-redux';
import VideoTabs from '../../../components/VideoTabs/VideoTabs';
import VideoCredits from '../../../components/VideoCredits/VideoCredits';
import { videoEditUrl } from '../../../redux/actions/videoCategory';
import JSZip from 'jszip';
import {
    getComments,
    isFollow,
    addFollow,
    removeFollow,
    updateWatchTime,
    saveComment,
    mediaView,
    isSubscribe,
    paymentAdd,
    paymentSubscribe,
    getPlaylist,
    paymentStripeForDownload
} from '../../../services/util';
import { getAudio } from '../../../services/audio';
import ProfileAudioAndImageCard from '../../../components/ProfileAudioAndImageCard/ProfileAudioAndImageCard';
import { selectSubscription, paymentProfile } from '../../../redux/actions/profile';
import Dialog from '../../../components/UI/Dialog/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import axios from 'axios';
import FileDownload from 'file-saver';
import CircularProgress from '../../../components/UI/CircularProgress/CircularProgress';
import Switch from '@material-ui/core/Switch/Switch';
import Layout from '../../../components/LayoutV2/LayoutV2';
import VideoPlaylist from '../../../components/VideoPlaylist/VideoPlaylist';
class AudioAlbum extends Component {
    state = {
        // audioAlbum: this.props.audioAlbum$,
        // relatedAlbums: this.props.relatedAlbums$,
        following: false,
        comments: [],
        albumFiles: [],
        commentInput: {
            value: '',
            touch: false,
            error: false
        },
        publicAudio: false,
        tab: 'comments',
        modelOpen: false,
        paymentMessage: '',
        progress: { show: false, value: 0 },
        autoPlay: true,
        playlist: null
    };
    _Mounted = false;
    async componentDidMount() {
        this._Mounted = true;
        if (this._Mounted) {
            if (this.props.playlistId) {
                this.getPlaylistData();
            }
            this.getAudioAdditionalData();
        }
    }
    async getPlaylistData() {
        const data = await getPlaylist(this.props.playlistId);
        if (data.code === 'ABT0000') this.setState({ playlist: data.playlist });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.audioAlbum._id !== prevProps.audioAlbum._id) {
            clearInterval(this.state.videoInterval);
            this.getAudioAdditionalData();
            if (this.props.playlistId) {
                this.getPlaylistData();
            }
        }
    }
    componentWillUnmount() {
        this._Mounted = false;
        clearInterval(this.state.videoInterval);
        this.props.videoEditUrl('');
    }
    getAudioAdditionalData = async () => {
        this.getAudioComments();
        this.checkIsFollowing();
        await mediaView({ mediaId: this.props.audioAlbum._id });
    };
    captureVideoTime = async () => {
        const { audioAlbum } = this.props;
        const result = await updateWatchTime({
            id: audioAlbum._id,
            time: 1
        });
        if (result.status === 200) {
            this.setState({ secondsWatched: this.state.secondsWatched + 1 });
        }
    };

    audioStarted = () => {
        const interval = setInterval(this.captureVideoTime, 1000);
        this.setState({ videoInterval: interval });
    };
    audioEnded = () => {
        clearInterval(this.state.videoInterval);
        const { autoPlay } = this.state;
        const { relatedAlbums } = this.props;
        if (autoPlay)
            setTimeout(() => this.props.history.push(`/audio/album/${relatedAlbums[0]._id}`), 5000);
    };
    audioPause = () => {
        clearInterval(this.state.videoInterval);
    };
    getAudioList = async (id) => {
        const audioData = await getAudio(id, this.props.userId?._id);
        if (audioData && this._Mounted) {
            if (this.props.userId)
                if (audioData.album.user._id === this.props.userId._id)
                    this.props.videoEditUrl(`/audio/edit/${audioData.album._id}`);
            this.setState({ audioAlbum: audioData.album, relatedAlbums: audioData.audios.docs });
            this.getAudioComments();
            this.checkIsFollowing();
            await mediaView({ mediaId: id });
        }
    };
    getAudioComments = async () => {
        const { audioAlbum } = this.props;
        if (audioAlbum) {
            const getComment = await getComments({
                mediaId: audioAlbum._id,
                userId: audioAlbum.user._id
            });
            let commentResponse = [];
            if (getComment.status === 200) commentResponse = getComment.data.comments;
            this.setState({ comments: commentResponse, secondsWatched: audioAlbum.secondsWatched });
        }
    };
    checkIsFollowing = async () => {
        const { userId } = this.props;
        const { audioAlbum } = this.props;
        if (userId && audioAlbum) {
            const response = await isFollow({
                following: audioAlbum.user._id
            });
            if (response) this.setState({ following: response.following });
        }
    };
    addOrRemoveFollowing = async () => {
        const { following } = this.state;
        const { userId, audioAlbum } = this.props;
        if (userId) {
            if (following) {
                const response = await removeFollow({
                    following: audioAlbum.user._id
                });
                if (response.code === 'ABT0000') this.setState({ following: false });
            } else {
                const response = await addFollow({
                    following: audioAlbum.user._id
                });
                if (response.code === 'ABT0000') this.setState({ following: true });
            }
        }
    };
    submitCommentHandler = async (event) => {
        event.preventDefault();
        const { userId, userName } = this.props;
        event.preventDefault();
        if (userId) {
            const result = await saveComment({
                mediaId: this.props.audioAlbum._id,
                parentId: '0',
                comment: this.state.commentInput.value
            });
            if (result.code === 'ABT0000') {
                this.getAudioComments();
                this.setState({ commentInput: { value: '', touch: false, error: false } });
            }
        }
    };
    paymentonSuccessHandler = async (data, actions) => {
        const { subscrPrice, subscrMonth, audioAlbum } = this.props;
        let reqData = { ...data };
        reqData.mediaId = audioAlbum._id;
        reqData.subscribe = audioAlbum.user._id;
        reqData.planId = subscrPrice._id;
        reqData.planMonth = subscrMonth;
        const result = await paymentSubscribe(reqData);
        if (result.code === 'ABT0000') {
            const update = {
                ...audioAlbum,
                subscriberOnly: false,
                files: [...result.files]
            };
            this.setState({
                subscribe: true,
                albumFiles: [...result.files],
                audioAlbum: update,
                modelOpen: true,
                paymentMessage: 'Payment Transaction Success'
            });
            this.props.selectSubscription(null);
            this.props.paymentProfile(true);
        }
    };
    paymentonErrorHandler = (error) => {
        console.log(error);
        this.setState({
            modelOpen: !this.state.modelOpen,
            paymentMessage: 'Something went wrong during the payment process try again later.'
        });
    };
    downloadClickHandler = async (files) => {
        const { audioAlbum } = this.props;
        if (files.length === 0) return;
        const jsip = new JSZip();
        const ip = jsip.folder(audioAlbum.title);
        const response = new Promise((resolve, reject) => {
            files.forEach(async (item, index) => {
                const url = `https://artbot.mypinata.cloud/ipfs/${item.hash}`;
                const response = await axios({
                    method: 'GET',
                    url: url,
                    responseType: 'arraybuffer',
                    onDownloadProgress: (progress) => {
                        const total = progress.total;
                        const videoTotal = 100;
                        const videoDone = (progress.loaded * 100) / total;
                        const progressToShow = (videoDone * videoTotal) / 100;
                        console.log(progressToShow);
                        if (Math.floor(progressToShow) === 100)
                            this.setState({ progress: { show: false, value: 0 } });
                        else
                            this.setState({
                                progress: {
                                    show: true,
                                    value: Math.floor(progressToShow),
                                    message: `Please wait Download is being process ${index}/${audioAlbum.files.length}`
                                }
                            });
                    }
                });

                const buffer = Buffer.from(response.data, 'base64');
                const b = new File([buffer], item.filename.split('.mp3')[0], { type: 'audio/mp3' });
                ip.file(item.filename, b);
                if (index === files.length - 1) resolve();
            });
        });
        response.then(() => {
            jsip.generateAsync({ type: 'blob' }).then((content) => {
                FileDownload.saveAs(content);
            });
        });
    };
    stripeDownloadSuccesshandler = async (token) => {
        const { audioAlbum } = this.props;
        let reqData = {};
        reqData.token = token;
        reqData.mediaId = audioAlbum._id;
        const data = await paymentStripeForDownload(reqData);
        if (data.code === 'ABT0000') {
            this.setState({
                modelOpen: true,
                paymentMessage: 'Payment Transaction Success'
            });
            this.props.selectSubscription(null);
            this.props.paymentProfile(true);
            this.downloadClickHandler(data.files);
        }
    };
    render() {
        const {
            playlist,
            secondsWatched,
            following,
            commentInput,
            comments,
            tab,
            modelOpen,
            paymentMessage,
            progress,
            autoPlay,
            albumFiles
        } = this.state;
        const { userId, relatedAlbums, audioAlbum } = this.props;
        const metaSEO = [
            {
                name: 'og:title',
                content: audioAlbum.title
            },
            {
                name: 'og:description',
                content: audioAlbum.description
            },
            {
                name: 'og:image',
                content: audioAlbum.thumbnailHash
            },
            {
                name: 'twitter:title',
                content: audioAlbum.title
            },
            {
                name: 'twitter:description',
                content: audioAlbum.description
            },
            {
                name: 'twitter:image',
                content: audioAlbum.thumbnailHash
            }
        ];
        return (
            <Layout meta={metaSEO}>
                <div className="container-fluid">
                    {progress.show && (
                        <CircularProgress value={progress.value} message={progress.message} />
                    )}
                    {/** Audio Album Page */}
                    <Dialog
                        className="custom-dialog "
                        open={modelOpen}
                        handleClose={() => this.setState({ modelOpen: !modelOpen })}
                        scroll="body">
                        <DialogContent dividers={true}>
                            <div className="row col-12 text-light" tabIndex={-1}>
                                {paymentMessage}
                            </div>
                        </DialogContent>
                    </Dialog>
                    <div className="row custom-col-for-details-page">
                        <div className="col-md-12 col-lg-9 col-xl-10">
                            {/**  Audio Player Card */}
                            {audioAlbum && (
                                <AudioPlayerCard
                                    title={audioAlbum.title}
                                    username={audioAlbum.user.username}
                                    files={albumFiles.length ? albumFiles : audioAlbum.files}
                                    thumbnailImg={audioAlbum.thumbnailHash}
                                    onPlay={this.audioStarted}
                                    onPause={this.audioPause}
                                    onEnded={this.audioEnded}
                                    subscriberOnly={audioAlbum.subscriberOnly}
                                />
                            )}
                            {audioAlbum && audioAlbum.subscriberOnly && (
                                <div className="container-fluid my-1 watch-and-revenue">
                                    <P1 className="text-white py-2  d-block text-center mb-0">
                                        Audio is only available for Subscriber users.
                                    </P1>
                                </div>
                            )}
                            {/** Audio Channel Info  */}
                            {audioAlbum && (
                                <VideoChannelInfo
                                    title={audioAlbum.title}
                                    rating={audioAlbum.rating}
                                    ratingCount={audioAlbum.ratingCount}
                                    user={audioAlbum.user}
                                    userId={userId ? userId._id : null}
                                    addRating={this.addRating}
                                    follow={following}
                                    followHandler={this.addOrRemoveFollowing}
                                    content_type="audio"
                                    id={audioAlbum._id}
                                    downloadHandler={this.downloadClickHandler}
                                    price={audioAlbum.price}
                                    subscriberOnly={audioAlbum.subscriberOnly}
                                    onSuccess={this.paymentonSuccessHandler}
                                    onSuccessDownload={this.stripeDownloadSuccesshandler}
                                    onError={this.paymentonErrorHandler}
                                />
                            )}
                            {/** Audio Description */}
                            {audioAlbum && (
                                <VideoDescription
                                    description={audioAlbum.description}
                                    uploaded_date={audioAlbum.created_at}
                                />
                            )}
                            {/** Audio Tabs */}
                            {audioAlbum && (
                                <VideoTabs
                                    current={tab}
                                    type="audio"
                                    changeHandler={(current) => this.setState({ tab: current })}
                                />
                            )}

                            {/** Video Credits */}
                            {audioAlbum && tab === 'credits' && (
                                <VideoCredits
                                    username={audioAlbum.user.username}
                                    credits={audioAlbum.credits}
                                />
                            )}
                            {/** Mintues Watched and Revenue Section */}
                            {audioAlbum && tab === 'stats' && (
                                <WatchAndRevenue
                                    mintuesWatched={secondsWatched}
                                    views={audioAlbum.views}
                                    type="audio"
                                    revenue={0}
                                />
                            )}

                            {/** Audio Genre Tags and uploaded dates */}
                            {audioAlbum && tab === 'details' && (
                                <VideoGenrTags
                                    gern={audioAlbum.genre}
                                    tags={audioAlbum.tags}
                                    uploaded_by={audioAlbum.user.username}
                                    uploaded_date={audioAlbum.created_at}
                                    id={audioAlbum.user._id}
                                />
                            )}

                            {/** Comment Section */}
                            {audioAlbum && tab === 'comments' && (
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
                        {/** Audio Album Side Bar */}
                        <div className="col-md-12 col-lg-3 col-xl-2 sidebar1">
                            {/** Side bar Auto Play Button */}
                            <div className="d-flex w-100 justify-content-around">
                                <P1 className="text-white h5 font-weight-normal">Up next</P1>
                                <div className="d-flex align-items-start">
                                    <P1 className="text-uppercase mr-1 font-weight-bold mb-0">
                                        AutoPlay
                                    </P1>
                                    <Switch
                                        size="small"
                                        checked={autoPlay}
                                        onClick={(e) => this.setState({ autoPlay: !autoPlay })}
                                        color="secondary"
                                        className="text-danger"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </div>
                            </div>
                            {audioAlbum && playlist && (
                                <VideoPlaylist
                                    type="audio"
                                    playlist={playlist}
                                    active={audioAlbum._id}
                                />
                            )}
                            {/** Audio Card */}
                            {/* <P1 className="text-white h5 font-weight-normal">Albums</P1> */}

                            {relatedAlbums &&
                                relatedAlbums.map((item, i) => (
                                    <ProfileAudioAndImageCard
                                        className="audio-album"
                                        type="audio"
                                        video={item}
                                        key={i}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}
AudioAlbum.getInitialProps = async (ctx) => {
    const { req } = ctx;
    const headers = req ? req.headers : null;
    const audioData = await getAudio(ctx.query.id, headers);
    return {
        audioAlbum: audioData.album,
        relatedAlbums: audioData.audios.docs
    };
};

const mapStateToProps = (state) => ({
    userId: state.auth.user || null,
    userName: state.auth.user || null,
    subscrPrice: state.profile.selectedSubscription,
    subscrMonth: state.profile.planDuration,
    playlistId: state.search.playlistId
});

export default connect(mapStateToProps, { videoEditUrl, selectSubscription, paymentProfile })(
    AudioAlbum
);
