import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import P1 from '../P1/P1';

const CircularProgress = ({ value, message }) => (
    <div
        style={{
            zIndex: 100,
            position: 'absolute',
            margin: 'auto',
            top: '30%',
            left: '40%'
        }}
        className="mobile-alert "
        tabIndex="10">
        <div style={{ width: '55%', margin: 'auto' }}>
            <CircularProgressbar
                className="m-3 w-75"
                value={value}
                text={`${value}%`}
                strokeWidth={3}
                styles={buildStyles({
                    pathTransitionDuration: 0.15
                })}
            />
        </div>
        <P1 className="text-white text-center m-2">{message}</P1>
    </div>
);
CircularProgress.defaultProps = {
    message: 'Please wait while the download is in progress...'
};
export default React.memo(CircularProgress);
