import React, { useRef } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import VideoCard from '../VideoCard/VideoCard';
import ProfileAudioAndImageCard from '../ProfileAudioAndImageCard/ProfileAudioAndImageCard';
import clsx from 'clsx';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
import { useSelector } from 'react-redux';
import parser from 'react-html-parser';

export const Menus = (list, type, loading, home) => {
    if (loading)
        return Array.from({ length: 1 }).map((item, i) => (
            <LoadingSkeleton key={i} length={30} type={type} />
        ));
    else if (type === 'video') {
        const enenVal = [...list].filter((item, i) => (i + 1) % 2 === 0);
        const oddVal = [...list].filter((item, i) => (i + 1) % 2 !== 0);
        const result = oddVal.concat(enenVal);
        return result.map((el, i) => (
            <VideoCard
                className={clsx({ 'home-video-card': true, 'home-hover': !home })}
                video={el}
                key={i}
                type={type}
            />
        ));
    }
    return list.map((el, i) => {
        return (
            <ProfileAudioAndImageCard
                className={clsx({ 'home-audio-card': true, 'home-hover': !home })}
                video={el}
                key={i}
                type={type}
            />
        );
    });
};

const Video = (props) => {
    const home = useSelector((state) => state.videoCategory.home);
    const { data, type, nextHandler, loading, prevHandler } = props;
    const menu = Menus(data, type, loading, home);
    const video = useRef();

    const Arrow = ({ text, className, onClick = null }) => {
        return (
            <div
                onClick={onClick}
                className={`${className} text-white px-3 font-18 ${clsx({
                    'video-height': type === 'video',
                    'audio-height': type !== 'video'
                })}`}>
                {text}
                {/* {parser(text)} */}
            </div>
        );
    };
    const ArrowLeft = Arrow({
        text: '<',
        className: `arrow-prev mb-2 mr-1 mr-sm-2 bg-light-dark pointer `,
        onClick: prevHandler
    });
    const ArrowRight = Arrow({
        text: '>',
        className: 'arrow-next mb-2 ml-1 ml-sm-2 bg-light-dark pointer'
        // onClick: nextHandler
    });
    return (
        <div className="container-fluid1">
            <ScrollMenu
                transition={1}
                scrollToSelected={true}
                ref={video}
                data={menu}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                selected={0}
                wheel={false}
                innerWrapperStyle={{ borderRadius: 0 }}
                menuClass="svideoo"
                wrapperClass={`wcvideo ${clsx({ video: type === 'video' })}`}
                scrollBy={type === 'video' ? 3 : 5}
                alignCenter={false}
                wrapperStyle={{ marginTop: '0px' }}
                hideSingleArrow={true}
                arrowDisabledClass="scroll-menu-arrow--disabled"
                onLastItemVisible={nextHandler}
            />
        </div>
    );
};

export default Video;
