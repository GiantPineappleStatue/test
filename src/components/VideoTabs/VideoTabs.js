import React from 'react';
import P1 from '../UI/P1/P1';
import clsx from 'clsx';

function VideoTabs({ type, current, changeHandler }) {
    return (
        <div className="container-fluid d-none d-sm-block text-center mb-1 ">
            <div className="row align-items-center">
                <div
                    className={`col-sm-3 col-6 ${clsx({
                        'rounded-10 bg-color-blue': current === 'comments' && type === 'video',
                        'rounded-10 bg-color-purple': current === 'comments' && type === 'audio',
                        'rounded-10 bg-color-green': current === 'comments' && type === 'image',
                        'border-right-light': current !== 'credits'
                    })}`}>
                    <P1 onClick={() => changeHandler('comments')} className="mb-0 pointer py-1">
                        Comments
                    </P1>
                </div>
                <div
                    className={`col-sm-3 col-6 ${clsx({
                        'rounded-10 bg-color-blue': current === 'details' && type === 'video',
                        'rounded-10 bg-color-purple': current === 'details' && type === 'audio',
                        'rounded-10 bg-color-green': current === 'details' && type === 'image',
                        'border-right-light': current !== 'comments'
                    })}`}>
                    <P1 onClick={() => changeHandler('details')} className="mb-0 pointer py-1">
                        Details
                    </P1>
                </div>

                <div
                    className={`col-sm-3 col-6  ${clsx({
                        'rounded-10 bg-color-blue': current === 'credits' && type === 'video',
                        'rounded-10 bg-color-purple': current === 'credits' && type === 'audio',
                        'rounded-10 bg-color-green': current === 'credits' && type === 'image',
                        'border-right-light': current !== 'stats'
                    })}`}>
                    <P1 onClick={() => changeHandler('credits')} className="mb-0 pointer py-1">
                        Credits
                    </P1>
                </div>
                <div
                    className={`col-sm-3 col-6 ${clsx({
                        'rounded-10 bg-color-blue': current === 'stats' && type === 'video',
                        'rounded-10 bg-color-purple': current === 'stats' && type === 'audio',
                        'rounded-10 bg-color-green': current === 'stats' && type === 'image'
                    })}`}>
                    <P1 onClick={() => changeHandler('stats')} className="mb-0 pointer py-1">
                        Stats
                    </P1>
                </div>
            </div>
        </div>
    );
}

export default React.memo(VideoTabs);
