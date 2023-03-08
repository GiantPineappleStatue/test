import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';

export default ({ src, hoverImg, text }) => (
    <div className="col-md-3 col-sm-6 pb-3 mb-3 mb-md-0">
        <div
            //border w-100 w-md-25 community-card pointer-cursor p-4 m-3
            className=" border h-100 w-100 w-md-25 community-card pointer-cursor p-3 m-2"
            onMouseOver={(e) => (e.currentTarget.firstElementChild.src = hoverImg)}
            onMouseOut={(e) => (e.currentTarget.firstElementChild.src = src)}>
            <Img src={src} className="d-block mx-auto py-5" />
            <P1 className="text-center font-weight-normal ">{text}</P1>
        </div>
    </div>
);
