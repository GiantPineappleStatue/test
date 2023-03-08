import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import clsx from 'clsx';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';

export default function MobileAlert() {
    const [show, setShow] = React.useState(null);
    const [showAgin, setShowAgain] = React.useState(false);
    const saveLocally = (value) => {
        if (value) localStorage.setItem('mobile-responsive-dialog', true);
        setShowAgain(value);
    };
    return (
        <div
            style={{
                zIndex: 100,
                position: 'absolute',
                margin: 'auto',
                top: '5%',
                left: '15%'
            }}
            className={`mobile-alert  ${clsx({
                'd-none': show === false || localStorage.getItem('mobile-responsive-dialog')
            })} display-block d-sm-none`}
            tabIndex="10">
            <div className="container ">
                <P1 onClick={() => setShow(false)} className="text-white pointer close float-right">
                    &times;
                </P1>

                <div className="d-flex flex-column justify-content-center">
                    <Img className="mx-auto my-5" src={require('../../../img/mobile.png')} />
                    <P1 className="h3 mb-0 text-white text-center">ArtBot is still in Beta</P1>
                    <P1 className=" mb-0 font-weight-bold text-light font-14 text-center">
                        and on mobile, is best viewed in
                    </P1>
                    <P1 className=" mb-0 text-light font-weight-bold font-14 text-center">
                        landscape mode (horizontally)
                    </P1>
                    <div className="d-flex mt-2 ml-4">
                        <Input
                            type="checkbox"
                            className="bg-transparent"
                            required={false}
                            onChange={() => saveLocally(!showAgin)}
                            id="checkbo1"
                        />
                        <Label
                            htmlFor="checkbo1"
                            className="text-white  d-inline font-weight-light ">
                            Don't show this message again
                        </Label>
                    </div>
                </div>
            </div>
        </div>
    );
}
