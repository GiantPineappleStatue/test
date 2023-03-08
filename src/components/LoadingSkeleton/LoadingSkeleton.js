import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton/Skeleton';
export default function LoadingSkeleton({ type, length }) {
    let sty = { maxWidth: '290px', width: '300px' };
    if (type !== 'video') sty = { width: '200px', height: '200px' };
    return (
        <div className="d-flex flex-wrap justify-content-between">
            {Array.from({ length: length ? length : type === 'video' ? 16 : 18 }).map((a, i) => (
                <div className="m-3" style={sty} key={i}>
                    <Skeleton variant="rect" height={160} style={{ background: '#F5F5F5' }} />
                    <Skeleton style={{ background: '#F5F5F5' }} />
                    <Skeleton width="60%" style={{ background: '#F5F5F5' }} />
                </div>
            ))}
        </div>
    );
}
