import React from 'react';
import VideoCard from '../components/VideoCard/VideoCard';
import { connect } from 'react-redux';
import { pathChange, videoCategory } from '../redux/actions/videoCategory';
import { clearState } from '../redux/actions/videoUpload';
import LoadingSkeleton from '../components/LoadingSkeleton/LoadingSkeleton';
import { filterReset } from '../redux/actions/filterMedia';
import Layout from '../components/Layout/Layout';
import { getAllPlaylists } from '../services/util';
import PlaylistCard from '../components/PlaylistCard/PlaylistCard';

class AudioPlaylist extends React.Component {
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
            this.setState({ loading: true });
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
        const videoData = await getAllPlaylists('audio', page);
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

                    <div className="d-flex video-container flex-wrap justify-content-start  mx-xl-5 mx-md-5">
                        {loading && <LoadingSkeleton type="video" />}
                        {videos.length > 0 &&
                            videos.map((item, i) => (
                                <PlaylistCard
                                    type={item.type}
                                    playlistId={item._id}
                                    src={item?.list[0]?.thumbnailHash}
                                    count={item.list.length}
                                    id={item?.list[0]?._id}
                                    key={i}
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

AudioPlaylist.getInitialProps = async (ctx) => {
    const videoData = await getAllPlaylists('audio');
    return {
        videos$: videoData.playlists.docs
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AudioPlaylist);
