import React, { useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { useSelector } from 'react-redux';
// import ProfileVideoCard from '../ProfileVideoCard/ProfileVideoCard';
import VideoCard from '../VideoCard/VideoCard';
import parser from 'react-html-parser';
export const Menus = (list, home) =>
    list.map((el, i) => {
        // return <ProfileVideoCard key={i} className="featured-videos" video={el} type="video" />;
        return <VideoCard key={i} className="home-featured-videos" video={el} type="video" />;
    });

const Arrow = ({ text, className, onClick = null }) => {
    return (
        <div onClick={onClick} className={`${className} px-3 text-white home-sponsored-arrow `}>
            {text}
            {/* {parser(text)} */}
        </div>
    );
};

function SponseredVideo(props) {
    const home = useSelector((state) => state.videoCategory.home);
    const { data, nextHandler } = props;
    const [selected, setSelected] = useState(0);

    const menu = Menus(data, home);

    const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev mr-2 bg-light-dark pointer' });
    const ArrowRight = Arrow({
        text: '>',
        className: 'arrow-next ml-2 bg-light-dark pointer',
        onClick: nextHandler
    });
    return (
        <div className="container-fluid px-0  mt-5 mt-lg-0">
            <ScrollMenu
                transition={1}
                data={menu}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                selected={selected}
                onSelect={(e) => setSelected(e)}
                wheel={false}
                innerWrapperStyle={{ borderRadius: 0 }}
                menuClass="fvideo"
                scrollBy={2}
                alignCenter={false}
                hideSingleArrow={true}
                arrowDisabledClass="scroll-menu-arrow--disabled"
            />
        </div>
    );
}

export default SponseredVideo;
