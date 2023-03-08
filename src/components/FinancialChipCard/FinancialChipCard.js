import React from 'react';
import P1 from '../UI/P1/P1';

export default function FinancialChipCard({ background, title, value }) {
    return (
        <div>
            <div className="d-flex mx-2 align-items-center">
                <div
                    className="financials--center__box"
                    style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '5px',
                        background: background
                    }}
                />
                <P1 className="text-white mb-0 ml-1">{title}</P1>
            </div>
            <P1 className="mb-0 ml-4">{value}</P1>
        </div>
    );
}
