import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
    videoFile,
    clearUrl,
    addThumbnail,
    clearState,
    subscriptionEdit
} from '../../redux/actions/videoUpload';
import P1 from '../../components/UI/P1/P1';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import UploadTextForm from '../../components/UploadTextForm/UploadTextForm';
import Label from '../../components/UI/Label/Label';
import Img from '../../components/UI/Img/Img';
import clsx from 'clsx';
import Progress from '../../components/UI/Progress/Progress';
import { uploadVideoInfo } from '../../services/video';
import imgCompress from '../../utils/imageCompression';
import VideoPlayer from '../../components/UI/VideoPlayer/VideoPlayer';
import Layout from '../../components/LayoutV2/LayoutV2';
import { authInitialProps } from '../../utils/withAuth';
const DEFAULT_HOLD_TIME = 1; //(month)

const VideoUploadPage = (props) => {
    const videoRef = useRef();
    const canvas = useRef();
    const [images, setImages] = useState([]);
    const [maturity, setMaturity] = useState(false);
    const [subscriberOnly, setSubscriberOnly] = useState(false);
    const [progress, setProgress] = useState({ value: 0, show: false, message: '' });
    const [message, setMessage] = useState({ status: 0, message: '' });

    const captureImage = () => {
        const { addThumbnailHandler } = props;
        canvas.current.width = videoRef.current.video.videoWidth;
        canvas.current.height = videoRef.current.video.videoHeight;
        const ctx = canvas.current.getContext('2d');
        ctx.drawImage(
            videoRef.current.video.video,
            0,
            0,
            videoRef.current.video.videoWidth,
            videoRef.current.video.videoHeight
        );
        let url = canvas.current.toDataURL('image/jpeg').replace(/^data:image\/\w+;base64,/, '');
        const base64 = new Buffer(url, 'base64');
        const b = new File([base64], 'image', { type: 'image/jpeg' });
        addThumbnailHandler(b);
    };

    function _createRequest(file, holdTime, isVideo) {
        return new Promise((resolve, reject) => {
            let videoData = new FormData();
            videoData.append('file', file);
            // videoData.append('hold_time', holdTime);

            let uploadRequest = new XMLHttpRequest();
            uploadRequest.withCredentials = false;
            uploadRequest.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    const percentage = Math.round((e.loaded / e.total) * 100);
                    if (isVideo) {
                        setProgress({
                            value: percentage,
                            show: true,
                            message: 'Uploading Video...'
                        });
                    } else {
                        setProgress({
                            value: percentage,
                            show: true,
                            message: 'Uploading Thumbnail...'
                        });
                    }
                }
            };

            uploadRequest.addEventListener(
                'readystatechange',
                function () {
                    if (uploadRequest.readyState === 4) {
                        let result = JSON.parse(uploadRequest.responseText);
                        if (result.IpfsHash) {
                            if (isVideo) {
                                setProgress({ value: 100, show: true, message: 'Video Complete!' });
                            } else {
                                setProgress({
                                    value: 100,
                                    show: true,
                                    message: 'Thumbnail Complete!'
                                });
                            }
                            resolve(result);
                        } else {
                            reject();
                        }
                    }
                }.bind(this)
            );

            uploadRequest.open('POST', 'https://api.pinata.cloud/pinning/pinFileToIPFS');
            // uploadRequest.setRequestHeader("Content-Type", `multipart/form-data`);

            uploadRequest.setRequestHeader(
                'pinata_api_key',
                process.env.NEXT_PUBLIC_PINATA_PUBLIC_KEY
            );
            uploadRequest.setRequestHeader(
                'pinata_secret_api_key',
                process.env.NEXT_PUBLIC_PINATA_PRIVATE_KEY
            );
            uploadRequest.send(videoData);
        });
    }

    const progressCallBack = (progress) => {
        const total = progress.total;
        const videoTotal = 99;
        const videoDone = (progress.loaded * 100) / total;
        const progressToShow = (videoDone * videoTotal) / 100;
        setProgress({
            value: Math.ceil(progressToShow),
            show: true,
            message: 'Please Wait while uploading Complete ...'
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const {
            thumbnail,
            title,
            description,
            tags,
            genre,
            video,
            credits,
            price,
            paid,
            subscriptions
        } = props;
        if (!thumbnail) {
            setMessage({ status: 400, message: 'Please select Thumbnail first' });
            return;
        }
        if (price && price < 1) {
            setMessage({ status: 400, message: 'Download price should be positive number' });
            return;
        }
        setProgress({ value: 0, show: true, message: 'Uploading Thumbnail...' });
        const imgComp = await imgCompress(thumbnail);
        const thumbnailPromise = _createRequest(imgComp, DEFAULT_HOLD_TIME, false);
        thumbnailPromise
            .then((thumbnailHash) => {
                setProgress({ value: 0, show: true, message: 'Uploading Video...' });
                const videoPromise = _createRequest(video, DEFAULT_HOLD_TIME, true);
                videoPromise
                    .then(async (videoHash) => {
                        const duration = videoRef.current.getState().player.duration;
                        const data = {
                            video: {
                                originalname: video.name,
                                size: video.size,
                                hash: videoHash.IpfsHash
                            },
                            genre: genre.join(','),
                            tags: tags.join(','),
                            title: title.value,
                            desc: description.value,
                            thumbnailSize: thumbnail.size,
                            thumbnailHash: thumbnailHash.IpfsHash,
                            thumbnailName: '',
                            permLink: Math.random().toString(36).substring(2),
                            duration: duration,
                            credits: JSON.stringify(credits),
                            price: price,
                            paid: paid,
                            subscriberOnly: subscriberOnly,
                            subscription: JSON.stringify(subscriptions)
                        };
                        const responseData = await uploadVideoInfo(data, progressCallBack);
                        if (responseData.data.code === 'ABT0000') {
                            setMessage({
                                status: 200,
                                message:
                                    'Your video is successfully submitted. It will appear online after admin approval.'
                            });
                            props.clear();
                        } else {
                            setMessage({
                                status: 400,
                                message: 'Something went wrong please try again later.'
                            });
                        }
                        setProgress({ value: 0, show: false, message: '' });
                        if (process.browser) window.scrollTo(0, 0);
                    })
                    .catch((error) => {
                        setMessage({
                            status: 400,
                            message: 'Something went wrong please try again later.'
                        });
                        setProgress({ value: 0, show: false, message: '' });
                        console.log(error);
                    });
            })
            .catch((error) => {
                setProgress({ value: 0, show: false, message: '' });
                setMessage({
                    status: 400,
                    message: 'Something went wrong please try again later.'
                });
                console.log(error);
            });
    };
    const imageHandler = (file) => {
        const { addThumbnailHandler } = props;
        addThumbnailHandler(file);
    };
    const { videoFile, videoUrl, clearUrl, thumbnail } = props;

    return (
        <Layout>
            <div className="container-fluid">
                <form onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col-md-8">
                            {message.status !== 0 && (
                                <div
                                    className={`alert ${clsx({
                                        'alert-primary': message.status === 200,
                                        'alert-danger': message.status === 400
                                    })}  alert-dismissible fade show`}
                                    role="alert">
                                    {message.message}
                                </div>
                            )}
                            <UploadTextForm label={true} subscriberOnly={subscriberOnly} />

                            {/** Video upload maturity */}
                            <div className="d-flex">
                                <div className="mr-2">
                                    <Input
                                        type="checkbox"
                                        id="checkbo"
                                        required={false}
                                        onChange={() => setMaturity(!maturity)}
                                    />
                                    <Label
                                        htmlFor="checkbo"
                                        className="text-white d-inline font-weight-light  ">
                                        Video contains mature content
                                    </Label>
                                </div>
                                <div className="mr-2">
                                    <Input
                                        type="checkbox"
                                        id="checkbox1"
                                        required={false}
                                        onChange={() => setSubscriberOnly(!subscriberOnly)}
                                    />
                                    <Label
                                        htmlFor="checkbox1"
                                        className="text-white d-inline font-weight-light  ">
                                        Video is only available to subscribers
                                    </Label>
                                </div>
                            </div>
                            {progress.show && <Progress value={progress.value} />}
                            {progress.show && (
                                <P1 className=" mx-3 mt-3 h5 text-white mb-0">
                                    {progress.message}
                                </P1>
                            )}

                            <Button
                                className={`btn bg-color-blue rounded-10 mt-3 ${
                                    progress.show && 'bg-secondary'
                                }`}
                                type="submit"
                                disabled={progress.show}>
                                Publish Video
                            </Button>
                        </div>
                        <div className="col-md-4">
                            {/** Upload Video Component */}
                            {!videoUrl && (
                                <div className="d-flex flex-column mt-4 rounded text-center py-4 bg-primary-light">
                                    <Img
                                        src={'/img/Video-upload-min.png'}
                                        width="30"
                                        height="30"
                                        className="mx-auto mb-2"
                                    />
                                    <P1 className="mb-0 text-light font-small">
                                        Upload From Computer
                                    </P1>
                                    {/* <P1 className="mb-0  font-small text-black-light">Maximum sie of upload is 99 MB</P1> */}
                                    <div className="d-flex mx-auto my-2 justify-content-center">
                                        <Label
                                            htmlFor="file"
                                            className="btn bg-color-blue  rounded-10 ml-1">
                                            Upload
                                            <input
                                                onChange={(e) =>
                                                    videoFile(
                                                        e.target.files[0],
                                                        URL.createObjectURL(e.target.files[0])
                                                    )
                                                }
                                                type="file"
                                                accept="video/mp4,video/x-m4v,video/*"
                                                id="file"
                                                className="d-none"
                                            />
                                        </Label>
                                    </div>
                                </div>
                            )}
                            {videoUrl && (
                                <div className="d-flex flex-column mt-4">
                                    <span className="text-white pointer" onClick={clearUrl}>
                                        X
                                    </span>
                                    <VideoPlayer ref={videoRef} src={videoUrl} />
                                    <div className="d-flex mx-auto my-2 justify-content-between">
                                        <Label
                                            className={`btn btn-outline-secondary text-black-light  btn-sm rounded-10`}
                                            onClick={captureImage}>
                                            Select Screenshot
                                        </Label>
                                        {thumbnail && (
                                            <Label
                                                className={`btn bg-color-blue text-white  btn-sm rounded-10`}>
                                                Selected
                                            </Label>
                                        )}
                                    </div>
                                    <canvas ref={canvas} hidden />
                                </div>
                            )}
                            {/** Upload From Youtube */}
                            {/* <div className="d-flex flex-column mt-3 px-2 rounded text-center py-4 bg-primary-light">
							<P1 className=" text-light font-small">Embed From YouTube</P1>
							<Input
								required={false}
								type="text"
								className="bg-transparent py-2 form-input__feild placeholder"
								placeholder="YouTube Link"
							/>
							<div className="d-flex mx-auto my-2 justify-content-center">
								<Button className="btn bg-color-blue btn-sm rounded-10 ml-1">Upload</Button>
							</div>
						</div> */}
                            {/** Upload Thumbnail */}
                            <div className="d-flex mt-3 flex-column ">
                                <P1 className=" mb-0  text-light ">Thumbnail</P1>
                                <P1 className=" text-black-light  ">
                                    Select a screenshot or upload an image
                                </P1>
                                <div className="d-flex justify-content-between">
                                    {images.length > 0 &&
                                        images.map((image, i) => (
                                            <div
                                                key={i}
                                                style={{ width: '140px', height: '110px' }}
                                                className="pointer position-relative"
                                                onClick={() => console.log(i)}>
                                                <Img
                                                    src={URL.createObjectURL(image.src)}
                                                    className="w-100 h-100 position-relative"
                                                />
                                                <span
                                                    className="position-absolute "
                                                    style={{ right: '45%', top: '45%' }}>
                                                    Hii
                                                </span>
                                            </div>
                                        ))}
                                    <Label className="bg-primary-light text-center p-5 pointer">
                                        <Img
                                            src={'/img/Image-upload-min.png'}
                                            className="mx-auto"
                                            width="30"
                                            height="20"
                                        />
                                        <small className="mb-0 text-white font-weight-light d-block  text-capitalize">
                                            UPLOAD IMAGE
                                        </small>
                                        <input
                                            onChange={(e) => {
                                                imageHandler(e.target.files[0]);
                                                setImages([
                                                    // ...images,
                                                    { file: true, src: e.target.files[0] }
                                                ]);
                                            }}
                                            type="file"
                                            accept="image/x-png,image/gif,image/jpeg"
                                            id="videoFile"
                                            className="d-none"
                                        />
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    video: state.videoUpload.videoFile,
    videoUrl: state.videoUpload.videoFileUrl,
    thumbnail: state.videoUpload.thumbnail,
    title: state.videoUpload.title,
    description: state.videoUpload.description,
    tags: state.videoUpload.tags,
    genre: state.videoUpload.genres,
    credits: state.videoUpload.creditArray,
    price: +state.videoUpload.albumPrice.value,
    paid: state.videoUpload.albumAvailablity.value,
    subscriptions: state.videoUpload.subscriptionArray,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
    videoFile: (file, url) => dispatch(videoFile(file, url)),
    clearUrl: () => dispatch(clearUrl()),
    addThumbnailHandler: (url) => dispatch(addThumbnail(url)),
    clear: () => dispatch(clearState())
});

VideoUploadPage.getInitialProps = authInitialProps('protected');

export default connect(mapStateToProps, mapDispatchToProps)(VideoUploadPage);
