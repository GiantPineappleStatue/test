import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';
import clsx from 'clsx';

export default ({ icon, text, active, activeChangeHandler, type }) => {
    return (
        <div
            className={`d-flex align-items-center pointer px-3 financial-function-card ${clsx({
                'financial-function-card__video text-white': active === icon && type === 'video',
                'financial-function-card__audio text-white': active === icon && type === 'audio'
            })} `}>
            <Img src={require(`../../../img/${icon}.png`)} width="40" height="40" />
            <P1 className="mb-0 font-weight-bold ml-4">{text}</P1>
            <div className="ml-auto">
                <Input
                    type="checkbox"
                    className="checkkk"
                    id={icon}
                    required={false}
                    checked={icon === active ? true : false}
                    onChange={(e) => activeChangeHandler(e.target.id)}
                />
                <Label htmlFor={icon} className="text-white d-inline font-weight-light  " />
            </div>
        </div>
    );
};
