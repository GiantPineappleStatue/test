import React from 'react';
import { fancyTimeFormat } from '../../utils/fancyTimeFormat';
import WatchAndRevenueCard from '../WatchAndRevenueCard/WatchAndRevenueCard';
export default React.memo(({ mintuesWatched, revenue, type, views }) => {
    let title = 'Mintues Watched';
    if (type === 'audio') title = 'Mintues Listened';
    if (type === 'image') title = 'Views';
    return (
        <div className="container-fluid watch-and-revenue my-2 p-4">
            <div className="d-flex flex-wrap flex-sm-nowrap   text-center align-items-center">
                <WatchAndRevenueCard
                    title={title}
                    value={type !== 'image' ? fancyTimeFormat(mintuesWatched) : mintuesWatched}
                />
                {/* 
				<div className="watch-and-revenue__line" />
				<WatchAndRevenueCard title="Downloads" value="200" />

				<div className="watch-and-revenue__line d-none d-sm-block" />
				<WatchAndRevenueCard title="Subscriptions" value="300" />

				<div className="watch-and-revenue__line" />
				<WatchAndRevenueCard title="Followers" value="300" />*/}

                <div className="watch-and-revenue__line d-none d-sm-block" />

                <WatchAndRevenueCard title="Views" value={views} />
            </div>
            {/* <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between text-center align-items-center mt-4 mb-2">
				<WatchAndRevenueCard title="Playlist" value="300" />

				<div className="watch-and-revenue__line" />
				<WatchAndRevenueCard title="Shares" value="300" />

				<div className="watch-and-revenue__line d-none d-sm-block" />
				<WatchAndRevenueCard title="Revenue Earned" value={revenue + '$'} />

				<div className="watch-and-revenue__line" />
				<WatchAndRevenueCard title="Reports" value="300" />

				<div className="w-20" />
			</div> */}
        </div>
    );
});
