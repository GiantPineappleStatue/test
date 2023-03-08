import React, { useState } from 'react';
import P1 from '../UI/P1/P1';
import Img from '../UI/Img/Img';
import FinancialFunctionCard from '../FinancialFunctionCard/FinancialFunctionCard';
import FinancialRevenueCard from '../FinancialRevenueCard/FinancialRevenueCard';
import FinancialRevenueValue from '../FinancialRevenueValue/FinancialRevenueValue';
import Highcharts from 'highcharts/highstock';
import PieChart from 'highcharts-react-official';
import FinancialRevenueCalculation from '../FinancialRevenueCalculation/FinancialRevenueCalculation';
import FinancialChipCard from '../FinancialChipCard/FinancialChipCard';

const FinancialRevenueDistribution = () => {
    const [functionActive, setFunctionActive] = useState('');
    const [type, setType] = useState('video');
    const [crowdFunding, setCrowdFunding] = useState(false);
    const [topComment, setTopComment] = useState(false);
    const [subtitling, setSubtitling] = useState(false);
    const [playlist, setPlaylist] = useState(false);
    const [watchingAds, setWatchingAds] = useState(false);
    const [options, setOptions] = useState({
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
            //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            pointFormat: ''
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    connectorColor: 'silver'
                }
            }
        },
        series: [
            {
                name: 'Share',

                data: [
                    { name: 'Creator $0', y: 89, color: '#8cc73f' },
                    { name: 'Artbot $0', y: 11, color: '#28c5ff' }
                ]
            }
        ]
    });
    const menuChangeHandler = (value) => {
        setFunctionActive(value);
        if (value === 'ads-2') {
            setTopComment(true);
            setWatchingAds(true);
            setOptions({
                ...options,
                series: [
                    {
                        name: 'Share',
                        data: [
                            { name: 'Creator $0', y: 70, color: '#8cc73f' },
                            { name: 'Artbot $0', y: 10, color: '#28c5ff' },
                            { name: 'Crowdfunding $0', y: 10, color: '#FF5B5B' },
                            { name: 'Top Comments $0', y: 10, color: '#9467FE' }
                        ]
                    }
                ]
            });
        } else if (value === 'download') {
            setTopComment(true);

            setWatchingAds(false);
            setOptions({
                ...options,
                series: [
                    {
                        name: 'Share',
                        data: [
                            { name: 'Creator $0', y: 70, color: '#8cc73f' },
                            { name: 'Artbot $0', y: 10, color: '#28c5ff' },
                            { name: 'Top Comments $0', y: 10, color: '#9467FE' }
                        ]
                    }
                ]
            });
        } else if (value === 'subscriptions') {
            setTopComment(false);
            setWatchingAds(false);
            setOptions({
                ...options,
                series: [
                    {
                        name: 'Share',
                        data: [
                            { name: 'Creator $0', y: 90, color: '#8cc73f' },
                            { name: 'Artbot $0', y: 10, color: '#28c5ff' }
                        ]
                    }
                ]
            });
        } else if (value === 'sponsorship-1') {
            setTopComment(false);
            setWatchingAds(false);
            setOptions({
                ...options,
                series: [
                    {
                        name: 'Share',
                        data: [
                            { name: 'Creator $0', y: 90, color: '#8cc73f' },
                            { name: 'Artbot $0', y: 10, color: '#28c5ff' }
                        ]
                    }
                ]
            });
        }
    };
    return (
        <div className="financials-bottom row mt-5">
            <div className="col-md-3 financials-bottom-sidebar">
                {/** Creator Card  */}
                <div className="py-3  financials-bottom-sidebar__creator mt-4 mb-2 text-white  ">
                    <Img
                        src={require('../../../img/creator-1.png')}
                        className="mx-auto d-block mb-3 mt-2 financials-bottom-sidebar__creator--img"
                        width="50"
                        height="50"
                    />
                    <P1 className="text-center h5 font-weight-normal  mb-0">Creator</P1>
                    <P1 className="text-center mb-4">Revenue Options</P1>
                    <div className="d-flex justify-content-around">
                        <div
                            onClick={() => setType('video')}
                            className="rounded-10 border pointer py-2 px-4 financials-bottom-sidebar__creator--video">
                            VIDEO
                        </div>
                        <div
                            onClick={() => setType('audio')}
                            className="rounded-10 border pointer py-2 px-4 financials-bottom-sidebar__creator--audio">
                            AUDIO
                        </div>
                    </div>
                </div>
                {/** Functions */}
                <FinancialFunctionCard
                    type={type}
                    icon="ads-2"
                    text="Ads"
                    activeChangeHandler={menuChangeHandler}
                    active={functionActive}
                />
                {functionActive === 'ads-2' && (
                    <FinancialRevenueCalculation
                        type={type}
                        leftText={`${type} Length`}
                        rightText="Number of Views"
                    />
                )}
                <FinancialFunctionCard
                    type={type}
                    icon="download"
                    text="Downloads"
                    activeChangeHandler={menuChangeHandler}
                    active={functionActive}
                />
                {functionActive === 'download' && (
                    <FinancialRevenueCalculation
                        type={type}
                        leftText="Download Cost"
                        rightText="Number of downloads"
                    />
                )}

                <FinancialFunctionCard
                    type={type}
                    icon="subscriptions"
                    text="Subscriptions"
                    activeChangeHandler={menuChangeHandler}
                    active={functionActive}
                />
                {functionActive === 'subscriptions' && (
                    <FinancialRevenueCalculation
                        type={type}
                        leftText="Subscription Cost"
                        rightText="Number of subscriptions"
                    />
                )}

                <FinancialFunctionCard
                    type={type}
                    icon="sponsorship-1"
                    text="Sponsorship"
                    activeChangeHandler={menuChangeHandler}
                    active={functionActive}
                />
                {functionActive === 'sponsorship-1' && (
                    <FinancialRevenueCalculation type={type} show={false} />
                )}
                <FinancialFunctionCard
                    type={type}
                    icon="licencing"
                    text="Licencing"
                    activeChangeHandler={menuChangeHandler}
                    active={functionActive}
                />
                {functionActive === 'licencing' && (
                    <FinancialRevenueCalculation type={type} show={false} />
                )}
            </div>
            <div className="col-md-6 financials-bottom-center">
                <P1 className=" h3 text-center financials-bottom-center__title text-white font-weight-normal">
                    Revenue Distributions
                </P1>
                <div className="financials-bottom-center__bar" />
                <PieChart highcharts={Highcharts} options={options} />

                <div>
                    <div className="d-flex  justify-content-between">
                        <div>
                            <FinancialChipCard
                                background="#8CC73F"
                                title="Creator's Revenue"
                                value="$0.00(NaN%)"
                            />
                            <FinancialChipCard
                                background="#28C5FF"
                                title="Artbot Cut"
                                value="$0.00(NaN%)"
                            />
                        </div>
                        <div>
                            {crowdFunding && (
                                <FinancialChipCard
                                    background="#FF5B5B"
                                    title="Crowdfunding"
                                    value="$0.00(NaN%)"
                                />
                            )}
                            {subtitling && (
                                <FinancialChipCard
                                    background="#FFBA25"
                                    title="Subtitling"
                                    value="$0.00(NaN%)"
                                />
                            )}
                            {playlist && (
                                <FinancialChipCard
                                    background="#C412FF"
                                    title="Playlist"
                                    value="$0.00(NaN%)"
                                />
                            )}

                            {topComment && (
                                <FinancialChipCard
                                    background="#9467FE"
                                    title="Top Comments"
                                    value="$0.00(NaN%)"
                                />
                            )}

                            {watchingAds && (
                                <FinancialChipCard
                                    background="#0F64DB"
                                    title="Watching Ads"
                                    value="$0.00(NaN%)"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                {/** distributor */}
                <div className="py-3  financials-bottom-right-sidebar__distributor mt-4 mb-2 text-white  ">
                    <Img
                        src={require('../../../img/user-distribution.png')}
                        className="mx-auto d-block mt-5 financials-bottom-right-sidebar__distributor--img"
                        width="60"
                        height="60"
                    />
                    <P1 className="text-center h5 font-weight-normal  mt-2 mb-5">
                        User Distributions
                    </P1>
                </div>
                {/** Revenue Cards */}
                <FinancialRevenueCard
                    background="#ff5b5a"
                    icon="dollar"
                    text="Crowdfunding"
                    active={crowdFunding}
                    activeHandler={setCrowdFunding}
                />
                {crowdFunding && (
                    <FinancialRevenueValue
                        border="#ff5b5a"
                        title="Percentage owned by backers"
                        value="5"
                    />
                )}
                <FinancialRevenueCard
                    background="#ffba26"
                    icon="subtitling"
                    text="Subtitling"
                    active={subtitling}
                    activeHandler={setSubtitling}
                />
                {subtitling && (
                    <FinancialRevenueValue
                        border="#ffba26"
                        title="Percentage of downloads with subtitles"
                        value="5"
                    />
                )}
                <FinancialRevenueCard
                    background="#8f5aff"
                    icon="playlist"
                    text="Playlist"
                    active={playlist}
                    activeHandler={setPlaylist}
                />
                {playlist && (
                    <FinancialRevenueValue
                        border="#8f5aff"
                        title="Percentage of downloads with playlist"
                        value="5"
                    />
                )}

                <FinancialRevenueCard
                    background="#5a7dff"
                    icon="top-comments"
                    text="Top Comments"
                    active={topComment}
                    activeHandler={setTopComment}
                />
                {topComment && (
                    <FinancialRevenueValue
                        border="#8f5aff"
                        title="Percentage of downloads from Top Comments"
                        value="5"
                    />
                )}

                <FinancialRevenueCard
                    background="#18c641"
                    icon="watching-ads"
                    text="Watching Ads"
                    active={watchingAds}
                    activeHandler={setWatchingAds}
                />
                {watchingAds && (
                    <FinancialRevenueValue
                        border="#18c641"
                        title="Percentage of downloads from Watching Ads"
                        value="5"
                    />
                )}
            </div>
        </div>
    );
};
export default FinancialRevenueDistribution;
