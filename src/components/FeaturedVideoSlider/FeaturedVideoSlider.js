import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VideoComponent from '../Video/Video';
import VideoBeneath from '../Video/VideoBeneath/VideoBeneath';
import Router from 'next/router';

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img
            src={'/img/left-arrow.svg'}
            className={className}
            style={{ ...style, display: 'block', left: '0' }}
            onClick={onClick}
            alt="#"
        />
    );
}
function SampleNextArrow(props) {
    const { className, style, onClick, nextHandler, slider } = props;
    return (
        <img
            src={'/img/right-arrow.svg'}
            className={className}
            style={{ ...style, display: 'block', right: '0' }}
            onClick={() => {
                nextHandler();
                slider.current.slickNext();
            }}
            alt="#"
        />
    );
}

const FeaturedVideoSlider = (props) => {
    const slider = React.useRef();
    const { data, nextHandler } = props;
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3.2,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow slider={slider} nextHandler={nextHandler} />,
        prevArrow: <SamplePrevArrow />,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handleClickItem = (id) => {
        Router.push(`/video/${id}`);
    };

    return (
        <div
            className="slider-containers"
            style={{
                boxShadow: '  0px 44px 64px rgba(0, 0, 0, 0.5)'
            }}>
            <Slider ref={(c) => (slider.current = c)} {...settings}>
                {data.map((item, i) => (
                    <div onClick={() => handleClickItem(item._id)} key={i} className="d-slide p-2">
                        <VideoComponent imgHash={item.thumbnailHash} />
                        <VideoBeneath
                            title={item.title}
                            tagline={item.description}
                            ratingNumber={item.ratingCount}
                            rating={item.rating}
                            time={item.duration}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FeaturedVideoSlider;
