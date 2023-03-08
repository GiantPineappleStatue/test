import React from 'react';
import P1 from '../UI/P1/P1';
import clsx from 'clsx';
import VideoPlayer from '../UI/VideoPlayer/VideoPlayer';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
export default function LetsMakeVideoPopup({ show, setShow, src, poster }) {
    return (
        <ClickAwayListener onClickAway={() => setShow(false)}>
            <div
                style={{
                    zIndex: 100,
                    position: 'absolute',
                    left: '5%',
                    width: '90%'
                }}
                className={`mobile-alert vh-m-100  ${clsx({})} display-block `}
                tabIndex="10">
                <P1
                    onClick={() => setShow(false)}
                    className="text-white pointer mr-4 mt-2 close float-right">
                    &times;
                </P1>
                <div className="container1 vh-m-100 my-4">
                    <div className="d-flex flex-column vh-m-100 justify-content-center">
                        <div className="row my-2">
                            <div className="col-1" />
                            <div className="col-10">
                                <VideoPlayer src={src} poster={poster} />
                            </div>
                            <div className="col-1" />
                        </div>
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    );
}
