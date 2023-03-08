import React, { useState, useEffect } from 'react';
import { clearState, update } from '../../../redux/actions/videoUpload';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { getVideo, editVideo } from '../../../services/video';
import EditContentForm from '../../../components/EditContentForm/EditContentForm';
import { ipfsUpload } from '../../../utils/ipfs';
import imgCompress from '../../../utils/imageCompression';
import Layout from '../../../components/LayoutV2/LayoutV2';
import { getClientSideToken, getServerSideToken, redirectUser } from '../../../utils/withAuth';
function VideoEdit({
    thumbnail,
    update,
    title,
    desc,
    tags,
    genre,
    user,
    videoThumbnailUrl,
    mediaData
}) {
    const history = useRouter();
    const [maturity, setMaturity] = useState(false);
    const [message, setMessage] = useState({ message: '', loading: false });
    const [videoUser, setVideoUser] = useState(null);
    const [subscriberOnly, setSubscriberOnly] = useState(false);
    useEffect(() => {
        let mount = true;
        async function getVideoDetails() {
            const media = mediaData;
            setMaturity(media.maturityContent);
            const data = {
                title: media.title,
                description: media.description,
                tags: media.tags.split(','),
                thumbnail: `https://artbot.mypinata.cloud/ipfs/${media.thumbnailHash}`
            };
            if (media.subscriberOnly) setSubscriberOnly(media.subscriberOnly);
            if (media.genre !== null) data.genre = media.genre.split(',');
            else data.genre = [];
            update(data);
            setVideoUser(media.user);
        }
        getVideoDetails();
        return () => {
            mount = false;
        };
    }, []);
    const submitHandler = async (e) => {
        e.preventDefault();
        if (videoUser._id !== user._id) return;
        if (process.browser) window.scrollTo(0, 0);
        setMessage({ message: 'Please wait while processing...', loading: true });
        let thumb = null;
        if (thumbnail.file) {
            const img = await imgCompress(thumbnail.file);
            const { ipfs, error } = await ipfsUpload();
            if (error) return;
            const imgUrl = await ipfs.add(img);
            thumb = imgUrl.path;
        }
        const data = {
            _id: Router.query.id,
            title: title,
            description: desc,
            genre: genre.join(','),
            tags: tags.join(','),
            thumbnailHash: thumb
                ? thumb
                : thumbnail.url.split('https://artbot.mypinata.cloud/ipfs/')[1],
            subscriberOnly: subscriberOnly
        };
        const responseData = await editVideo(data);
        if (responseData.data.code === 'ABT0000') {
            history.replace(`/profile/${user._id}`);
        }
    };
    return (
        <Layout>
            <EditContentForm
                submitHandler={submitHandler}
                type="Video"
                bgColor="bg-color-blue"
                message={message}
                maturity={maturity}
                setMaturity={setMaturity}
                subscriberOnly={subscriberOnly}
                setSubscriberOnly={setSubscriberOnly}
            />
        </Layout>
    );
}

VideoEdit.getInitialProps = async (ctx) => {
    const { req, res } = ctx;
    const auth = req ? getServerSideToken(req) : getClientSideToken();
    if (!auth._id) return redirectUser(res, '/');
    const response = await getVideo(ctx.query.id);
    const data = response.data;
    if (data.media.user._id !== auth._id) return redirectUser(res, '/');

    return { mediaData: data.media };
};

const mapStateToProps = (state) => ({
    thumbnail: state.videoUpload.albumThumbnail,
    videoThumbnailUrl: state.videoUpload.thumbnail,
    title: state.videoUpload.title.value,
    desc: state.videoUpload.description.value,
    tags: state.videoUpload.tags,
    genre: state.videoUpload.genres,
    user: state.auth.user
});
const mapDispatchToProps = (dispatch) => ({
    update: (data) => dispatch(update(data)),
    clear: () => dispatch(clearState())
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoEdit);
