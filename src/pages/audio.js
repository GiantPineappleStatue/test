import React from 'react';
import { connect } from 'react-redux';
import { pathChange, subheaderChange, videoCategory } from '../redux/actions/videoCategory';
import { clearState } from '../redux/actions/videoUpload';
import AudioCard from '../components/AudioCardDetailV2/AudioCardDetailV2';
import LoadingSkeleton from '../components/LoadingSkeleton/LoadingSkeleton';
import { getAudios } from '../services/audio';
import { filterReset } from '../redux/actions/filterMedia';
import Layout from '../components/LayoutV2/LayoutV2';
class Audio extends React.Component {
    state = {
        audios: this.props.audios$,
        page: 1,
        loadingAudios: false,
        total_pages: 1,
        showVideoPlayer: false,
        selectedVideo: null,
        sort_by: 'recently_added',
        loading: false
    };
    _isMounted = false;
    componentDidMount() {
        this._isMounted = true;
        // this.getVideoList(false);
        window.addEventListener('scroll', this.handleOnScroll);
        this.props.setPath('/audio');
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
            this.setState({ audios: this.props.filterMedia });
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
            this.loadMoreaudios();
        }
    };

    getVideoList = async (check) => {
        // this.setState({ loadingAudios: true });
        const { page, audios } = this.state;
        const { category } = this.props;
        const audioData = await getAudios(category, page);
        let allAudios = [];
        if (audioData.code === 'ABT0000') {
            if (check) {
                allAudios = audios.concat(audioData.audios.docs);
            } else {
                allAudios.push(...audioData.audios.docs);
            }
            if (this._isMounted) {
                this.setState({
                    audios: allAudios,
                    total_pages: parseInt(audioData.audios.pages),
                    loadingAudios: false,
                    loading: false
                });
            }
        }
    };

    loadMoreaudios = () => {
        const { page, total_pages, loadingAudios } = this.state;
        if (page <= total_pages && !loadingAudios) {
            this.setState((prevState) => {
                return { page: prevState.page + 1 };
            });
            this.getVideoList(true);
        }
    };
    render() {
        const { audios, loading } = this.state;
        return (
            <Layout>
                <div className="container-fluid">
                    {/** Audio Container  */}
                    <div className="d-flex flex-wrap video-container justify-content-center justify-content-sm-start mx-xl-5 mx-md-5 ">
                        {loading && <LoadingSkeleton type="audio" />}
                        {!loading &&
                            audios.length !== 0 &&
                            audios.map((video, i) => (
                                // <ProfileAudioAndImageCard video={video} key={i} type="audio" />
                                <div className="" key={i}>
                                    <AudioCard card={video} />
                                </div>
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
Audio.getInitialProps = async (ctx) => {
    const audioData = await getAudios('trending', 1);
    return {
        audios$: audioData.audios.docs
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Audio);
