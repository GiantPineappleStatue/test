import React from 'react';
import Carousel from 'react-multi-carousel';
import { getVideo } from '../../services/video';
import ButtonGroup from '../UI/ButtonGroupV2/ButtonGroupV2';
import VideoCardV2 from '../VideoCardV2/VideoCardV2';
import VideoModal from '../VideoModelV2/VideoModelV2';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1921 },
        items: 4
    },
    largeDesktop: {
        breakpoint: { max: 1920, min: 1400 },
        items: 4
    },
    laptops: {
        breakpoint: { max: 1399, min: 993 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 992, min: 576 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 575, min: 0 },
        items: 1
    }
};

const TredingVideosV2 = ({ data }) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [videoDetails, setVideoDetails] = React.useState({});

    const activeIdHandler = async (id) => {
        await getVideoDetails(id);
        setModalShow(true);
    };

    const getVideoDetails = async (videoId) => {
        const video = await getVideo(videoId);

        if (video.status === 200) {
            let response = video.data;

            setVideoDetails({
                relatedVideos: response.videos.docs,
                video: response.media,
                user: response.media.user,
                subscriberOnly: response.media.subscriberOnly
            });

            // this.getVideoComments();
            // this.checkIsFollowing();
        }
    };

    return (
        <>
            <div className="artbot-my-10 trending-video-slider">
                {modalShow && (
                    <VideoModal
                        video={videoDetails}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        handleClose={() => setModalShow(false)}
                    />
                )}
                <Carousel
                    arrows={true}
                    customButtonGroup={
                        <ButtonGroup heading="Trending Videos" linkHref={`/video`} />
                    }
                    responsive={responsive}
                    draggable={true}
                    autoPlay={false}
                    swipeable={true}>
                    {data?.map((card, index) => (
                        <VideoCardV2
                            activeIdHandler={activeIdHandler}
                            card={card}
                            key={index}
                            styleclass={'trending-video-wrapper'}
                        />
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default TredingVideosV2;
