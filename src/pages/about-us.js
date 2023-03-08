import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import Img from '../components/UI/Img/Img';
import Span from '../components/UI/Span/Span';
import P1 from '../components/UI/P1/P1';
import CommunityCard from '../components/CommunityCard/CommunityCard';
import RoadmapCard from '../components/RoadmapCard/RoadmapCard';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import AboutUserCard from '../components/AboutUserCard/AboutUserCard';
import VideoPlayer from '../components/UI/VideoPlayer/VideoPlayer';
import Layout from '../components/LayoutV2/LayoutV2';
// import AboutMusicSection from '../../../components/AboutMusicSection/AboutMusicSection';
// import AboutProjectRevenueSection from '../../../components/AboutProjectRevenueSection/AboutProjectRevenueSection';

const creator = [
    {
        src: '/img/revenue-options-white.png',
        hoverImg: '/img/revenue-options-blue.png',
        text: 'Better, transparent revenue options'
    },
    {
        src: '/img/networking-white.png',
        hoverImg: '/img/networking-blue.png',
        text: 'Networking options to easily collaborate with other creators'
    },
    {
        src: '/img/distribution-white.png',
        hoverImg: '/img/distribution-blue.png',
        text: 'Networking options to easily collaborate with other creators'
    },
    {
        src: '/img/crowdfunding-white.png',
        hoverImg: '/img/crowdfunding-blue.png',
        text: 'Unique licensing and crowdfunding system'
    },
    {
        src: '/img/curation-white.png',
        hoverImg: '/img/curation-blue.png',
        text: 'Full monetization upon community curation'
    },
    {
        src: '/img/consolidated-white.png',
        hoverImg: '/img/consolidated-blue.png',
        text: 'Better, transparent revenue options'
    },
    {
        src: '/img/streamline-white.png',
        hoverImg: '/img/streamline-blue.png',
        text: 'Better, transparent revenue options'
    }
];
const consumer = [
    {
        src: '/img/community1-icon-white.png',
        hoverImg: '/img/community1-icon-blue.png',
        text:
            'Multiple revenue options like watching ads, curating content, evaluating reports and commenting'
    },
    {
        src: '/img/blacklist-white.png',
        hoverImg: '/img/blacklist-blue.png',
        text: 'Customizable ad experience, blacklist and whitelist tags and advertisers'
    },
    {
        src: '/img/demographic-white.png',
        hoverImg: '/img/demographic-blue.png',
        text: 'Choose which demographic data advertisers can access'
    },
    {
        src: '/img/transport-white.png',
        hoverImg: '/img/transport-blue.png',
        text: 'Better transparent revenue options'
    }
];
const advertiser = [
    {
        src: '/img/community1-icon-white.png',
        hoverImg: '/img/community1-icon-blue.png',
        text: 'Demographic targeting options offered at no additional cost'
    },
    {
        src: '/img/community2-icon-white.png',
        hoverImg: '/img/community2-icon-blue.png',
        text: 'Target opt-in groups of users'
    },
    {
        src: '/img/community3-icon-white.png',
        hoverImg: '/img/community3-icon-blue.png',
        text: 'Transparent per second per view ad rates'
    },
    {
        src: '/img/community4-icon-white.png',
        hoverImg: '/img/community4-icon-blue.png',
        text: 'Bypass ad-block'
    },
    {
        src: '/img/community5-icon-white.png',
        hoverImg: '/img/community5-icon-blue.png',
        text: 'Transfer ad time'
    }
];
const AboutUs = () => {
    const [user, setUserNavigation] = React.useState('kyle');
    const [community, setCommunity] = React.useState('creator');
    const [email, setEmail] = React.useState({ value: '', touch: false, error: false });
    const onSubmitNewsLetter = (event) => {
        event.preventDefault();
    };

    return (
        <Layout title="About us">
            <div className="container-fluid">
                <div className="container">
                    <Typography
                        variant="h4"
                        component="h2"
                        className="text-center pt-2 pb-4 text-white">
                        Revolutionary Multimedia Platform
                    </Typography>
                    {/** About Us Top Video and Revenue */}
                    <div className="row">
                        <div className="col-md-2" />
                        <div className="col-12  col-md-8 col-xl-8">
                            <VideoPlayer
                                src={
                                    'https://gateway.pinata.cloud/ipfs/QmbjgQW8BD3wXEjvnW9ji7KBqEQmPJrvVCR1nG93KvjwL1'
                                }
                                poster={'/img/mainPageVideoThumbnail.png'}
                            />
                        </div>
                        <div className="col-md-2" />

                        {/* Commented Because Of Production Level */}
                        {/* <div className="col-12  col-md-4 col-xl-4 pt-2 pt-sm-0">
						<AboutProjectRevenueSection />
					</div> */}
                    </div>
                </div>
                {/** Music Cards   */}
                {/* <AboutMusicSection /> */}

                {/** ArtBot Company info */}
                <div className="container mt-3 ">
                    <div className="row about-artbot">
                        <div className="col-12 col-sm-12 col-md-6 py-5">
                            <Typography
                                variant="h5"
                                component="h4"
                                className="text-light about-artbot__title pt-3">
                                What is ArtBot?
                            </Typography>
                            <P1 className="mt-2 paragraph font-18 about-artbot__desc">
                                ArtBot is a revolutionary multimedia platform committed to creating
                                the ideal democratic market for creators, consumers, and
                                advertisers. By embracing full transparency and technologies like
                                InterPlanetary File System (IPFS), we are empowering our users to
                                directly shape the independent multimedia market by offering
                                superior revenue options and smarter consolidated services.
                            </P1>
                            <P1 className="pb-5 paragraph font-18 about-artbot__desc">
                                We at ArtBot believe that advertising will remain the best way to
                                monetize content on a grand scale. While many are rightfully fed up
                                with the current state of online advertising, ArtBot will create a
                                better system with the help of our community. By offering highly
                                customizable ad preferences, ArtBot will create the most enjoyable
                                ad experience while always respecting our users’ privacy.
                            </P1>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                            <div className="floating-animation mt-sm-5 about-artbot__img">
                                <Img
                                    src={'/img/what-is-artbot-img.png'}
                                    className="img-fluid"
                                    alt="artbot"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/** user stories */}
                <div className="container-fluid">
                    <Typography variant="h5" component="h5" className="text-center text-white">
                        User Stories
                    </Typography>
                    <div className="d-flex p-2 align-items-center justify-content-center">
                        <P1
                            className={`${
                                user === 'kyle' ? 'bg-color-purple ' : 'color-purple'
                            } p-2 rounded-top pointer-cursor h5`}
                            onClick={() => setUserNavigation('kyle')}>
                            Kyle
                        </P1>
                        <Span className="px-2 color-grey-light">-</Span>
                        <P1
                            className={` ${
                                user === 'allie' ? 'bg-color-blue' : 'color-blue'
                            } p-2 rounded-top pointer-cursor h5`}
                            onClick={() => setUserNavigation('allie')}>
                            Allie
                        </P1>
                        <Span className="px-2 color-grey-light">-</Span>
                        <P1
                            className={` ${
                                user === 'john' ? 'bg-color-green' : 'color-green'
                            } p-2 rounded-top  pointer-cursor h5`}
                            onClick={() => setUserNavigation('john')}>
                            John
                        </P1>
                        <Span className="px-2 color-grey-light">-</Span>
                        <P1
                            className={` ${
                                user === 'sara' ? 'bg-light text-muted' : 'color-light '
                            } p-2 rounded-top pointer-cursor h5`}
                            onClick={() => setUserNavigation('sara')}>
                            Sara
                        </P1>
                    </div>
                    <div id="kyle-tab " className={`${user === 'kyle' ? 'd-block' : 'd-none'}`}>
                        <div className="row  no-gutters">
                            <div className="col-1" />
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/guitar.png'}
                                    src2={'/img/purple-dot-user-stories.png'}
                                    text="Kyle is a guitarist"
                                    line={true}
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/band.png'}
                                    text=" He wants to start a band"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/upload.png'}
                                    text="Kyle uploads his original songs to Artbot"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/earning.png'}
                                    text="He knows exactly how much he’ll earn for every minute someone listens to his music"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/profile.png'}
                                    text="Kyle lists on his profile that he is looking to join or start a band"
                                    line={false}
                                    rightLine={true}
                                />
                            </div>
                            <div className="col-1" />
                        </div>
                        <div className="row  no-gutters">
                            <div className="col-1" />
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/songs.png'}
                                    text="Soon they have 2 original songs that they upload to ArtBot"
                                    leftLine={true}
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/jamming.png'}
                                    text="Their jam sessions go great"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/bandmates.png'}
                                    text="Kyle finds 3 perfect bandmates"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/local.png'}
                                    text="After talking and listening to many local musicians"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/search.png'}
                                    text="He searches Artbot for local musicians"
                                    line={false}
                                />
                            </div>
                            <div className="col-1" />
                        </div>
                        <div className="row  no-gutters">
                            <div className="col-1" />
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/revenue.png'}
                                    text="The band decides to have Artbot automatically distribute 25% of the songs revenue to
									each band member"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/license.png'}
                                    text="	The band also chooses to license their songs allowing others to use their songs for
									ArtBot content inexchange for 1% of that content’s revenue"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/genre.png'}
                                    text="For their first concert, Kyle creates an audio ad campaign targeting users that
									listen to similar genres of music"
                                    line={false}
                                />
                            </div>
                            <div className="col-md-2 " />
                            <div className="col-md-2 " />
                            <div className="col-1" />
                        </div>
                    </div>
                    <div
                        id="john-tab "
                        className={`john-tab ${user === 'john' ? 'd-block' : 'd-none'}`}>
                        <div className="row  no-gutters">
                            <div className="col-1" />
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/web-developer.png'}
                                    src2={'/img/purple-dot-user-stories.png'}
                                    text="John is a talented web developer."
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/technology.png'}
                                    text=" He has experience in Blockchain technologies and loves snowboarding"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/tv.png'}
                                    text="John hates political ads, but loves snowboarding ads."
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/user-stories-icon9.png'}
                                    text="He lists these preferences in his account settings, blacklisting political ads and whitelisting snowboarding ads"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/user-stories-icon4.png'}
                                    text="John creates a chanel of his favorite snowboarding videos (other creator videos"
                                    line={false}
                                    rightLine={true}
                                    rightLineCss="29%"
                                />
                            </div>
                            <div className="col-1" />
                        </div>
                        <div className="row  no-gutters">
                            <div className="col-1" />
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/money.png'}
                                    text="John is able to leverage his skills to earn money by contributing to the ArtBot platform."
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/allie-6.png'}
                                    text="Through ArtBot’s bug bounty program, John receives ArtBot Tokens by finding bugs in ArtBot’s open source code."
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/percentage.png'}
                                    text="Whenever someone uses John's Spanish subtitles, John receives a small percentage of the ad revenue."
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/language.png'}
                                    text="John also knows Spanish and uploads spanish subtitles for all the videos in his chanel."
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/initial-investor.png'}
                                    text="Now he receives a small percentage of the ad revenue whenever users watch his chanel."
                                    line={false}
                                />
                            </div>
                            <div className="col-1" />
                        </div>
                    </div>
                    <div
                        id="sara-tab "
                        className={`sara-tab ${user === 'sara' ? 'd-block' : 'd-none'}`}>
                        <div className="row  no-gutters">
                            <div className="col-1" />
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/sara.png'}
                                    src2={'/img/purple-dot-user-stories.png'}
                                    text="Sara works for a US startup that creates handmade snowbaords."
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/user-stories-icon2.png'}
                                    text=" With a startup’s limited marketing budget, Sara doesn’t have the time or money to optimize a Youtube ad campaign through their complicated bidding system."
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/user-stories-icon3.png'}
                                    text="Instead Sara turns to ArtBot knowing exactly how much ad time will cost per view."
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/user-stories-icon4.png'}
                                    text="Sara posts a job on ArtBot announcing a contest for snowboarders to be a part of their new ad campaign."
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/user-stories-icon5.png'}
                                    text="Sara asks snowboarders to submit short trick videos of themselves.

"
                                    line={false}
                                    rightLine={true}
                                    rightLineCss="24%"
                                />
                            </div>
                            <div className="col-1" />
                        </div>
                        <div className="row  no-gutters">
                            <div className="col-1" />
                            <div className="col-md-2 " />
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/user-stories-icon9.png'}
                                    text="Through ArtBot, Sara targets a narrow demographic at no additional cost, including users like John that have opted-in to watching snowboarding ads"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/user-stories-icon8.png'}
                                    text="Sara now has 5 great ads for her company"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/user-stories-icon6.png'}
                                    text="The winners are sent custom snowboards, and their trick videos are reshot"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/user-stories-icon7.png'}
                                    text="5 great submissions are found, 2 of which are selected by the community."
                                    line={false}
                                />
                            </div>
                            <div className="col-1" />
                        </div>
                    </div>
                    <div
                        id="allie-tab "
                        className={`allie-tab ${user === 'allie' ? 'd-block' : 'd-none'}`}>
                        <div className="row  no-gutters">
                            <div className="col-1" />
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/graduate.png'}
                                    src2={'/img/purple-dot-user-stories.png'}
                                    text="Allie just finished school studying digital animation"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/allie-2.png'}
                                    text="She has an idea for an animated short, and creates a short 1 minute trailer"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/earning.png'}
                                    text="Allie uploads the trailer to ArtBot, earning money for every minute someone watches it"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/allie-4.png'}
                                    text="She decides to create an ArtBot crowdfunding campaign in order to create the full animated short"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/investment-search.png'}
                                    text="Allie figueres she needs $10,000 total: $7,000 to hire 4 voice actors and $3,000 to cover her own expenses and marketing
  
"
                                    line={false}
                                    rightLine={true}
                                    rightLineCss="26%"
                                />
                            </div>
                            <div className="col-1" />
                        </div>
                        <div className="row  no-gutters">
                            <div className="col-1" />
                            <div className="col-md-2 " />
                            <div className="col-md-2 " />
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/user-stories-icon8.png'}
                                    text="Allie sets aside $500 for ArtBot advertising, targeting users that love watching animations"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/partners.png'}
                                    text="Allie’s crowdfunding campaign is succesful, she solidfied a great team, and together they complete an amazing animated short"
                                />
                            </div>
                            <div className="col-md-2 ">
                                <AboutUserCard
                                    src={'/img/allie-6.png'}
                                    text="As the campaign runs, users apply for the open positions while Allie also proactively searches ArtBot for the best team members"
                                    line={false}
                                />
                            </div>
                            <div className="col-1 " />
                        </div>
                    </div>
                </div>
                {/** Community */}
                <div className="container">
                    <Typography
                        variant="h5"
                        component="h5"
                        className="text-center text-white text-weight-bold">
                        Community
                    </Typography>
                    <div className="d-flex p-3 justify-content-center">
                        <P1
                            className={`${
                                community === 'creator' ? 'bg-color-purple' : 'color-purple'
                            }  p-2 rounded-top pointer-cursor h5`}
                            onClick={() => setCommunity('creator')}>
                            Creator
                        </P1>
                        <Span className="my-auto px-1">-</Span>
                        <P1
                            className={` ${
                                community === 'consumer' ? 'bg-color-blue' : 'color-blue'
                            } p-2 rounded-top pointer-cursor h5`}
                            onClick={() => setCommunity('consumer')}>
                            Consumer
                        </P1>
                        <Span className="my-auto px-1">-</Span>
                        <P1
                            className={` ${
                                community === 'advertiser' ? 'bg-color-green' : 'color-green'
                            } p-2 rounded-top pointer-cursor h5`}
                            onClick={() => setCommunity('advertiser')}>
                            Advertiser
                        </P1>
                    </div>
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-md-between" />
                    <div className="row">
                        {community === 'creator' &&
                            creator.map((item, i) => (
                                <CommunityCard
                                    key={i}
                                    src={item.src}
                                    hoverImg={item.hoverImg}
                                    text={item.text}
                                />
                            ))}
                        {community === 'consumer' &&
                            consumer.map((item, i) => (
                                <CommunityCard
                                    key={i}
                                    src={item.src}
                                    hoverImg={item.hoverImg}
                                    text={item.text}
                                />
                            ))}
                        {community === 'advertiser' &&
                            advertiser.map((item, i) => (
                                <CommunityCard
                                    key={i}
                                    src={item.src}
                                    hoverImg={item.hoverImg}
                                    text={item.text}
                                />
                            ))}
                    </div>
                </div>
                {/**  Artbot Mission for Peoples */}
                <div className="container mt-5 py-5">
                    <div className="row">
                        <div className="col-md-6 ">
                            <P1 className="h3 about-bottom-head">For the people by the people</P1>
                            <P1 className="paragraph font-16 text-white py-4">
                                ArtBot's mission is to build the ideal collaborative platform for
                                creators, consumers, and advertisers. By democratizing and
                                consolidating services, ArtBot empowers its users with transparency,
                                control, and a voice to maximize their creative opportunities.
                            </P1>
                        </div>
                        <div className="col-md-6 ">
                            <Img src={'/img/optimized2.png'} className="img-fluid" alt="artbot" />
                        </div>
                    </div>
                </div>
                {/** Readmap  */}
                <div className="container ">
                    <Typography
                        variant="h5"
                        component="h4"
                        className="text-center text-white py-4 ">
                        {' '}
                        Roadmap
                    </Typography>
                    <div className="row p-3">
                        <div className="col-md-3 mb-2 mb-sm-0">
                            <RoadmapCard
                                title="2020"
                                titleColor="color-green"
                                question="Q-3"
                                description="Complete ArtBot alpha with basic video, audio, and 2D/3D features"
                                border="border-green"
                            />
                        </div>
                        <div className="col-md-3 mb-2 mb-sm-0">
                            <RoadmapCard
                                title="2020"
                                titleColor="color-blue"
                                question="Q-4"
                                description="Complete ArtBot beta including initial monetization features"
                                border="border-blue"
                            />
                        </div>
                        <div className="col-md-3 mb-2 mb-sm-0">
                            <RoadmapCard
                                title="2021"
                                titleColor="color-green"
                                question="Q-3"
                                description="Introduce initial crowdfunding and licensing features ."
                                border="border-green"
                            />
                        </div>
                        <div className="col-md-3 mb-2 mb-sm-0">
                            <RoadmapCard
                                title="2021"
                                titleColor="color-purple"
                                question="Q-4"
                                description="Full ArtBot launch!"
                                border="border-purple"
                            />
                        </div>
                    </div>
                </div>
                {/** Subscribe to Our News Letter */}
                <div className="container p-sm-5 ">
                    <div className="row newsletter-head">
                        <div className="col-md-6">
                            <P1 className="h5 newsletter-head__upper text-center">
                                Subscribe To Our newsletter
                            </P1>
                            <P1 className="newsletter-head__down text-white text-center">
                                Be the first to know everything about the ArtBot Experience...
                            </P1>
                        </div>
                        <div className="col-md-6 ">
                            <form onSubmit={onSubmitNewsLetter}>
                                <Input
                                    type="email"
                                    className="newsletter-head__input "
                                    placeholder="Write Your Email here"
                                    onChange={(event) =>
                                        setEmail({
                                            value: event.target.value,
                                            touch: true,
                                            error: email.value ? false : true
                                        })
                                    }
                                    value={email.value}
                                />
                                <Button
                                    className="btn px-sm-5 rounded-10 newsletter-head__btn"
                                    type="submit">
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AboutUs;
