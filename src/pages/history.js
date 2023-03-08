import React from 'react';
import { getHistory } from '../services/util';
import Layout from '../components/LayoutV2/LayoutV2';
import ProfileVideoCard from '../components/ProfileVideoCard/ProfileVideoCard';

class History extends React.Component {
    state = {
        history: this.props.history
    };
    async componentDidMount() {
        if (typeof window !== 'undefined') document.addEventListener('scroll', this.handleOnScroll);
    }
    componentWillUnmount() {
        if (typeof window !== 'undefined')
            document.removeEventListener('scroll', this.handleOnScroll);
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
    loadMoreVideos = async () => {
        const { history } = this.state;
        if (+history.page < history.pages) {
            const data = await getHistory(+history.page + 1);
            if (data.code === 'ABT0000')
                this.setState({
                    history: { ...data.history, docs: history.docs.concat([...data.history.docs]) }
                });
        }
    };
    render() {
        const { history } = this.state;
        return (
            <Layout title="History">
                <div className="container row">
                    <div className="col-md-1" />
                    <div className="col-md-10">
                        {history?.docs?.length > 0 &&
                            history?.docs
                                ?.filter((item) => item.media_id)
                                .map((item, i) => (
                                    <ProfileVideoCard
                                        className="search"
                                        key={i}
                                        video={item?.media_id}
                                        type={item?.media_id?.type}
                                    />
                                ))}
                    </div>
                    <div className="col-md-1" />
                </div>
            </Layout>
        );
    }
}

History.getInitialProps = async (ctx) => {
    const data = await getHistory();
    return {
        history: { ...data.history }
    };
};

export default History;
