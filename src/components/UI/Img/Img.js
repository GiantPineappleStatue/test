import React from 'react';

const Img = ({ src, className, style, alt, width, height, onClick }) => (
    <img
        src={src}
        style={style}
        className={className}
        alt={alt}
        width={`${width}`}
        height={`${height}`}
        onClick={onClick}
    />
);

Img.defaultProps = {
    alt: 'artbot image'
};

export default Img;
