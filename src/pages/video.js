import React from 'react';
import VideoCardV2 from '../components/VideoCardV2/VideoCardV2';
import { connect } from 'react-redux';
import { pathChange, subheaderChange, videoCategory } from '../redux/actions/videoCategory';
import { clearState } from '../redux/actions/videoUpload';
import LoadingSkeleton from '../components/LoadingSkeleton/LoadingSkeleton';
import { getVideos } from '../services/video';
import { filterReset } from '../redux/actions/filterMedia';
import Layout from '../components/LayoutV2/LayoutV2';
class Video extends React.Component {
    state = {
        videos: this.props.videos$,
        page: 1,
        loadingVideos: false,
        total_pages: 1,
        showVideoPlayer: false,
        selectedVideo: null,
        sort_by: 'recently_added',
        loading: false
    };
    _isMounted = false;
    async componentDidMount() {
        this._isMounted = true;
        // this.getVideoList(false);
        window.addEventListener('scroll', this.handleOnScroll);
        this.props.setPath('/video');
        this.props.clearState();
    }
    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('scroll', this.handleOnScroll);
        this.props.setPath('');
        this.props.filterReset();
        this.props.videoCategory('trending');
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.category !== prevProps.category) {
            this.setState({ loading: true, page: 1 });
            this.getVideoList(false);
        }
        if (this.props.filterMedia !== prevProps.filterMedia && this.props.filtered) {
            this.setState({ videos: this.props.filterMedia });
        }
        if (this.props.filtered !== prevProps.filtered) {
            if (!this.props.filtered) {
                this.getVideoList(false);
            }
        }
    }

    handleOnScroll = () => {
        var scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        var scrollHeight =
            (document.documentElement && document.documentElement.scrollHeight) ||
            document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        if (scrolledToBottom) {
            this.loadMoreVideos();
        }
    };

    getVideoList = async (check) => {
        // this.setState({ loadingVideos: true });
        const { page, videos } = this.state;
        const { category } = this.props;
        const videoData = await getVideos(category, page);
        if (videoData.code === 'ABT0000') {
            let allVideos = [];
            if (check) {
                allVideos = videos.concat(videoData.videos.docs);
            } else {
                allVideos.push(...videoData.videos.docs);
            }
            if (this._isMounted) {
                this.setState({
                    videos: allVideos,
                    total_pages: parseInt(videoData.videos.pages),
                    loadingVideos: false,
                    loading: false
                });
            }
        }
    };

    loadMoreVideos = () => {
        const { page, total_pages, loadingVideos } = this.state;
        if (page <= total_pages && !loadingVideos) {
            this.setState((prevState) => {
                return { page: prevState.page + 1 };
            });
            this.getVideoList(true);
        }
    };
    render() {
        const { videos, loading } = this.state;
        return (
            <Layout>
                <div className="container-fluid">
                    {/** Videos Container  */}

                    <div className="d-flex video-container flex-wrap justify-content-center  mx-xl-5 mx-md-5">
                        {loading && <LoadingSkeleton type="video" />}
                        {videos.length !== 0 &&
                            videos.map((video, i) => (
                                // <VideoCard video={video} key={i} type="video" />
                                <VideoCardV2
                                    card={video}
                                    key={i}
                                    styleclass={'trending-video-wrapper'}
                                />
                            ))}
                    </div>
                </div>
            </Layout>
        );
    }
}
const mapStateToProps = (state) => ({
    category: state.videoCategory.videoCategory,
    filterMedia: state.filter.videos,
    filtered: state.filter.filter
});
const mapDispatchToProps = (dispatch) => ({
    setPath: (path) => dispatch(pathChange(path)),
    clearState: () => dispatch(clearState()),
    filterReset: () => dispatch(filterReset()),
    videoCategory: (type) => dispatch(videoCategory(type))
});

Video.getInitialProps = async (ctx) => {
    const videoData = await getVideos('trending', 1);
    return {
        videos$: videoData.videos.docs
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Video);
