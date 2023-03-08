import React from 'react';
import * as THREE from 'three';
import P1 from '../UI/P1/P1';

import { useDispatch, useSelector } from 'react-redux';
import ReactIcons from '../UI/ReactIcons/ReactIcons';
import { letsMakeaMovieHandler } from '../../redux/actions/filterMedia';
import Brand from '../Brand/Brand';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import Head from 'next/head';
import clsx from 'clsx';
import Link from 'next/link';

function LetsMakeaMovieWrapper({
    popup,
    children,
    header,
    clickToTop,
    movieV2,
    voteDivRef,
    scrollHandler
}) {
    var camera,
        scene,
        renderer,
        stars = [],
        star;
    const divRef = React.useRef();
    const letsMakeaMovie = React.useRef();
    const user = useSelector((state) => state.auth.authToken);
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
        const movie = divRef.current.querySelector('.lets-make-movie');
        if (clickToTop) {
            const top = divRef.current.querySelector('.top');
            const movie = divRef.current.querySelector('.lets-make-movie');
            if (movie.scrollTop > 20) {
                top.style.display = 'block';
            } else {
                top.style.display = 'none';
            }
        }
        if (movieV2) {
            // scrollHandler(movie.scrollTop);
            // if (movie.scrollTop > 20) {
            //     voteDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // }
        }
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
                <div
                    ref={letsMakeaMovie}
                    className={`lets-make-movie  pl-md -4   h-100 ${clsx({
                        'overflow-hidden1 blur-effect1': popup
                    })}`}>
                    {header}
                    {children}
                    {clickToTop && (
                        <div className="d-flex justify-content-end mx-5 pr-4">
                            <P1 onClick={backToTopHandler} className="mb-5 mr-3  pointer top">
                                <ReactIcons.IoIosArrowUp size={30} />
                            </P1>
                        </div>
                    )}
                </div>
            </div>
        </div>
        // </Layout>
    );
}

LetsMakeaMovieWrapper.defaultProps = {
    clickToTop: true,
    movieV2: false,
    voteDivRef: null
};

export default LetsMakeaMovieWrapper;
