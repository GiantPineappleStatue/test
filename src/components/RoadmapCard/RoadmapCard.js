import React from 'react';
import P1 from '../UI/P1/P1';

export default ({ title, question, description, border, titleColor }) => (
    <div className={` ${border} p-5 m-2 font-16 h-100  text-center  roadmap-card `}>
        <P1 className={`font-weight-bold mb-0  ${titleColor}`}>{title}</P1>
        <div className="roadmap-card__line" />
        <P1 className="font-weight-bold  text-white pt-4 pb-1">{question}</P1>
        <P1 className="font-weight-normal  text-center ">{description} </P1>
    </div>
);
