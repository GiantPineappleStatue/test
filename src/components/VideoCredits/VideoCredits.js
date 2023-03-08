import React from 'react';
import P1 from '../UI/P1/P1';
import CreditItem from '../CreditItem/CreditItem';

function VideoCredits({ credits, username }) {
    const [showMore, handleShowMore] = React.useState(false);
    return (
        <div className="container-fluid video-credit py-2 px-4 bg-primary-dark ">
            <CreditItem
                index="Credits"
                username="Username"
                position="Position"
                percentage="Percentage"
            />

            <div className="video-credit__divider mb-1" />
            {credits.slice(0, showMore ? credits.length : 1).map((item, i) => (
                <CreditItem
                    key={i}
                    index={i + 1}
                    username={item.name}
                    position={item.position}
                    percentage={item?.percent}
                />
            ))}

            {credits.length === 0 && (
                <CreditItem username={username} position={username} percentage="100" />
            )}
            {credits.length > 0 && (
                <div className="d-flex justify-content-end ">
                    <P1
                        className="text-white mb-0 pointer"
                        onClick={() => handleShowMore(!showMore)}>
                        {!showMore ? 'SHOW MORE' : 'SHOW LESS'}
                    </P1>
                </div>
            )}
        </div>
    );
}

export default React.memo(VideoCredits);
