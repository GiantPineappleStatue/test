import React from 'react';
import { useDispatch } from 'react-redux';
import LetsMakeaMovieHeaderV2 from '../components/LetsMakeaMovieHeaderv2/LetsMakeaMovieHeaderV2';
import LetsMakeaMovieWrapper from '../components/LetsMakeaMovieWrapper/LetsMakeaMovieWrapper';
import P1 from '../components/UI/P1/P1';
import ReactIcons from '../components/UI/ReactIcons/ReactIcons';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';

import { letsMakeaMovieV2Handler } from '../redux/actions/filterMedia';
import VoteCardV2 from '../components/VoteCardV2/VoteCardV2';
import Router from 'next/router';
import Dialog from '../components/UI/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import parses from 'html-react-parser';
import { terms, privacy } from '../utils/FooterText';
import LetsMakeaMovieSlider from '../components/LetsMakeaMovieSlider/LetsMakeaMovieSlider';

const votes = [
    {
        title: 'Vote On A Movie Idea',
        description:
            'Proident voluptate ex ut minim non. Fugiat esse deserunt sint deserunt enim sint occaecat. Nisi exercitation magna eu reprehenderit consectetur est est reprehenderit eu laborum ipsum ipsum. Cillum consectetur do commodo sit esse pariatur magna. Adipisicing veniam exercitation consequat laboris consectetur tempor in officia deserunt voluptate ipsum eu id sint.'
    },
    {
        title: 'Fund The Project',
        description:
            'Proident voluptate ex ut minim non. Fugiat esse deserunt sint deserunt enim sint occaecat. Nisi exercitation magna eu reprehenderit consectetur est est reprehenderit eu laborum ipsum ipsum. Cillum consectetur do commodo sit esse pariatur magna. Adipisicing veniam exercitation consequat laboris consectetur tempor in officia deserunt voluptate ipsum eu id sint.'
    },
    {
        title: 'Vote On The Process',
        description:
            'Proident voluptate ex ut minim non. Fugiat esse deserunt sint deserunt enim sint occaecat. Nisi exercitation magna eu reprehenderit consectetur est est reprehenderit eu laborum ipsum ipsum. Cillum consectetur do commodo sit esse pariatur magna. Adipisicing veniam exercitation consequat laboris consectetur tempor in officia deserunt voluptate ipsum eu id sint.'
    },
    {
        title: "Distribute NFT's",
        description:
            'Proident voluptate ex ut minim non. Fugiat esse deserunt sint deserunt enim sint occaecat. Nisi exercitation magna eu reprehenderit consectetur est est reprehenderit eu laborum ipsum ipsum. Cillum consectetur do commodo sit esse pariatur magna. Adipisicing veniam exercitation consequat laboris consectetur tempor in officia deserunt voluptate ipsum eu id sint.'
    },
    {
        title: 'Distribute Royalites',
        description:
            'Proident voluptate ex ut minim non. Fugiat esse deserunt sint deserunt enim sint occaecat. Nisi exercitation magna eu reprehenderit consectetur est est reprehenderit eu laborum ipsum ipsum. Cillum consectetur do commodo sit esse pariatur magna. Adipisicing veniam exercitation consequat laboris consectetur tempor in officia deserunt voluptate ipsum eu id sint.'
    }
];

