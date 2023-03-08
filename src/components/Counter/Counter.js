import React from 'react';
import Label from '../UI/Label/Label';
import Icons from '../UI/ReactIcons/ReactIcons';

export default function Counter({ title, className, value, onCounterUp, onCounterDown }) {
    // const [ value, setValue ] = React.useState(0);
    return (
        <div className={`d-flex flex-column ${className} `}>
            <Label className="text-white form-input__label mb-0">{title}</Label>
            <Icons.IoIosArrowUp
                size={20}
                color={'#fff'}
                className="mx-auto pointer"
                onClick={onCounterUp}
            />
            <Label className="text-white form-input__label mb-0 mx-auto">
                {value < 10 && '0'}
                {value}
            </Label>
            <Icons.IoIosArrowDown
                size={20}
                color={'#fff'}
                className="mx-auto pointer"
                onClick={onCounterDown}
            />
        </div>
    );
}
