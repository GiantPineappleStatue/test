import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import VideoCard from '../VideoCard/VideoCard';

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
    list.map((el, i) => {
        return <VideoCard video={el} key={i} />;
    });

const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const HorizontalScrollMenu = ({ data }) => {
    const [selected, setSelected] = React.useState('');

    const onSelect = (key) => {
        setSelected(key);
    };
    console.log(selected);
    return (
        <ScrollMenu
            data={Menu(data, selected)}
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            selected={selected}
            onSelect={onSelect}
        />
    );
};

export default HorizontalScrollMenu;