const sliderItems = [
    {
        _id: '616e60e25812433bcf9b6999',
        src: 'https://artbot.mypinata.cloud/ipfs/QmU3x5VAwSXgRJEbRbqK8EPX7GZMzuUbcdTufrqrFbaTbC',
        poster: '/img/film1.jpeg',
        title: 'Birth of ArtBot',
        desc: 'io travels time and space to save great works of art.',
        createdAt: '2021-10-19T06:08:34.560Z',
        updatedAt: '2021-10-20T17:42:23.071Z',
        __v: 0
    },
    {
        _id: '616e618e5812433bcf9b699a',
        src: 'https://artbot.mypinata.cloud/ipfs/QmWv9HER5tEEFTWoDkuET5Dg38Jb6xgUwoTKGupPLKGBfE',
        poster: '/img/film2.jpeg',
        title: 'Ninja Cats',
        desc: 'two apprentice ninjas head down different paths.',
        createdAt: '2021-10-19T06:11:26.361Z',
        updatedAt: '2021-10-19T06:11:26.361Z',
        __v: 0
    },
    {
        _id: '616e623d5812433bcf9b699b',
        src: '',
        poster: '/img/coming-soon.png',
        title: 'The Last Humans',
        desc: 'live-action post-apocalyptic brother and sister survival.',
        createdAt: '2021-10-19T06:14:21.098Z',
        updatedAt: '2021-10-20T17:41:26.589Z',
        __v: 0
    },
    {
        _id: '616e62c85812433bcf9b699c',
        src: '',
        poster: '/img/coming-soon.png',
        title: 'Saving Ai',
        desc: 'rescue mission in the metaverse for the first true AI.',
        createdAt: '2021-10-19T06:16:40.489Z',
        updatedAt: '2021-10-20T17:40:47.875Z',
        __v: 0
    }
];

