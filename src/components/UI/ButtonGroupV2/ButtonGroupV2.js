import React from 'react';
import Link from 'next/link';
const ButtonGroup = ({ heading, linkHref }) => {
    return (
        <>
            <div className="carousel-button-group">
                <h4 className="slider_heading">{heading}</h4>
                <Link href={linkHref}>
                    <a className="slider-link">See more</a>
                </Link>
            </div>
        </>
    );
};

export default ButtonGroup;
