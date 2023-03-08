import React from 'react';

export default function Progress({ value }) {
    return (
        <div className="progress">
            <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${value}%` }}>
                {value}%
            </div>
        </div>
    );
}
