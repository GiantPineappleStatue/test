import React from 'react';
import * as THREE from 'three';
import P1 from '../components/UI/P1/P1';
import Button from '../components/UI/Button/Button';
import Span from '../components/UI/Span/Span';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import Radio from '@material-ui/core/Radio/Radio';
import { withStyles } from '@material-ui/core/styles';
import Img from '../components/UI/Img/Img';
import { useDispatch, useSelector } from 'react-redux';
import DonateCard from '../components/DonateCard/DonateCard';
import MovieCreatorCard from '../components/MovieCreatorCard/MovieCreatorCard';
import ReactIcons from '../components/UI/ReactIcons/ReactIcons';
import LetsMakeVideoPopup from '../components/LetsMakeVideoPopup/LetsMakeVideoPopup';
import { letsMakeaMovieHandler } from '../redux/actions/filterMedia';
import Brand from '../components/Brand/Brand';
import ProfileMenu from '../components/ProfileMenu/ProfileMenu';
import Footer from '../components/Footer/Footer';
import Head from 'next/head';
import Router from 'next/router';

const GreenRadio = withStyles({
    root: {
        color: '#fff',
        '&$checked': {
            color: '#90E40D'
        }
    },
    checked: {}
})((props) => <Radio color="default" {...props} />);

function ThreeDAnimation() {
    var camera,
        scene,
        renderer,
        stars = [],
        star;
    const movieCreatorRef = React.useRef();
    const divRef = React.useRef();
    const letsMakeaMovie = React.useRef();
    const [showCards, setShowCards] = React.useState(0);
    const [videoPopup, setVideoPopup] = React.useState(false);
    const [films, setFilms] = React.useState([
        {
            src: '/img/robotLover.mp4',
            poster:
                'https://artbot.mypinata.cloud/ipfs/QmZGJq76HLfuNes9MuHgwGuSUEGY3pkhuaVvvCV4tAqdHQ?img-width=350',
            title: 'Birth of ArtBot,',
            desc: 'IO travels time and space to save great works of art.'
        },
        {
            src: '',
            poster: '/img/coming-soon.png',
            title: 'Ninja Cats',
            desc: 'two apprentice ninjas head down different paths.'
        },
        {
            src: '',
            poster: '/img/coming-soon.png',
            title: 'The Last Humans',
            desc: 'live-action brother and sister survival.'
        },
        {
            src: '',
            poster: '/img/coming-soon.png',
            title: 'Saving Ai, .',
            desc: 'Sci-fi save the girl save the world.'
        }
    ]);
    const [packages, setPackages] = React.useState([
        {
            title: 'Extra',
            total: 3,
            originalPrice: '',
            price: '1',
            desc: '0 left at this price'
        },
        {
            title: 'Assistant',
            total: 5,
            originalPrice: '10',
            price: '5',
            desc: '1,000 left at this price'
        },
        {
            title: 'Gaffer',
            total: 6,
            originalPrice: '50',
            price: '30',
            desc: '800 left at this price'
        },
        {
            title: 'Stuntperson',
            total: 7,
            originalPrice: '200',
            price: '150',
            desc: '500 left at this price'
        },
        {
            title: 'Producer',
            total: 8,
            originalPrice: '1000',
            price: '800',
            desc: '100 left at this price'
        },
        {
            title: 'Executive',
            total: 9,
            originalPrice: '10,000',
            price: '9,000',
            desc: '110 left at this price'
        }
    ]);
    const [benefits, setBenefits] = React.useState([
        'Invite to private discord',
        'Money distributions from basic royalty pool',
        'Voting rights to all polls',
        'Invite to digital premiere',
        'Chat permissions in most channels',
        'Name in credits',
        'Access to private channel',
        'Money distributions from producer pool',
        'Invite to in-person premiere',
        'Be in the movie!  Voice a character or include your music, we’ll work with you to see how we can involve you or someone you know'
    ]);
    const [value, setValue] = React.useState('');
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    React.useEffect(() => {
        init();
        addSphere();
        render();
        dispatch(letsMakeaMovieHandler(true));
        const movie = divRef?.current?.querySelector('.lets-make-movie') || null;
        return () => {
            dispatch(letsMakeaMovieHandler(false));
            window.removeEventListener('resize', onWindowResize);
            if (movie) movie.removeEventListener('scroll', onScrollHandler);
        };
    }, []);
    const onScrollHandler = () => {
        const top = divRef.current.querySelector('.top');
        const movie = divRef.current.querySelector('.lets-make-movie');
        if (movie.scrollTop > 20) {
            top.style.display = 'block';
        } else {
            top.style.display = 'none';
        }
    };
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const backToTopHandler = () => {
        if (typeof window !== 'undefined') {
            window.scroll(0, 0);
            letsMakeaMovie.current.scrollTop = 0;
        }
    };
    function init() {
        //camera
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 5;
        //scene
        scene = new THREE.Scene();
        //140C24
        //140c24
        // new #090317 #0B0317
        scene.background = new THREE.Color(0x140c24);
        //renderer
        renderer = new THREE.WebGLRenderer();
        //set the size of the renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        const canvas = divRef.current.querySelector('canvas');
        if (canvas) {
            canvas.remove();
        }
        //add the renderer to the html document body
        divRef.current.appendChild(renderer.domElement);
        const newCanvas = divRef.current.querySelector('canvas');
        if (newCanvas) {
            newCanvas.style.height = window.innerHeight + 'px';
            newCanvas.setAttribute('height', window.innerHeight);
        }
        const movie = divRef.current.querySelector('.lets-make-movie');

        window.addEventListener('resize', onWindowResize, false);
        movie.addEventListener('scroll', onScrollHandler, false);
    }

    function addSphere() {
        // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
        for (var z = -1000; z < 1000; z += 12) {
            // Make a sphere (exactly the same as before).
            const random = +(Math.random() * 10).toFixed(0);
            let colorValue = null;
            switch (random) {
                case 0:
                case 1:
                case 2:
                case 3:
                    colorValue = 0x8cde0d;
                    break;
                case 4:
                case 5:
                case 6:
                    colorValue = 0x00bfff;
                    break;
                case 7:
                case 8:
                case 9:
                    colorValue = 0x8855f3;
                    break;
                default:
                    colorValue = 0x8cde0d;
                    break;
            }
            var geometry = new THREE.SphereGeometry(0.5, 32, 32);
            let material = new THREE.MeshBasicMaterial({
                color: colorValue
            });
            var sphere = new THREE.Mesh(geometry, material);
            var sphere1 = new THREE.Mesh(geometry, material);

            // This time we give the sphere random x and y positions between -500 and 500
            sphere.position.x = Math.random() * 1000 - 500;
            sphere.position.y = Math.random() * 1000 - 500;

            sphere1.position.x = Math.random() * 1000 - 500;
            sphere1.position.y = Math.random() * 1000 - 500;

            // Then set the z position to where it is in the loop (distance of camera)
            sphere.position.z = z;
            sphere1.position.z = z;

            // scale it up a bit
            sphere.scale.x = sphere.scale.y = 2;
            sphere1.scale.x = sphere1.scale.y = 2;

            //add the sphere to the scene
            scene.add(sphere);
            scene.add(sphere1);
            //finally push it to the stars array
            stars.push(sphere);
            stars.push(sphere1);
        }
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        const newCanvas = divRef.current.querySelector('canvas');
        if (newCanvas) {
            newCanvas.style.height = window.innerHeight + 'px';
            newCanvas.setAttribute('height', window.innerHeight);
        }
    }
    function animateStars() {
        // loop through each star
        for (var i = 0; i < stars.length; i++) {
            star = stars[i];

            // and move it forward dependent on the mouseY position.
            star.position.z += i / 30;

            // if the particle is too close move it to the back
            if (star.position.z > 1000) star.position.z -= 2000;
        }
    }

    function render() {
        //get the frame me
        requestAnimationFrame(render);

        //render the scene
        renderer.render(scene, camera);
        animateStars();
    }
    const openPopup = () => {
        setVideoPopup(!videoPopup);
        console.log(videoPopup);
    };
    const cards = films.map((item, i) => (
        <MovieCreatorCard
            key={i}
            index={i}
            openPopup={openPopup}
            src={item.poster}
            title={item.title}
            desc={item.desc}
        />
    ));
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
        else Router.push('/login');
    };
    return (
        // <Layout>
        <div className="position-relative">
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="max-image-preview:large" />
                <meta name="robots" content="index, follow" />
                <meta
                    name="googlebot"
                    content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
                />
                <meta
                    name="bingbot"
                    content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
                />
                <meta property="og:type" content="Arts and Entertainment" />
                <meta property="og:url" content="https://artbot.tv" />
                <meta name="twitter:card" content="summary" />
                <meta property="twitter:url" content="https://artbot.tv" />
                <meta name="twitter:creator" content="@ArtBotTV" />
                <meta name="twitter:site" content="Arts and Entertainment" />
                <meta name="og:title" content="Lets make a Movie" />
                <meta
                    name="og:description"
                    content="Let’s Make a Movie!. Vote on every step of the movie making process and earn money when the movie does"
                />
                <meta
                    name="og:image"
                    content="https://artbot.mypinata.cloud/ipfs/QmXAJJTTas6YAtEP7n46dzFhyc7Y7pM49PzSTCEtb3pSNq?img-width=400"
                />
                <meta name="twitter:title" content="Lets make a Movie" />
                <meta
                    name="twitter:description"
                    content="Let’s Make a Movie!. Vote on every step of the movie making process and earn money when the movie does"
                />
                <meta
                    name="twitter:image"
                    content="https://artbot.mypinata.cloud/ipfs/QmXAJJTTas6YAtEP7n46dzFhyc7Y7pM49PzSTCEtb3pSNq?img-width=400"
                />

                <title>Lets make a Movie</title>
            </Head>
            <div ref={divRef} id="star-animation" className=" position-relative">
                {/* <Header /> */}
                <div ref={letsMakeaMovie} className="lets-make-movie  pl-md -4   h-100">
                    <div className="d-flex justify-content-between px-1">
                        <Brand />
                        <ProfileMenu />
                    </div>
                    <div className="make-movie-top d-flex flex-column">
                        <h1 className="make-movie-top__title">
                            Let’s Make a Movie<Span className="lets-make-movie--fact">!</Span>
                        </h1>
                        <P1 className="make-movie-top__desc mb-0">
                            Vote on every step of the movie making process,
                        </P1>
                        <P1 className="make-movie-top__desc">and earn money when the movie does</P1>
                        <div className="d-flex make-movie-top-bottom justify-content-center mt-5">
                            <Button
                                className="make-movie-top-bottom__btn btn "
                                onClick={getStartedHandler}>
                                Get started
                            </Button>
                        </div>
                    </div>
                    {/* Movie Creater Section */}
                    <div className="movie-creator-section">
                        <h1 className="movie-creator-section__title">
                            What movie do you want to help create
                            <Span className="lets-make-movie--fact">?</Span>
                        </h1>
                        <div className="container my-5">
                            {videoPopup && (
                                <LetsMakeVideoPopup
                                    src={films[showCards].src}
                                    poster={films[showCards].poster}
                                    show={videoPopup}
                                    setShow={setVideoPopup}
                                />
                            )}
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
                                            Prev 1
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
                                        <FormGroup>
                                            <RadioGroup
                                                aria-label="gender"
                                                name="gender1"
                                                value={value}
                                                onChange={handleChange}>
                                                <FormControlLabel
                                                    value="female"
                                                    control={<GreenRadio />}
                                                    label="Birth of ArtBot, IO travels time and space to save great works of art."
                                                />
                                                <div className="movie-creator-section--line" />
                                                <FormControlLabel
                                                    value="male"
                                                    control={<GreenRadio />}
                                                    label="Ninja Cats, two apprentice ninjas head down different paths"
                                                />
                                                <div className="movie-creator-section--line" />

                                                <FormControlLabel
                                                    value="other"
                                                    control={<GreenRadio />}
                                                    label="The Last Humans, live-action brother and sister survival"
                                                />
                                                <div className="movie-creator-section--line" />

                                                <FormControlLabel
                                                    value="disabled"
                                                    control={<GreenRadio />}
                                                    label="Saving Ai, sci-fi save the girl save the world"
                                                />
                                            </RadioGroup>
                                        </FormGroup>
                                        <div className="d-flex justify-content-end">
                                            <Button className="btn movie-creator-section__vote">
                                                Vote
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Crowdfunding platform */}
                    <div className="crowdfunding-platform" ref={movieCreatorRef}>
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
                                                there will be a new poll where the community will
                                                decide which direction the movie will take. First we
                                                will narrow down to 1 movie idea. Then we will vote
                                                on different story arcs. Then we will vote on
                                                character designs, and keep voting on every step
                                                until we complete the movie.
                                            </P1>
                                            <P1 className="mb-3 crowdfunding-platform-desc">
                                                You also have the opportunity to financially back
                                                the movie in exchange for rights to a portion of the
                                                movie’s royalty pool. Earn money when the movie
                                                does! When the backing campaign finishes, NFTs
                                                (non-fungible tokens) will be created and
                                                distributed to all the backers (don’t know what NFTs
                                                are? Click here to find out more - We can also fully
                                                manage your NFT if that’s your preference.). These
                                                NFTs will represent your rights to a percentage of
                                                the royalty pool, proportional to the amount backed.
                                                As the movie earns money, money will automatically
                                                be distributed to your wallet. 80-100% of the
                                                movie’s revenue will be put into the royalty pool!
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
                    <div className="donate-section my-md-5 my-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <P1 className="mb-0 donate-section-title">
                                        How backing works
                                        <Span className="lets-make-movie--fact">?</Span>
                                    </P1>
                                </div>
                                <div className="col-md-4"></div>
                                <div className="col-md-4"></div>
                            </div>
                            <div className="row my-5">
                                <div className="col-md-4">
                                    <div className="d-flex donate-section-card flex-column align-items-center">
                                        <Img
                                            src="/img/1.png"
                                            className=" donate-section-card--img"
                                        />
                                        <P1 className="mb-0 mt-5 donate-section-card--desc">
                                            Choose your backing amount. Each tier has different
                                            benefits.
                                        </P1>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="d-flex donate-section-card flex-column align-items-center">
                                        <Img
                                            src="/img/2.png"
                                            className=" donate-section-card--img"
                                        />
                                        <P1 className="mb-0 mt-5 donate-section-card--desc center">
                                            Vote and discuss with the community on every step of the
                                            movie making process.
                                        </P1>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="d-flex donate-section-card flex-column align-items-center">
                                        <Img
                                            src="/img/3.png"
                                            className=" donate-section-card--img"
                                        />
                                        <P1 className="mb-0 mt-5 donate-section-card--desc">
                                            Receive NFTs and earn money when the movie does.
                                        </P1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* How much donate */}
                    <div className="much-donate mt-5">
                        <div className="container">
                            <P1 className="much-donate-title">
                                How much do you want to back
                                <Span className="lets-make-movie--fact">?</Span>
                            </P1>
                            <div className="row ">
                                {packages.map((item, i) => (
                                    <div key={i} className="col-md-4">
                                        <DonateCard
                                            index={i}
                                            title={item.title}
                                            price={item.price}
                                            originalPrice={item.originalPrice}
                                            total={item.total}
                                            benefits={benefits}
                                            leftPrice={item.desc}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mx-5 pr-4">
                            <P1 onClick={backToTopHandler} className="mb-5 mr-3  pointer top">
                                <ReactIcons.IoIosArrowUp size={30} />
                            </P1>
                        </div>
                        <div className="mt-4">
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </Layout>
    );
}

export default ThreeDAnimation;
