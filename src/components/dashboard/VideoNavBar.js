import React from 'react';
import P1 from '../UI/P1/P1';

function VideoNavBar({ type, changeHandler, currentCategory }) {
    // ${
    // 	clsx(
    // 		{
    // 			'b-blue': type === 'video',
    // 			'b-purple': type === 'audio',
    // 			'b-green': type === 'image'
    // 		}
    // 	)
    // }
    return (
        <div className="container-fluid px-0 row video-navbar no-gutters">
            <div className="col-10">
                <div className=" video-navbar-right d-flex align-items-center">
                    <P1
                        className={` bg-transparent font-18 video-navbar-right__item mb-0  video-navbar-right__btn text-white bg-active rounded text-capitalize `}>
                        Trending {type === 'image' ? '2D-3D' : type}
                    </P1>
                    {/* <div
						className="mx-sm-3 mx-1"
						style={{
							width: '1px'
						}}
					>
						<span
							style={{
								fontSize: '19px',
								color: '#3F3565'
							}}
						>
							|
						</span>
					</div>
					<P1
						className={`pointer video-navbar-right__item  px-sm-3 text-white mb-0  video-navbar-right__btn  rounded ${clsx(
							{
								'bg-active ': currentCategory === 'trending'
							}
						)} `}
						onClick={() => changeHandler({ type: type, category: 'trending', update: true })}
					>
						<Img
							className={`mr-1 ${clsx({ 'text-white': currentCategory === 'trending' })} `}
							id="vTrenImg"
							src={require('./img/White-Trending.png')}
							width="10"
							height="10"
						/>
						Trending
					</P1>
					<P1
						className={`pointer video-navbar-right__item  px-sm-3  mb-0 mx-1 mx-sm-3  video-navbar-right__btn text-white  rounded ${clsx(
							{
								'bg-active': currentCategory === 'top_rated'
							}
						)} `}
						onClick={() => changeHandler({ type: type, category: 'top_rated', update: true })}
					>
						<FaStar
							color={`#8A75D0`}
							className={`mr-1 mb-1 ${clsx({ 'text-white': currentCategory === 'top_rated' })} `}
						/>
						Top Rated
					</P1>
					<P1
						className={`pointer video-navbar-right__item px-1 px-sm-3  mb-0  video-navbar-right__btn text-white rounded ${clsx(
							{
								'bg-active': currentCategory === 'recently_added'
							}
						)} `}
						onClick={() => changeHandler({ type: type, category: 'recently_added', update: true })}
					>
						<FaClock
							color={`#8A75D0`}
							className={`mr-1 mb-1 ${clsx({ 'text-white': currentCategory === 'recently_added' })} `}
						/>Newest
					</P1> */}
                </div>
            </div>
            <div className="col-2">
                {/* <div className="d-flex video-navbar-left align-items-center justify-content-end">
					<Link
						to={`/${type}`}
						className="text-white video-navbar-left__item mr-md-4 flex-nowrap px-sm-3 rounded py-2 bg-active"
					>
						See all
					</Link>
				</div>  */}
            </div>
            <div className="video-navbar-line" />
        </div>
    );
}

export default VideoNavBar;
