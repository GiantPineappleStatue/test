import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';

export default ({ icon, text, active, activeHandler, type, background }) => {
    let back = '';
    if (active) back = background;
    return (
        <div
            style={{ background: back }}
            className={`d-flex align-items-center financial-revenue-card pointer py-4 px-3 my-3  text-white `}>
            <Img src={require(`../../../img/${icon}.png`)} width="40" height="40" />
            <P1 className="mb-0 ml-4">{text}</P1>
            <div className="ml-auto">
                <Input
                    type="checkbox"
                    className="checkkk"
                    id={icon}
                    required={false}
                    checked={active}
                    onChange={(e) => activeHandler(!active)}
                />
                <Label htmlFor={icon} className="text-white d-inline font-weight-light  " />
            </div>
        </div>
    );
};
