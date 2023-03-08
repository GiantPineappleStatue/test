import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';

export default ({ className, src, text, desc, id }) => (
    <div className={`d-flex  flex-column align-items-center mt-3  ${className}  rounded `}>
        <Img
            src={src}
            className={`${className + '__img'}`}
            width="60"
            height="60"
            style={{ objectFit: 'scale-down' }}
        />
        <div className={`my-3 ${className + '__bar'}`} />
        <P1 className={`text-white  font-14 text-uppercase ${className + '__text'} `}>{text}</P1>
        <P1 className={`text-white font-14 text-center d-block`}>{desc}</P1>
    </div>
);
