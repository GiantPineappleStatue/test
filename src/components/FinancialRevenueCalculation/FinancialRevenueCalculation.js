import React from 'react';
import P1 from '../UI/P1/P1';

const FinancialRevenueCalculation = ({ leftText, rightText, show, type }) => {
    return (
        <div className="mt-3">
            {show && (
                <div className={`financial-revenue-calculation-upper ${type} text-white`}>
                    <P1 className="financial-revenue-calculation-upper__left pl-1 mb-0 text-capitalize">
                        {leftText}
                    </P1>
                    <P1 className="financial-revenue-calculation-upper__right pr-1 mb-0">
                        {rightText}
                    </P1>
                    <div className="d-flex justify-content-around align-items-center py-3">
                        <P1 className="mb-0 text-center">5$</P1>
                        <div
                            className={`financial-revenue-calculation-upper__middle--line ${type} `}
                        />
                        <P1 className="mb-0 text-center ">5</P1>
                    </div>
                </div>
            )}
            {show && (
                <div className="d-flex align-items-center mt-3 financial-revenue-calculation-middle">
                    <div className={`financial-revenue-calculation-middle__left ${type} `} />
                    <P1 className="mb-0 text-nowrap text-white">Revenue Calculation</P1>
                    <div className={`financial-revenue-calculation-middle__right ${type} `} />
                </div>
            )}
            <div className={`financial-revenue-calculation-bottom ${type} `}>
                {show && (
                    <div className=" text-white financial-revenue-calculation-bottom-upper p-2">
                        <div className="d-flex justify-content-around financial-revenue-calculation-bottom-upper__cost">
                            <P1 className="mb-0  text-lowercase">$0.01 ({leftText})</P1>
                            <P1 className="mb-0 mx-1">x</P1>
                            <P1 className="mb-0  text-lowercase">120 ({rightText})</P1>
                        </div>
                        <P1 className={`mb-0 text-center font-weight-bold ${type}`}>$1200</P1>
                    </div>
                )}
                <div className="px-1 financial-revenue-calculation-bottom-middle__topComment">
                    <div className="d-flex justify-content-between my-3 ">
                        <P1 className="mb-0 font-weight-bold">Crowd Funding</P1>
                        <P1 className="mb-0">$0.234</P1>
                    </div>
                    <div className="financial-revenue-calculation-bottom-middle__line" />
                </div>
                <div className="px-1 financial-revenue-calculation-bottom-middle__subtitling">
                    <div className="d-flex justify-content-between my-3 ">
                        <P1 className="mb-0 font-weight-bold">Subtitling</P1>
                        <P1 className="mb-0">$0.234</P1>
                    </div>
                    <div className="financial-revenue-calculation-bottom-middle__line" />
                </div>
                <div className="px-1 financial-revenue-calculation-bottom-middle__artbotCut">
                    <div className="d-flex justify-content-between my-3 ">
                        <P1 className="mb-0 font-weight-bold">Artbot Cut</P1>
                        <P1 className="mb-0">$0.234</P1>
                    </div>
                    <div className="financial-revenue-calculation-bottom-middle__line" />
                </div>
                <div
                    className={`px-1 financial-revenue-calculation-bottom-middle__revenue ${type}`}>
                    <div className="d-flex justify-content-between align-items-center py-3 ">
                        <P1 className="mb-0 font-weight-bold">Creator's Revenue</P1>
                        <P1 className="mb-0">$0.234</P1>
                    </div>
                </div>
            </div>
        </div>
    );
};
FinancialRevenueCalculation.defaultProps = {
    show: true
};
export default FinancialRevenueCalculation;
