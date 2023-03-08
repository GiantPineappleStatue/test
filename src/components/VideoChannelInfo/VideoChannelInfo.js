import React from 'react';
import P1 from '../UI/P1/P1';
import Img from '../UI/Img/Img';
import Button from '../UI/Button/Button';
import Rating from '@material-ui/lab/Rating/Rating';
import VideoReportDialog from '../VideoReportDialog/VideoReportDialog';
import DownloadDropDown from '../DownloadDropDown/DownloadDropDown';
import SubscriptionDropdown from '../SubscriptionDropdown/SubscriptionDropdown';
import { addRating } from '../../services/util';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import SubscriptionDropdownIndependent from '../SubscriptionDropDownIndependent/SubscriptionDropDownIndependent';
import ProfilePlaylistPopup from '../ProfilePlaylistsPopup/ProfilePlaylistPopup';
import Icons from '../UI/ReactIcons/ReactIcons';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

const VideoChannelInfo = ({
    title,
    rating,
    user,
    ratingCount,
    userId,
    follow,
    followHandler,
    content_type,
    id,
    downloadHandler,
    price,
    subscriberOnly,
    onSuccess,
    onError,
    onSuccessDownload
}) => {
    const history = useRouter();
    const [report, setRreport] = React.useState(false);
    const [subscription, setSubscription] = React.useState(false);
    const [ratingUpdate, setRatingUpdate] = React.useState({ value: 0, count: 0 });
    const [videoQuality, setVideoQuality] = React.useState('360');
    const [playlist, setPlaylist] = React.useState(false);
    const ratingHandler = async (nextValue) => {
        const rating = await addRating({
            userId: userId,
            videoId: id,
            rating: nextValue
        });
        if (rating.code === 'ABT0000') {
            setRatingUpdate({
                value: rating.media.rating,
                count: rating.media.ratingCount
            });
        }
    };
    return (
        <div>
            <div className="container-fluid d-none d-sm-block video-info bg-primary-light my-2 position-relative">
                <ProfilePlaylistPopup
                    open={playlist}
                    mediaId={id}
                    type={content_type}
                    handleClose={() => setPlaylist(false)}
                />
                {report && <VideoReportDialog content_type={content_type} id={id} />}
                <div className="row  pt-3 pb-1 px-2">
                    <div className="col-2 col-sm-1">
                        <div
                            className={`video-info__icon-container  mt-sm-3 mt-xl-1 d-flex justify-content-xl-end ${clsx(
                                {
                                    'mt-2': subscription
                                }
                            )}`}>
                            <Img
                                style={{ objectFit: 'cover', width: '50px', height: '50px' }}
                                src={
                                    user?.profile_photo
                                        ? `https://artbot.mypinata.cloud/ipfs/${user.profile_photo}?img-width=50&img-height=50`
                                        : 'https://www.w3schools.com/howto/img_avatar.png'
                                }
                                className="border-radius-20  video-info__icon "
                            />
                        </div>
                    </div>
                    <div className="col-10 col-sm-7 col-md-6 col-xl-7  my-md-auto">
                        <P1 className="h3 font-weight-normal video-info__title text-white">
                            {title}
                        </P1>
                        <div className="d-flex video-info__info">
                            <P1 className="mb-0">
                                by{' '}
                                <span
                                    className="text-white pointer"
                                    onClick={() => history.push(`/profile/${user._id}`)}>
                                    {user?.username}
                                </span>
                            </P1>
                            <div className="d-flex align-items-start ">
                                <div className="line mx-md-2 mx-1" />
                                <Rating
                                    className={`${clsx({
                                        'color-blue': content_type === 'video',
                                        'color-purple': content_type === 'audio',
                                        'color-green': content_type === 'image'
                                    })}`}
                                    name="read-only"
                                    value={ratingUpdate.value !== 0 ? ratingUpdate.value : rating}
                                    onChange={(event, newValue) => ratingHandler(newValue)}
                                />
                                {/* <span
                                    className={`video-info__rating ${clsx({
                                        'color-blue': content_type === 'video',
                                        'color-purple': content_type === 'audio',
                                        'color-green': content_type === 'image'
                                    })} my-md-0`}>
                                    {ratingUpdate.value !== 0 ? ratingUpdate.value : rating}
                                </span> */}
                                {(ratingCount > 0 || ratingUpdate.count > 0) && (
                                    <span className="text-white">
                                        &nbsp;(
                                        {ratingUpdate.count !== 0
                                            ? ratingUpdate.count
                                            : ratingCount}
                                        )
                                    </span>
                                )}
                            </div>
                            <div className="d-flex  ">
                                <div className="line mx-md-2 mx-1" />
                                <P1
                                    className=" ml-1 video-info__report mb-0 my-auto my-md-0  pointer"
                                    onClick={() => setRreport(!report)}>
                                    Report
                                </P1>

                                {userId && <Tooltip title="Add to Playlist"  placement="bottom">
                                    <button 
                                    onClick={() => setPlaylist(!playlist)}
                                    className="btn pt-0 ml-1 bg-transparnt">
                                    <Icons.MdPlaylistAdd color={'#B3ACCF'} size={19} />
                                    </button>
                                </Tooltip>}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mb-1 mb-sm-0 col-sm-4 col-md-5 col-xl-4 my-sm-auto ">
                        <div className={`d-flex justify-content-end align-items-start `}>
                            {/* <Button
							className={`btn ${content_type === 'video' && 'bg-color-blue'} ${content_type === 'audio' &&
								'bg-color-purple'} btn-primary video-info__btn ml-md-3 btn-sm rounded-pill p-1  px-md-4 py-md-2`}
						>
							Subscribe - 1.2M
						</Button> */}
                            <Button
                                className={`btn  ${content_type === 'video' && 'bg-color-blue'} ${
                                    content_type === 'audio' && 'bg-color-purple'
                                } ${
                                    content_type === 'image' && 'bg-color-green border-green'
                                }  btn-primary video-info__btn  rounded-10 px-md-1 ${
                                    !follow ? 'px-md-5  px-xl-5 ' : 'px-md-4  px-xl-5'
                                } `}
                                onClick={followHandler}>
                                {follow ? 'Following' : 'Follow'}
                            </Button>

                            {price && price !== 0 ? (
                                <div className="flex-grow-11 d-flex flex-column ml-2">
                                    <DownloadDropDown
                                        videoQuality={videoQuality}
                                        videoQualityHandler={setVideoQuality}
                                        content_type={content_type}
                                        subscriptionHandler={setSubscription}
                                        subscription={subscription}
                                        downloadHandler={downloadHandler}
                                        price={price}
                                        onSuccessDownload={onSuccessDownload}
                                        onError={onError}
                                    />
                                    <SubscriptionDropdown
                                        subscriptions={user?.subscriptions}
                                        userId={user?._id}
                                        onSuccess={onSuccess}
                                        onError={onError}
                                        subscription={subscription}
                                        content_type={content_type}
                                    />
                                </div>
                            ) : (
                                <SubscriptionDropdownIndependent
                                    userId={user?._id}
                                    subscriptions={user?.subscriptions}
                                    onSuccess={onSuccess}
                                    onError={onError}
                                    subscription={subscription}
                                    content_type={content_type}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid d-block d-sm-none my-2 video-info video-info-mobile ">
                <P1 className="h5 font-weight-normal  text-white">{title}</P1>
                <div className="d-flex">
                    <Rating
                        className={`${clsx({
                            'color-blue': content_type === 'video',
                            'color-purple': content_type === 'audio',
                            'color-green': content_type === 'image'
                        })}`}
                        name="read-only"
                        value={ratingUpdate.value !== 0 ? ratingUpdate.value : rating}
                        onChange={(event, newValue) => ratingHandler(newValue)}
                    />
                    <span
                        className={`video-info__rating ${clsx({
                            'color-blue': content_type === 'video',
                            'color-purple': content_type === 'audio',
                            'color-green': content_type === 'image'
                        })} my-md-0`}>
                        {ratingUpdate.value !== 0 ? ratingUpdate.value : rating}
                    </span>{' '}
                    <div className="line mx-1" />
                    <P1
                        className=" ml-1 video-info__report mb-1   pointer"
                        onClick={() => setRreport(!report)}>
                        Report
                    </P1>
                    {user._id && content_type === 'video' && (
                        <P1
                            className=" ml-1 text-white video-info__report mb-0 my-auto my-md-0  pointer"
                            onClick={() => setPlaylist(!playlist)}>
                            <Icons.MdPlaylistAdd className="ml-1" color={'#B3ACCF'} size={16} /> Save
                        </P1>
                    )}
                </div>
                <div className="video-info-mobile__line" />
                <div className="d-flex justify-content-between p-2">
                    <div className={`video-info-mobile__icon-container d-flex align-items-center`}>
                        <Img
                            style={{ objectFit: 'cover', width: '50px', height: '50px' }}
                            src={
                                user?.profile_photo
                                    ? `https://artbot.mypinata.cloud/ipfs/${user.profile_photo}?img-width=50&img-height=50`
                                    : 'https://www.w3schools.com/howto/img_avatar.png'
                            }
                            className="border-radius-20  video-info__icon "
                        />
                        <P1
                            className="text-white pl-2 text-capitalize font-weight-bold pointer"
                            onClick={() => history.push(`/profile/${user._id}`)}>
                            {user?.username}
                        </P1>
                    </div>
                    <div className={`d-flex justify-content-end align-items-start `}>
                        {/* <Button
							className={`btn ${content_type === 'video' && 'bg-color-blue'} ${content_type === 'audio' &&
								'bg-color-purple'} btn-primary video-info__btn ml-md-3 btn-sm rounded-pill p-1  px-md-4 py-md-2`}
						>
							Subscribe - 1.2M
						</Button> */}
                        <Button
                            className={`btn  ${content_type === 'video' && 'bg-color-blue'} ${
                                content_type === 'audio' && 'bg-color-purple'
                            } ${
                                content_type === 'image' && 'bg-color-green border-green'
                            }  btn-primary video-info__btn  rounded-10 px-md-1 ${
                                !follow ? 'px-md-5  px-xl-5 ' : 'px-md-4  px-xl-5'
                            } `}
                            onClick={followHandler}>
                            {follow ? 'Following' : 'Follow'}
                        </Button>

                        {price && price !== 0 ? (
                            <div className="flex-grow-11 d-flex flex-column ml-2">
                                <DownloadDropDown
                                    videoQuality={videoQuality}
                                    videoQualityHandler={setVideoQuality}
                                    content_type={content_type}
                                    subscriptionHandler={setSubscription}
                                    subscription={subscription}
                                    downloadHandler={downloadHandler}
                                    price={price}
                                    onSuccessDownload={onSuccessDownload}
                                    onError={onError}
                                />
                                <SubscriptionDropdown
                                    subscriptions={user?.subscriptions}
                                    userId={user?._id}
                                    onSuccess={onSuccess}
                                    onError={onError}
                                    subscription={subscription}
                                    content_type={content_type}
                                />
                            </div>
                        ) : (
                            <SubscriptionDropdownIndependent
                                userId={user?._id}
                                subscriptions={user?.subscriptions}
                                onSuccess={onSuccess}
                                onError={onError}
                                subscription={subscription}
                                content_type={content_type}
                            />
                        )}
                    </div>
                </div>
                <div className="video-info-mobile__line" />
            </div>
        </div>
    );
};

//https://www.w3schools.com/howto/img_avatar.png
// export default VideoChannelInfo;
export default React.memo(VideoChannelInfo);