const LetsmakeaMovieV2 = () => {
    const dispatch = useDispatch();
    const [activeVote, setActiveVote] = React.useState('0');
    const [activeModel, setActiveModel] = React.useState({ open: false, tab: '' });
    const [initialRender, setInitialRender] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const imgRef = React.useRef();
    const imgRef1 = React.useRef();
    const divRef = React.useRef();

    React.useEffect(() => {
        dispatch(letsMakeaMovieV2Handler(true));
        imageChange(activeVote);
        setInitialRender(true);
        const listener = (event) => {
            console.log(event, 'event');
        };
        window.addEventListener('scroll', listener);
        return () => window.removeEventListener('scroll', listener);
    }, []);

    const handleChange = (e) => {
        setActiveVote(e.target.value);
        imageChange(e.target.value);
        setInitialRender(false);
    };

    const imageChange = (index) => {
        setTimeout(() => {
            const image = imgRef1.current.classList;
            let curr = null;
            image.forEach((item) => {
                curr = item;
            });
            image.remove(curr);
            image.add(`animation-${index}`);
        }, 100);
    };
    const optionHoverHandler = (value) => {
        setActiveVote(value);
        imageChange(value);
    };
    const handleArrowChange = (direction) => {
        if (direction === 'up' && activeVote !== '0') {
            setActiveVote((+activeVote - 1).toString());
            imageChange(+activeVote - 1);
        }
        if (direction === 'down' && activeVote !== '4') {
            setActiveVote((+activeVote + 1).toString());
            imageChange(+activeVote + 1);
        }
    };

    const scrollHandler = (scroll) => {
        if (scroll > 100 && !isScrolled) {
            console.log(scroll, 'done', isScrolled);
            // setTimeout(() => divRef.current.scrollIntoView(), 500);
            setIsScrolled(true);
        }
    };

    return (
        <LetsMakeaMovieWrapper
            movieV2={true}
            clickToTop={false}
            popup={false}
            header={<LetsMakeaMovieHeaderV2 />}
            voteDivRef={divRef}
            scrollHandler={scrollHandler}>
            {/* <div> */}
            <div className={`make-movie-v2-top d-flex flex-column  `}>
                <div className="mt-3">
                    <h1 className="make-movie-v2-top__title">Revolutionizing video & audio</h1>
                    <h1 className="make-movie-v2-top__title">
                        crowdfunding with royalty pool NFTs
                    </h1>
                </div>
                <P1 className="make-movie-v2-top__desc mb-0">
                    Redefining the creator economy with royalty crowdfunding
                </P1>
                <div className="d-flex make-movie-v2-top-bottom justify-content-center mt-5">
                    <div
                        onClick={() => divRef.current.scrollIntoView()}
                        className="make-movie-v2-top-bottom__btn">
                        <ReactIcons.IoIosArrowDown size={20} />
                    </div>
                </div>
            </div>
            <div className="make-movie-v2-middle ">
                <div className="row ">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <LetsMakeaMovieSlider popupHandler={() => {}} slides={sliderItems} />
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <div className="make-movie-v2-middle--bottom"></div>
            </div>
            {/* Vote to See Section */}

            <div ref={divRef} className="container make-movie-v2-vote-section " id="voteSection">
                <div className="row">
                    <div className="col-md-6">
                        <div ref={imgRef} className="make-movie-v2-vote-section-blur--img">
                            <div
                                ref={imgRef1}
                                className="make-movie-v2-vote-section-blur--img__scale animation-0"></div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-center1 mx-2">
                            <ReactIcons.IoIosArrowUp
                                onClick={() => handleArrowChange('up')}
                                size={30}
                                className="pointer"
                            />
                        </div>
                        <div id="accordion">
                            <FormGroup className="">
                                <RadioGroup
                                    aria-label="gender"
                                    name="gender1"
                                    value={activeVote}
                                    onChange={handleChange}>
                                    {votes.map((vote, index) => (
                                        <VoteCardV2
                                            key={index}
                                            title={vote.title}
                                            description={vote.description}
                                            index={index}
                                            activeVote={activeVote}
                                            handleChange={optionHoverHandler}
                                            first={initialRender}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormGroup>
                            <div className="d-flex justify-content-end"></div>
                        </div>
                        <div className="d-flex justify-content-center1 mx-1">
                            <ReactIcons.IoIosArrowDown
                                onClick={() => handleArrowChange('down')}
                                size={30}
                                className="pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                className="custom-dialog "
                open={activeModel.open}
                handleClose={() => setActiveModel({ open: false, tab: '' })}
                scroll="body">
                <DialogTitle className="text-light">
                    {activeModel.tab === 'terms' && terms.title}
                    {activeModel.tab === 'privacy' && privacy.title}
                </DialogTitle>
                <DialogContent dividers={true}>
                    <div className="row col-12 text-light" tabIndex={-1}>
                        {activeModel.tab === 'terms' && parses(terms.desc)}
                        {activeModel.tab === 'privacy' && parses(privacy.desc)}
                    </div>
                </DialogContent>
            </Dialog>
            <div className="make-movie-v2-bottom mx-4 mb-4 align-items-center">
                <div className="d-flex align-items-center   py-21">
                    <a target="_blank" href="https://www.facebook.com/ArtbotTv">
                        <ReactIcons.FaFacebookF />
                    </a>
                    <a target="_blank" href="https://twitter.com/ArtBotTV">
                        <ReactIcons.FaTwitter />
                    </a>
                    <a target="_blank" href="https://www.linkedin.com/company/artbot/">
                        <ReactIcons.FaLinkedinIn />
                    </a>
                    <a target="_blank" href="https://www.reddit.com/r/ArtBotTV/">
                        <ReactIcons.FaReddit size={20} />
                    </a>
                </div>
                <div className="d-flex  align-items-center mb-2">
                    <P1
                        onClick={() => setActiveModel({ open: true, tab: 'privacy' })}
                        className="mb-0 make-movie-v2-bottom--icon pointer">
                        Privacy Policy
                    </P1>
                    <P1
                        onClick={() => setActiveModel({ open: true, tab: 'terms' })}
                        className="mb-0 make-movie-v2-bottom--icon pointer">
                        Terms & Condition
                    </P1>
                    <P1
                        className="mb-0 make-movie-v2-bottom--icon pointer"
                        onClick={() => Router.push('/faqs')}>
                        FAQ&apos;s
                    </P1>
                </div>
            </div>
            {/* </div> */}
        </LetsMakeaMovieWrapper>
    );
};

export default LetsmakeaMovieV2;
