import React, { useState } from 'react';
// import SponseredVideo from '../components/dashboard/SponseredVideo';
// import Video from '../components/dashboard/Video';
// import VideoNavBar from '../components/dashboard/VideoNavBar';
import LoadingSkeleton from '../components/LoadingSkeleton/LoadingSkeleton';
import { getFeaturedVideos, getVideos } from '../services/video';
import { getAudios } from '../services/audio';
import { getImages } from '../services/image';
import { useDispatch } from 'react-redux';
import Layout from '../components/LayoutV2/LayoutV2';
// import { subheaderChange } from '../redux/actions/videoCategory';
// import WelcomeAlert from '../components/WelcomeAlert/WelcomeAlert';
// import FeaturedVideoSlider from '../components/FeaturedVideoSlider/FeaturedVideoSlider';
// import TrandingVideo from '../components/TrandingVideo/TrandingVideo';
// import TrandingAudion from '../components/TrandingAudio/TrandingAudio';
import VideoSlider from '../components/VideoSliderV2/VideoSliderV2';
import TredingVideosV2 from '../components/TrendingVideosV2/TrendingVideosV2';
import TrendingAudios from '../components/TrendingAudios/TrendingAudios';
function Index({ featuredVideos$, videos$, audios$ }) {
    const [featured_videos, setFeatured_Videos] = useState(featuredVideos$);
    const [videos, setVideos] = useState(videos$);
    const [audios, setAudios] = useState(audios$);
    const [images, setImages] = useState({
        docs: [],
        loading: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState({ type: '', category: 'trending', update: false });
    const [category1, setCategory1] = useState({ type: '', category: 'trending', update: false });
    const [category2, setCategory2] = useState({ type: '', category: 'trending', update: false });
    const dispatch = useDispatch();
    const getHomePageData = async (isCanceled) => {
        if (!isCanceled) {
            setIsLoading(true);
            await Promise.all([
                getFeaturedVideos(),
                getVideos('trending', 1, 20),
                getAudios('trending', 1, 10)
                // getImages('trending', 1, 10)
            ])
                .then((res) => {
                    if (!isCanceled) {
                        // setFeatured_Videos({ ...res[0].featured_video, loading: false });
                        // setVideos({ ...res[1].videos, loading: false });
                        // setAudios({ ...res[2].audios, loading: false });
                        // setImages({ ...res[3].images, loading: false });
                        setIsLoading(false);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const audioLoadHandler = async () => {
        if (+audios.page < audios.pages) {
            const data = await getAudios(category1.category, +audios.page + 1, 10);
            setAudios({
                ...data.audios,
                docs: [...audios.docs].concat(data.audios.docs),
                loading: false
            });
        }
    };
    const audioCategoryHandler = async (cat) => {
        setAudios({
            ...audios,
            loading: true
        });
        setCategory1(cat);
        const res = await getAudios(cat.category, 1, 10);

        setAudios({
            ...res.audios,
            loading: false
        });
    };
    const imageLoadHandler = async () => {
        if (+images.page < images.total) {
            const data = await getImages(category2.category, +images.page + 1, 10);
            setImages({
                ...data.images,
                docs: [...images.docs].concat(data.images.docs),
                loading: false
            });
        }
    };
    const imageCategoryHandler = async (cat) => {
        setImages({
            ...images,
            loading: true
        });
        setCategory2(cat);
        const res = await getImages(cat.category, 1, 10);
        setImages({
            ...res.images,
            loading: false
        });
    };
    const videoCategoryHandler = async (cat) => {
        setVideos({
            ...videos,
            loading: true
        });
        setCategory(cat);
        const res = await getVideos(cat.category, 1, 25);
        setVideos({
            ...res.videos,
            loading: false
        });
    };
    const featuredLoadHandler = async () => {
        if (+featured_videos.page < featured_videos.pages) {
            const data = await getFeaturedVideos(+featured_videos.page + 1);
            setImages({
                ...data.featured_video,
                docs: [...featured_videos.docs].concat(data.featured_video.docs),
                loading: false
            });
        }
    };
    const videoLoadHandler = async () => {
        if (+videos.page < videos.pages) {
            const data = await getVideos(category.category, +videos.page + 1, 20);
            setVideos({
                ...data.videos,
                loading: false
            });
        }
    };
    const videoLoadLessHandler = async () => {
        if (+videos.page > 0 && +videos.page <= videos.pages) {
            const data = await getVideos(
                category.category,
                +videos.page > 1 ? +videos.page - 1 : 1,
                20
            );
            setVideos({
                ...data.videos,
                loading: false
            });
        }
    };
    console.log(videos.docs);
    return (
        <Layout>
            {/* <WelcomeAlert /> */}
            <div className="row ml-0 mr-0 mt-sm-3">
                <div className="col-xl-12">
                    <div className="row row-full-height">
                        <div className="col-md-12">
                            <VideoSlider />
                            <TredingVideosV2 data={videos.docs} />
                            <TrendingAudios data={audios.docs} />
                            {/* <FeaturedVideoSlider
                                data={featured_videos.docs}
                                nextHandler={featuredLoadHandler}
                            /> */}
                            {isLoading && <LoadingSkeleton type="video" />}

                            {/* <div className="pt-2">
                                <div className="h-v-title2">
                                    <h3 className="h-v-title">Tranding Videos</h3>
                                </div>
                                <TrandingVideo
                                    nextHandler={videoLoadHandler}
                                    prevHandler={videoLoadLessHandler}
                                    data={videos.docs}
                                />
                            </div>

                            <div className="pt-2 pb-4">
                                <div className="h-v-titlea">
                                    <h3 className="h-v-title">Tranding Audio</h3>
                                </div>
                                <TrandingAudion nextHandler={audioLoadHandler} data={audios.docs} />
                            </div> */}

                            {/* {featured_videos.docs.length > 0 && (
                                <SponseredVideo
                                    data={featured_videos.docs}
                                    nextHandler={featuredLoadHandler}
                                />
                            )}
                            {videos.docs.length > 0 && (
                                <VideoNavBar
                                    type="video"
                                    changeHandler={videoCategoryHandler}
                                    currentCategory={category.category}
                                />
                            )}
                            {videos.docs.length > 0 && (
                                <Video
                                    loading={videos.loading}
                                    nextHandler={videoLoadHandler}
                                    prevHandler={videoLoadLessHandler}
                                    data={videos.docs}
                                    type="video"
                                />
                            )}

                            {audios.docs.length > 0 && (
                                <VideoNavBar
                                    type="audio"
                                    changeHandler={audioCategoryHandler}
                                    currentCategory={category1.category}
                                />
                            )}

                            {audios.docs.length > 0 && (
                                <Video
                                    loading={audios.loading}
                                    nextHandler={audioLoadHandler}
                                    data={audios.docs}
                                    type="audio"
                                />
                            )} */}

                            {/* {images.docs.length > 0 && (
								<VideoNavBar
									type="image"
									changeHandler={imageCategoryHandler}
									currentCategory={category2.category}
								/>
							)}
							{images.docs.length > 0 && (
								<Video
									nextHandler={imageLoadHandler}
									loading={images.loading}
									data={images.docs}
									type="image"
								/>
							)} */}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

Index.getInitialProps = async (ctx) => {
    const res = await Promise.all([
        getFeaturedVideos(),
        getVideos('trending', 1, 20),
        getAudios('trending', 1, 8)
        // getImages('trending', 1, 10)
    ]);
    return {
        featuredVideos$: { ...res[0].featured_video, loading: false },
        videos$: { ...res[1].videos, loading: false },
        audios$: { ...res[2].audios, loading: false }
    };
};
export default Index;
