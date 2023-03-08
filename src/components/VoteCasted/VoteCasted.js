import React from 'react';
import P1 from '../UI/P1/P1';

const VoteCasted = ({ percentage, children, total }) => {
    const calPercentage = ((percentage / total) * 100).toFixed(0);
    return (
        <React.Fragment>
            <P1 className="mb-1">{children}</P1>
            <div className="progress project-revenue-progress">
                <div
                    className="progress-bar project-revenue-progress-bar"
                    role="progressbar"
                    aria-valuenow={calPercentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${calPercentage}%` }}>
                    {calPercentage}%
                </div>
            </div>
        </React.Fragment>
    );
};

export default VoteCasted;
