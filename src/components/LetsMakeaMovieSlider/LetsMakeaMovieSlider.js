import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCreatorCard from '../MovieCreatorCard/MovieCreatorCard';

const LetsMakeaMovieSlider = ({ slides, popupHandler }) => {
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
    const openPopup = (index) => {
        // setVideoPopup(!videoPopup);
        console.log(index);
    };
    const cards = slides.map((item, i) => (
        <MovieCreatorCard
            key={i}
            index={i}
            openPopup={popupHandler}
            thumbnailSrc={item.poster}
            videoSrc={item.src}
            title={item.title}
            desc={item.desc}
        />
    ));
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
                    {cards}
                </Carousel>
            </div>
        </>
    );
};

export default LetsMakeaMovieSlider;
