import React from 'react';
import PropTypes from 'prop-types';
import P1 from '../UI/P1/P1';

function WatchAndRevenueCard({ value, title }) {
    return (
        <div className="watch-and-revenue-card">
            <P1 className="text-white mb-1 font-weight-bold">{value}</P1>
            <P1 className="text-white  mb-0">{title}</P1>
        </div>
    );
}

WatchAndRevenueCard.propTypes = {
    title: PropTypes.string.isRequired
};

export default WatchAndRevenueCard;
