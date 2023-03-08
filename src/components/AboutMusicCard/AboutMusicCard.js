import React from 'react';
import Span from '../UI/Span/Span';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';

export default ({ src, title, description, price, color, backgroundColor }) => (
    <div
        className="w-100 w-md-25 mr-md-2"
        style={{
            border: '1px solid #444052',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px'
        }}>
        <div className="px-5 py-3">
            <Img className="mx-auto " src={src} width="40" height="40" alt="youtube" />
            <P1 className={`pt-4 text-center mb-0 text-nowrap ${color}`}>{title}</P1>
            <P1 className={`${color} mb-0`}>{description}</P1>
        </div>
        <div className={`text-center mb-0 py-2 text-white ${backgroundColor}`}>
            <Span>${price}</Span>
        </div>
    </div>
);
