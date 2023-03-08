import React from 'react';
import P1 from '../UI/P1/P1';
import clsx from 'clsx';

function ProjectTabs({ type, current, changeHandler }) {
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
                        'rounded-10 bg-color-blue': current === 'description' && type === 'video',
                        'rounded-10 bg-color-purple': current === 'description' && type === 'audio',
                        'rounded-10 bg-color-green': current === 'description' && type === 'image',
                        'border-right-light': current !== 'comments'
                    })}`}>
                    <P1 onClick={() => changeHandler('description')} className="mb-0 pointer py-1">
                        Description
                    </P1>
                </div>

                <div
                    className={`col-sm-3 col-6  ${clsx({
                        'rounded-10 bg-color-blue': current === 'risk' && type === 'video',
                        'rounded-10 bg-color-purple': current === 'risk' && type === 'audio',
                        'rounded-10 bg-color-green': current === 'risk' && type === 'image',
                        'border-right-light': current !== 'stats'
                    })}`}>
                    <P1 onClick={() => changeHandler('risk')} className="mb-0 pointer py-1">
                        Risk And Challanges
                    </P1>
                </div>
                <div
                    className={`col-sm-3 col-6 ${clsx({
                        'rounded-10 bg-color-blue': current === 'community' && type === 'video',
                        'rounded-10 bg-color-purple': current === 'community' && type === 'audio',
                        'rounded-10 bg-color-green': current === 'community' && type === 'image'
                    })}`}>
                    <P1 onClick={() => changeHandler('team')} className="mb-0 pointer py-1">
                        Team
                    </P1>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ProjectTabs);
