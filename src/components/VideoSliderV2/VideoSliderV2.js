import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import VideoPlayer from '../VideoPlayerV2/VideoPlayerV2';

const VideoSliderV2 = () => {
    const sliderItems = [
        {
            title: 'Buzzlightyear Episode 4',
            type: 'Health & Wellness',
            time: '1h 33m',
            artistName: 'Ryan O’Brian',
            status: 'Live',
            views: '345 Views'
        },
        {
            title: 'Buzzlightyear Episode 4',
            type: 'wine',
            time: '1h 33m',
            artistName: 'Ryan O’Brian',
            status: 'Live',
            views: '345 Views'
        },
        {
            title: 'Buzzlightyear Episode 4',
            type: 'Snack Food',
            time: '1h 33m',
            artistName: 'Ryan O’Brian',
            status: 'Live',
            views: '345 Views'
        },
        {
            title: 'Buzzlightyear Episode 4',
            type: 'slide 4',
            time: '1h 33m',
            artistName: 'Ryan O’Brian',
            status: 'Live',
            views: '345 Views'
        },
        {
            title: 'Buzzlightyear Episode 4',
            type: 'Tag Name',
            time: '1h 33m',
            artistName: 'Ryan O’Brian',
            status: 'Live',
            views: '345 Views'
        },
        {
            title: 'Buzzlightyear Episode 4',
            type: 'try Before you buy',
            time: '1h 33m',
            artistName: 'Ryan O’Brian',
            status: 'Live',
            views: '345 Views'
        }
    ];

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1400 },
            items: 1,
            partialVisibilityGutter: 450
        },
        desktop: {
            breakpoint: { max: 1399, min: 768 },
            items: 1,
            partialVisibilityGutter: 100
        },
        tablet: {
            breakpoint: { max: 767, min: 576 },
            items: 1,
            partialVisibilityGutter: 50
        },
        mobile: {
            breakpoint: { max: 575, min: 501 },
            items: 1,
            partialVisibilityGutter: 50
        },
        smallMobile: {
            breakpoint: { max: 500, min: 0 },
            items: 1,
            partialVisibilityGutter: 0
        }
    };
    return (
        <>
            <div className="mb-60 home-banner-slider">
                <Carousel
                    partialVisible={true}
                    arrows={true}
                    responsive={responsive}
                    draggable={true}
                    autoPlay={false}
                    swipeable={true}>
                    {sliderItems?.map((card, index) => (
                        <div key={index}>
                            <VideoPlayer
                                title={card.title}
                                type={card.type}
                                time={card.time}
                                artistName={card.artistName}
                                status={card.status}
                                views={card.views}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default VideoSliderV2;
