import React from 'react';
import LetsMakeaMovieWrapper from '../components/LetsMakeaMovieWrapper/LetsMakeaMovieWrapper';
import P1 from '../components/UI/P1/P1';
import Span from '../components/UI/Span/Span';
import Button from '../components/UI/Button/Button';
import MovieCreatorCard from '../components/MovieCreatorCard/MovieCreatorCard';
import { useDispatch, useSelector } from 'react-redux';
import LetsMakeVideoPopup from '../components/LetsMakeVideoPopup/LetsMakeVideoPopup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import Radio from '@material-ui/core/Radio/Radio';
import { withStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Img from '../components/UI/Img/Img';
import DonateCard from '../components/DonateCard/DonateCard';
import Footer from '../components/Footer/Footer';
import Dialog from '../components/UI/Dialog/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import clsx from 'clsx';
import {
    castVote,
    getAllPlans,
    getAllVotes,
    getAllVotesFromPoll,
    getPoolOptions,
    moviePayment
} from '../services/movie';
import VoteCasted from '../components/VoteCasted/VoteCasted';
import { createFundingPaymentHistory } from '../services/util';
import parser from 'react-html-parser';
import { changeBacking } from '../redux/reducers/auth.duck';
import ProfileRefferalTab from '../components/ProfileRefferalTab/ProfileRefferalTab';
import LetsMakeaMovieHeaderV1 from '../components/LetsMakeaMovieHeaderV1/LetsMakeaMovieHeaderV1';
const GreenRadio = withStyles({
    root: {
        color: '#fff',
        '&$checked': {
            color: '#90E40D'
        }
    },
    checked: {}
})((props) => <Radio color="default" {...props} />);

const LetsMakeaMovie = () => {
    const formRef = React.useRef();
    const router = useRouter();
    const [value, setValue] = React.useState('');
    const movieCreatorRef = React.useRef();
    const [showCards, setShowCards] = React.useState(0);
    const [videoPopup, setVideoPopup] = React.useState(false);
    const user = useSelector((state) => state.auth);
    const [price, setPrice] = React.useState(0);
    const [selectedPlan, setSelectedPlan] = React.useState(null);
    const [optionColorHover, setOptionColorHover] = React.useState(false);
    const [openModel, setOpenModel] = React.useState({
        message: '',
        open: false,
        login: false,
        parse: false
    });
    const [pool, setPool] = React.useState({ id: '', options: [] });
    const [voteCasted, setVoteCasted] = React.useState(false);
    const dispatch = useDispatch();
    const [films, setFilms] = React.useState([
        {
            _id: '616e60e25812433bcf9b6999',
            src:
                'https://artbot.mypinata.cloud/ipfs/QmU3x5VAwSXgRJEbRbqK8EPX7GZMzuUbcdTufrqrFbaTbC',
            poster: '/img/film1.jpeg',
            title: 'Birth of ArtBot',
            desc: 'io travels time and space to save great works of art.',
            createdAt: '2021-10-19T06:08:34.560Z',
            updatedAt: '2021-10-20T17:42:23.071Z',
            __v: 0
        },
        {
            _id: '616e618e5812433bcf9b699a',
            src:
                'https://artbot.mypinata.cloud/ipfs/QmWv9HER5tEEFTWoDkuET5Dg38Jb6xgUwoTKGupPLKGBfE',
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
    ]);
    const [packages, setPackages] = React.useState([]);
    React.useEffect(() => {
        // getVotes();
        getPlans();
        getPool();
        getVotePoll();
    }, []);
    const getVotePoll = async () => {
        const data = await getAllVotesFromPoll();
        if (data.statusCode === 200 && user.authToken) {
            const { docs } = data.data;
            const find = docs.filter((item) => item.identifier === user.user._id);
            if (find.length) {
                setVoteCasted(true);
            }
        }
    };
    const getPool = async () => {
        const data = await getPoolOptions();
        if (data.statusCode === 200) {
            const poll = data.data;
            const total = poll.options
                .map((item) => item.votes_count)
                .reduce((acc, curr) => acc + curr);
            poll.totalVotes = total;
            setPool(poll);
        }
    };
    const getVotes = async () => {
        const data = await getAllVotes();
        if (data.code === 'ABT0000') setFilms([...data.votes]);
    };
    const getPlans = async () => {
        const data = await getAllPlans();
        if (data.code === 'ABT0000') setPackages([...data.plans]);
    };
    React.useEffect(() => {
        const { success } = router.query;
        const pay = JSON.parse(localStorage.getItem('pay'));
        if (success && pay) {
            localStorage.setItem('pay', false);
            setOpenModel({
                ...openModel,
                open: true,
                parse: true,
                message:
                    "<p className='mb-0'>Thanks for taking the first step in helping us #letsmakeamovie.</p><p className='mb-0'> Please check your email and spam for your private discord invite.</p><p className='mb-0'> Let's make something amazing!</p>"
            });
            createPaymentHistory();
        }
    }, []);
    React.useEffect(() => {
        if (price) {
            const plan = packages.find((item) => item.priceId === price);
            localStorage.setItem('pay', true);
            localStorage.setItem('price', plan.price);
            localStorage.setItem('planId', plan._id);
            localStorage.setItem('planTitle', plan.title);

            setTimeout(() => formRef.current.submit(), 1000);
        }
    }, [price]);
    const openPopup = () => {
        setVideoPopup(!videoPopup);
    };
    const handleChange = (e) => {
        console.log(e.target.value);
        setValue(e.target.value);
    };
    const cards = films.map((item, i) => (
        <MovieCreatorCard
            key={i}
            index={i}
            openPopup={openPopup}
            thumbnailSrc={item.poster}
            videoSrc={item.src}
            title={item.title}
            desc={item.desc}
        />
    ));
    const voteCastHandler = async () => {
        if (!user.authToken) {
            setOpenModel({ open: true, message: ' to cast vote', login: true });
            return;
        }
        const reqData = {};
        const option = pool.options[value];
        reqData.option_id = option.id;
        reqData.poll_id = pool.id;
        reqData.identifier = user.user._id;
        const data = await castVote(reqData);
        if (data.statusCode === 200) {
            setOpenModel({ ...openModel, open: true, message: 'Vote cast successfully' });
            getPool();
            setVoteCasted(true);
        }
    };
    const showCountDescrese = (count) => {
        if (count > -1) {
            setShowCards(count);
        }
    };
    const showCountIncrease = (count) => {
        if (count < 4) {
            setShowCards(count);
        }
    };
    const getStartedHandler = () => {
        if (user.authToken) movieCreatorRef.current.scrollIntoView();
        else router.push({ pathname: '/signup', query: { movie: true } });
    };
    const donateHandler = (id, price) => {
        if (!user.authToken) {
            setOpenModel({ open: true, message: ' to choose backing tier', login: true });
            return;
        }
        setPrice(price);
        // setSelectedPlan(id);
        // formRef.current.submit();
    };
    const optionHoverHandler = (value) => {
        setShowCards(value);
        setOptionColorHover(true);
    };
    const optionHoverEnds = (e) => {
        setOptionColorHover(false);
    };
    const createPaymentHistory = async () => {
        const price = localStorage.getItem('price');
        const planId = localStorage.getItem('planId');
        const planTitle = localStorage.getItem('planTitle');
        const reqData = {
            transactionId: '',
            paymentMethod: 'stripe',
            paid: true,
            email: user.user.email,
            user: user.user._id,
            payTo: '5f0de0fb57fce500203473bb',
            amount: price,
            paymentFor: 'croudfunding',
            planId: planId
        };
        dispatch(changeBacking(price, planTitle));
        localStorage.removeItem('price');
        localStorage.removeItem('planId');
        localStorage.removeItem('planTitle');
        await createFundingPaymentHistory(reqData);
        getPlans();
    };
    const onPaymentSuccessHandler = async (token) => {
        let reqData = {};
        reqData.token = token;
        reqData.planId = selectedPlan;
        const data = await moviePayment(reqData);
        if (data.code === 'ABT0000') {
            setPrice(0);
            setSelectedPlan(null);
            getPlans();
            setOpenModel({ ...openModel, open: true, message: 'Thanks For your donation' });
        } else
            setOpenModel({
                ...openModel,
                open: true,
                message: 'Something went wrong during payment'
            });
    };
    const onPaymentErrorHandler = async (error) => {
        setOpenModel({ ...openModel, open: true, message: 'Something went wrong during payment' });
    };
    return (
        <LetsMakeaMovieWrapper popup={videoPopup} header={<LetsMakeaMovieHeaderV1 />}>
            <React.Fragment>
                <ProfileRefferalTab />
                {openModel.open && (
                    <Dialog
                        className="custom-dialog "
                        open={openModel.open}
                        handleClose={() =>
                            setOpenModel({ login: false, open: !openModel, message: '' })
                        }
                        scroll="body">
                        <DialogContent dividers={true}>
                            <div className="row col-12 text-light" tabIndex={-1}>
                                {openModel.login && `Please`}
                                {openModel.login && (
                                    <Span
                                        onClick={() => router.push('/login')}
                                        className="font-weight-bold text-primary pointer">
                                        &nbsp;Login
                                    </Span>
                                )}
                                {openModel.login && 'first'}
                                {openModel.parse ? parser(openModel.message) : openModel.message}
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
                <div
                    className={`make-movie-top d-flex flex-column ${clsx({
                        'blur-effect': videoPopup
                    })} `}>
                    <h1 className="make-movie-top__title">
                        Let’s Make a Movie<Span className="lets-make-movie--fact">!</Span>
                    </h1>
                    <P1 className="make-movie-top__desc mb-0">
                        Vote on every step of the movie making process,
                    </P1>
                    <P1 className="make-movie-top__desc">and earn money when the movie does</P1>
                    <div className="d-flex make-movie-top-bottom justify-content-center mt-5">
                        <a
                            target="_blank"
                            href="https://discord.gg/STPtXjgYyA"
                            className="make-movie-top-bottom__btn btn text-dark">
                            Join our Discord
                        </a>
                    </div>
                </div>
                {/* Movie Creater Section */}
                <div className="movie-creator-section">
                    <h1
                        className={`movie-creator-section__title ${clsx({
                            'blur-effect': videoPopup
                        })}`}>
                        What movie do you want to help create
                        <Span className="lets-make-movie--fact">?</Span>
                    </h1>
                    <div>
                        {videoPopup && (
                            <LetsMakeVideoPopup
                                src={films[showCards].src}
                                poster={films[showCards].poster}
                                show={videoPopup}
                                setShow={setVideoPopup}
                            />
                        )}
                    </div>
                    <div
                        className={`container  position-relative my-5 ${clsx({
                            'blur-effect': videoPopup
                        })}`}>
                        <div className="row ">
                            <div className="col-md-6">
                                {cards[showCards]}
                                <div
                                    id="section-btn-container"
                                    className="d-flex movie-creator-section__bottom justify-content-between
                                            align-items-center
                                        ">
                                    <Button
                                        onClick={() => showCountDescrese(showCards - 1)}
                                        className="btn rounded-pill movie-creator-section__prev">
                                        Prev
                                    </Button>
                                    <P1 className="mb-0 ">
                                        {showCards + 1} <Span className="text-light">/4</Span>{' '}
                                    </P1>
                                    <Button
                                        onClick={() => showCountIncrease(showCards + 1)}
                                        className="btn rounded-pill movie-creator-section__next">
                                        Next
                                    </Button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="movie-creator-section-container my-auto">
                                    {!voteCasted && (
                                        <React.Fragment>
                                            <FormGroup>
                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="gender1"
                                                    value={value}
                                                    onChange={handleChange}>
                                                    <div className="d-flex align-items-center">
                                                        <FormControlLabel
                                                            className={clsx({
                                                                'movie-option-text':
                                                                    showCards === 0 &&
                                                                    optionColorHover
                                                            })}
                                                            onMouseEnter={() =>
                                                                optionHoverHandler(0)
                                                            }
                                                            onMouseLeave={optionHoverEnds}
                                                            value="0"
                                                            control={<GreenRadio />}
                                                            label=""
                                                        />
                                                        <P1
                                                            className={clsx({
                                                                'movie-option-text':
                                                                    showCards === 0 &&
                                                                    optionColorHover,
                                                                'mb-2': true
                                                            })}
                                                            onMouseEnter={() =>
                                                                optionHoverHandler(0)
                                                            }
                                                            onMouseLeave={optionHoverEnds}>
                                                            <b> Birth of ArtBot:</b> io travels time
                                                            and space to save great works of art
                                                        </P1>
                                                    </div>
                                                    <div className="movie-creator-section--line" />
                                                    <div className="d-flex align-items-center">
                                                        <FormControlLabel
                                                            className={clsx({
                                                                'movie-option-text':
                                                                    showCards === 1 &&
                                                                    optionColorHover
                                                            })}
                                                            onMouseEnter={() =>
                                                                optionHoverHandler(1)
                                                            }
                                                            onMouseLeave={optionHoverEnds}
                                                            value="1"
                                                            control={<GreenRadio />}
                                                            label=""
                                                        />
                                                        <P1
                                                            className={clsx({
                                                                'movie-option-text':
                                                                    showCards === 1 &&
                                                                    optionColorHover,
                                                                'mb-2': true
                                                            })}
                                                            onMouseEnter={() =>
                                                                optionHoverHandler(1)
                                                            }
                                                            onMouseLeave={optionHoverEnds}>
                                                            <b> Ninja Cats:</b> two apprentice
                                                            ninjas head down different paths
                                                        </P1>
                                                    </div>
                                                    <div className="movie-creator-section--line" />
                                                    <div className="d-flex align-items-center">
                                                        <FormControlLabel
                                                            className={clsx({
                                                                'movie-option-text':
                                                                    showCards === 2 &&
                                                                    optionColorHover
                                                            })}
                                                            onMouseEnter={() =>
                                                                optionHoverHandler(2)
                                                            }
                                                            onMouseLeave={optionHoverEnds}
                                                            value="2"
                                                            control={<GreenRadio />}
                                                            label=""
                                                        />
                                                        <P1
                                                            className={clsx({
                                                                'movie-option-text':
                                                                    showCards === 2 &&
                                                                    optionColorHover,
                                                                'mb-2': true
                                                            })}
                                                            onMouseEnter={() =>
                                                                optionHoverHandler(2)
                                                            }
                                                            onMouseLeave={optionHoverEnds}>
                                                            <b> The Last Humans:</b> live-action
                                                            post-apocalyptic brother and sister
                                                            survival
                                                        </P1>
                                                    </div>
                                                    <div className="movie-creator-section--line" />
                                                    <div className="d-flex align-items-center">
                                                        <FormControlLabel
                                                            className={clsx({
                                                                'movie-option-text':
                                                                    showCards === 3 &&
                                                                    optionColorHover
                                                            })}
                                                            onMouseEnter={() =>
                                                                optionHoverHandler(3)
                                                            }
                                                            onMouseLeave={optionHoverEnds}
                                                            value="3"
                                                            control={<GreenRadio />}
                                                            label=""
                                                        />
                                                        <P1
                                                            className={clsx({
                                                                'movie-option-text':
                                                                    showCards === 3 &&
                                                                    optionColorHover,
                                                                'mb-2': true
                                                            })}
                                                            onMouseEnter={() =>
                                                                optionHoverHandler(3)
                                                            }
                                                            onMouseLeave={optionHoverEnds}>
                                                            <b> Saving Ai:</b> rescue mission in the
                                                            metaverse for the first true AI
                                                        </P1>
                                                    </div>
                                                </RadioGroup>
                                            </FormGroup>
                                            <div className="d-flex justify-content-end">
                                                <Button
                                                    onClick={voteCastHandler}
                                                    className="btn movie-creator-section__vote">
                                                    Vote
                                                </Button>
                                            </div>
                                        </React.Fragment>
                                    )}
                                    {voteCasted && (
                                        <React.Fragment>
                                            <VoteCasted
                                                total={pool.totalVotes}
                                                percentage={pool?.options[0]?.votes_count}>
                                                <b> Birth of ArtBot:</b> io travels time and space
                                                to save great works of art
                                            </VoteCasted>
                                            <div className="movie-creator-section--line" />
                                            <VoteCasted
                                                total={pool.totalVotes}
                                                percentage={pool?.options[1]?.votes_count}>
                                                <b> Ninja Cats:</b> two apprentice ninjas head down
                                                different paths
                                            </VoteCasted>
                                            <div className="movie-creator-section--line" />
                                            <VoteCasted
                                                total={pool.totalVotes}
                                                percentage={pool?.options[2]?.votes_count}>
                                                <b> The Last Humans:</b> live-action
                                                post-apocalyptic brother and sister survival
                                            </VoteCasted>
                                            <div className="movie-creator-section--line" />
                                            <VoteCasted
                                                total={pool.totalVotes}
                                                percentage={pool?.options[3]?.votes_count}>
                                                <b> Saving Ai:</b> rescue mission in the metaverse
                                                for the first true AI
                                            </VoteCasted>
                                            <P1 className="font-weight-bold text-center mt-1">
                                                {pool.totalVotes} {` `}
                                                votes
                                            </P1>
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Crowdfunding platform */}
                <div
                    className={`crowdfunding-platform ${clsx({ 'blur-effect': videoPopup })}`}
                    ref={movieCreatorRef}>
                    <div className="container ">
                        <div className="row g-0">
                            <div className="col-md-6">
                                <div className="crowdfunding-platform-container px-3 px-sm-auto">
                                    <P1 className="mb-0 crowdfunding-platform-title">
                                        How are WE making a movie
                                        <Span className="lets-make-movie--fact">?</Span>
                                    </P1>
                                    <div className="w-100 py-xl-5">
                                        <P1 className="mt-3 crowdfunding-platform-desc">
                                            We are starting with 4 movie ideas. Every 1-2 weeks
                                            there will be a new poll where the community will decide
                                            which direction the movie will take. First we will
                                            narrow down to 1 movie idea. Then we will vote on
                                            different story arcs. Then we will vote on character
                                            designs, and keep voting on every step until we complete
                                            the movie.
                                        </P1>
                                        <P1 className="mb-3 crowdfunding-platform-desc">
                                            You also have the opportunity to financially back the
                                            movie in exchange for rights to a portion of the movie’s
                                            royalty pool. Earn money when the movie does! When the
                                            backing campaign finishes, NFTs (non-fungible tokens)
                                            will be created and distributed to all the backers
                                            (don’t know what NFTs are?{' '}
                                            <a
                                                target="_blank"
                                                className="much-donate-card-inner--active"
                                                href="https://www.theverge.com/22310188/nft-explainer-what-is-blockchain-crypto-art-faq">
                                                Click here
                                            </a>{' '}
                                            to find out more - We can also fully manage your NFT if
                                            that’s your preference.). As the movie earns money,
                                            royalties will automatically be distributed to your
                                            wallet. 80% of the movie's revenue will be put into a
                                            royalty pool, and the remaining 20% will go to cast and
                                            crew!
                                        </P1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="crowdfunding-platform__bg">
                                    <Img
                                        src="/img/silhouette-images.png"
                                        className="img-fluid  d-block d-md-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* what donate gives you */}
                <div className={`donate-section  my-5 ${clsx({ 'blur-effect': videoPopup })}`}>
                    <div className="container">
                        <P1 className="mb-0 text-center donate-section-title">
                            How backing works<Span className="lets-make-movie--fact">.</Span>
                        </P1>
                        <div className="row my-5">
                            <div className="col-md-4">
                                <div className="d-flex donate-section-card flex-column align-items-center">
                                    <Img src="/img/1.png" className=" donate-section-card--img" />
                                    <P1 className="mb-0 mt-5 donate-section-card--desc">
                                        Choose your backing amount. Each tier has different
                                        benefits.
                                    </P1>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex donate-section-card flex-column align-items-center">
                                    <Img src="/img/2.png" className=" donate-section-card--img" />
                                    <P1 className="mb-0 mt-5 donate-section-card--desc center">
                                        Vote and discuss with the community on every step of the
                                        movie making process.
                                    </P1>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex donate-section-card flex-column align-items-center">
                                    <Img src="/img/3.png" className=" donate-section-card--img" />
                                    <P1 className="mb-0 mt-5 donate-section-card--desc">
                                        Receive NFTs and earn money when the movie does.
                                    </P1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                {/* How much donate */}
                <div className={`much-donate mt-5 ${clsx({ 'blur-effect': videoPopup })}`}>
                    <div className="container">
                        <P1 className="much-donate-title">
                            How much do you want to back
                            <Span className="lets-make-movie--fact">?</Span>
                        </P1>
                        <div className="row ">
                            {packages.map((item, i) => (
                                <div key={i} className="col-md-4">
                                    <DonateCard
                                        id={item._id}
                                        index={i}
                                        priceId={item.priceId}
                                        title={item.title}
                                        price={item.price}
                                        originalPrice={item.originalPrice}
                                        total={item.total}
                                        benefits={item.benefits}
                                        leftPrice={item.leftCount}
                                        donateHandler={donateHandler}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="opacity-0">
                            <form
                                ref={formRef}
                                action="https://artbot-backend-api-9v7k9.ondigitalocean.app/api/plan/openStripe"
                                method="POST">
                                <input type="hidden" value={price} name="priceId" />
                                <button type="submit">Checkout</button>
                            </form>

                            {/* {price && (
                                <PaypalButton
                                    ref={payButtonRef}
                                    price={price}
                                    onSuccess={onPaymentSuccessHandler}
                                    onError={onPaymentErrorHandler}
                                />
                            )} */}
                        </div>
                    </div>
                    <div className="container my-5">
                        <P1 className="mb-3 text-center crowdfunding-platform-title">
                            Revenue Distribution
                        </P1>
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                <div className="bar">
                                    <div className="bar1 d-flex flex-column justify-content-center align-items-center">
                                        <P1 className="mb-0 ">Royalty Pool A - 60%</P1>
                                    </div>
                                    <div className="bar2 d-flex flex-column justify-content-center align-items-center">
                                        <P1 className="mb-0 ">Royalty Pool B - 20%</P1>
                                    </div>
                                    <div className="bar3 d-flex flex-column justify-content-center align-items-center">
                                        <P1 className="mb-0 ">Royalty Pool C - 20%</P1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-1 col-12"></div>
                            <div className="col-md-10 col-12 d-flex flex-wrap">
                                <div className="box-container">
                                    <div className="box box1"></div>
                                    <div className="box-right ml-1">
                                        <P1 className="mb-0">Royalty Pool A</P1>
                                        <P1 className="mb-0">For all backers</P1>
                                    </div>
                                </div>
                                <div className="box-container">
                                    <div className="box box2"></div>
                                    <div className="box-right ml-1">
                                        <P1 className="mb-0">Royalty Pool B</P1>
                                        <P1 className="mb-0">For Producer and Executive backers</P1>
                                    </div>
                                </div>
                                <div className="box-container">
                                    <div className="box box3"></div>
                                    <div className="box-right ml-1">
                                        <P1 className="mb-0">Royalty Pool C</P1>
                                        <P1 className="mb-0">For #letsmakeamovie cast and crew</P1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 col-12"></div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Footer movie={true} />
                    </div>
                </div>
            </React.Fragment>
        </LetsMakeaMovieWrapper>
    );
};

export default LetsMakeaMovie;
