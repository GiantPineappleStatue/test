import React from 'react';
import P1 from '../UI/P1/P1';

export default ({ border, title, value }) => {
    return (
        <div
            style={{ border: `1px solid ${border}` }}
            className="financial-revenue-value text-white ">
            <P1 className="mb-0 financial-revenue-value__title">{title} </P1>
            <P1 className=" financial-revenue-value__value">{value}%</P1>
        </div>
    );
};
