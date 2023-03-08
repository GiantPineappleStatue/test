import React from 'react';
import P1 from '../UI/P1/P1';
import Img from '../UI/Img/Img';
import FinancialCard from '../FinancialCard/FinancialCard';

export default () => {
    return (
        <div id="financial-page-creator-user" className="row my-5">
            <div className="col-md-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="d-flex flex-column justify-content-around ">
                            <div className="financials-user-card ">
                                <P1 className="h4 font-weight-normal financials-user-card__title ">
                                    Creator
                                </P1>
                            </div>
                            <FinancialCard
                                src={'/img/downloads-1.png'}
                                text="Downloads"
                                desc="Creators will be able to make their content available for purchase/download, choosing their own price."
                                className="financials-card"
                            />
                            <FinancialCard
                                src={'/img/document-1.png'}
                                text="Licensing"
                                desc="Creators will be able to easily create their own licenses. Setting the terms by which others can license and use their content without having to get lawyers involved. This system will promote collaboration on an unprecedented scale."
                                className="financials-card"
                            />
                        </div>
                    </div>
                    <div className="col-md-6  mt-4 mt-sm-0">
                        <div className="d-flex flex-column justify-content-around ">
                            <div
                                className={`d-flex flex-column align-items-center  financials-card1-bg  rounded  `}>
                                <Img
                                    src={'/img/ADS-icon.png'}
                                    className="financials-card1-bg__img"
                                    width="60"
                                    height="60"
                                />
                                <div className="my-3 financials-card1__bar " />
                                <P1 className="text-white font-14 text-uppercase financials-card1__text ">
                                    ADS
                                </P1>
                                <P1 className="text-white font-14 text-center">
                                    All community curated content will immediately be eligible for
                                    ad revenue. ArtBot will have per minute rates. The longer
                                    someone views content, the longer the ad break at the end, which
                                    means more money in the pockets of creators.
                                </P1>
                            </div>
                            <FinancialCard
                                src={'/img/subc-1.png'}
                                text="Subscriptions"
                                desc="Creators will be able to set their own subscription policies with multiple tiers, prices, and rewards."
                                className="financials-card1"
                            />
                            <FinancialCard
                                src={'/img/sponsorship.png'}
                                text="Sponsorship"
                                desc="ArtBot will have a built in system where creators and advertisers can set up sponsorship deals. Creators and advertisers will decide on details themselves, and sponsored content will be labeled."
                                className="financials-card1"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-2">
                <div className="financials-vertical-line d-none d-md-block" />
            </div>
            <div className="col-md-5">
                <div className="row">
                    <div className="col-md-6 order-2 ">
                        <div className="d-flex flex-column justify-content-around ">
                            <div className="financials-user-card ">
                                <P1 className="h4 font-weight-normal financials-user-card__title ">
                                    Community
                                </P1>
                            </div>
                            {/* <FinancialCard
								src={'/img/top-comments-icon.png'}
								text="Top Comments"
								desc="The top 10 comments will receive a small portion of the content’s revenue."
								className="financials-card2"
							/> */}
                            <FinancialCard
                                src={'/img/Playlists-1.png'}
                                text="Playlists"
                                desc="Playlist creators will receive a small portion of the contents’ revenue whenever they are viewed through the playlist."
                                className="financials-card"
                            />
                            <FinancialCard
                                src={'/img/content-curation-1.png'}
                                text="Content Curation"
                                desc="All content will be curated by the community and curators will be compensated."
                                className="financials-card"
                            />
                        </div>
                    </div>
                    <div className="col-md-6 order-1 mt-3 mt-sm-0">
                        <div className={`  d-flex flex-column justify-content-around `}>
                            {/* <div className={` d-flex flex-column align-items-center  financials-card1-bg  rounded `}>
								<Img
									src={'/img/ADS-icon.png'}
									className="financials-card1-bg__img"
									width="60"
									height="60"
								/>
								<div className="my-3 financials-card1__bar" />
								<P1 className="text-white font-14 text-uppercase financials-card1__text  ">
									Watching ADS
								</P1>
								<P1 className="text-white font-14 text-center">
									Users will receive a small percentage of the ad cost when viewing and rating ads.
								</P1>
							</div> */}
                            <FinancialCard
                                src={'/img/sub-titling-1.png'}
                                text="Subtitling"
                                desc=" Users can create subtitles for content, and receive a portion of the content’s revenue whenever their subtitle is used."
                                className="financials-card3"
                            />
                            <FinancialCard
                                src={'/img/crowdfunding-1.png'}
                                text="CrowdFunding"
                                desc="Our plans for crowdfunding are revolutionary, but there are also regulatory hurdles and expenses that come along with it. These details are subject to change but we are confident in being able to make it work. With our crowdfunding system, creators will be able to submit pitches, and if the campaign is successful, backers will receive a portion of the content’s revenue when it’s uploaded to ArtBot."
                                className="financials-card3"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
