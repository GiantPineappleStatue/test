import React, { useState } from 'react';
import P1 from '../../components/UI/P1/P1';
import Label from '../../components/UI/Label/Label';
import Img from '../../components/UI/Img/Img';
import UploadTextForm from '../../components/UploadTextForm/UploadTextForm';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import {
    tagsAdd,
    albumThumbnailAdd,
    albumThumbnailRemove,
    clearState
} from '../../redux/actions/videoUpload';
import { connect } from 'react-redux';
import Progress from '../../components/UI/Progress/Progress';
import clsx from 'clsx';
import { uploadAudio, uploadAudioTrack } from '../../services/audio';
// import VideoUploadAdDetails from '../../components/VideoUploadAdDetails/VideoUploadAdDetails';
import { ipfsUpload } from '../../utils/ipfs';
import imgCompress from '../../utils/imageCompression';
import Layout from '../../components/LayoutV2/LayoutV2';
import { authInitialProps } from '../../utils/withAuth';
const AudioUpload = ({
    addTag,
    thumbnail,
    thumbnailAdd,
    thumbnailRemove,
    title,
    tags,
    genre,
    desc,
    credits,
    user,
    audioTracks,
    clear,
    price,
    paid,
    subscriptions
}) => {
    const [maturity, setMaturity] = useState(false);
    const [progress, setProgress] = useState({ value: 0, show: false, message: '' });
    const [message, setMessage] = useState({ status: 0, message: '' });
    const [subscriberOnly, setSubscriberOnly] = useState(false);
    const [suggestedTags, setSuggestedTags] = useState([
        'artbot',
        'album',
        'audio',
        'movie',
        'artbot',
        'album',
        'audio',
        'movie'
    ]);
    const uploadProgressCallback = (progress) => {
        const total = progress.total;
        const done = (progress.loaded * 100) / total;
        const progressToShow = (done * 99) / 100;
        setProgress({
            value: Math.ceil(progressToShow),
            show: true,
            message: 'Please Wait while uploading Complete ...'
        });
    };
    function _createRequest(file, isVideo) {
        return new Promise((resolve, reject) => {
            let videoData = new FormData();
            videoData.append('file', file);

            let uploadRequest = new XMLHttpRequest();
            uploadRequest.withCredentials = false;
            uploadRequest.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    const percentage = Math.round((e.loaded / e.total) * 100);
                    if (isVideo) {
                        setProgress({
                            value: percentage,
                            show: true,
                            message: 'Uploading Audio...'
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
                                setProgress({ value: 100, show: true, message: 'Audio Complete!' });
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
    const uploadAudioFiles = async () => {
        const files = [...audioTracks];
        for (let i = 0; i < audioTracks.length; i++) {
            const file = files[i];
            file.uploading = true;
            files[i] = file;
            const media = await _createRequest(file, true);
            let data = new FormData();
            data.append('file', file);
            data.append('user', user._id);
            data.append('maturityContent', maturity);
            data.append('mediaHash', media.IpfsHash);
            let responseData = await uploadAudioTrack(data);
            if (responseData.data.code === 'ABT0000') {
                file.new_name = file.name;
                file.uploading = false;
                file.uploaded = true;
                file._id = responseData.data._id;
                file.minutes = Math.floor(responseData.data.duration / 60);
                file.seconds = Math.floor(responseData.data.duration % 60);
                files[i] = file;
            } else {
                file.uploading = false;
                file.uploaded = false;
                files[i] = file;
            }
        }
        return files;
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if (thumbnail.file === null) {
            setMessage({ status: 400, message: 'Please Select Thumbnail Image' });
            return;
        }
        if (audioTracks.length === 0) {
            setMessage({ status: 400, message: 'Please Select Audios' });
            return;
        }
        setProgress({ value: 0, show: true, message: 'Connecting to Ipfs...' });
        if (process.browser) window.scrollTo(0, 0);
        let files = await uploadAudioFiles();
        let newNameArray = [];
        for (let i = 0; i < files.length; i++) {
            newNameArray.push({
                _id: files[i]._id,
                name: files[i].new_name
            });
        }
        // const d = new FormData();
        // d.append('file', thumbnail.file);
        // let imageResponse = await ipfsAdd(d);
        // const { ipfs, error } = await ipfsUpload();
        // if (error) {
        //     setMessage({ status: 400, show: true, message: 'IPFS Linking Failed' });
        //     return;
        // }
        const imgComp = await imgCompress(thumbnail.file);
        const media = await _createRequest(imgComp, false);
        if (media.path === null) {
            setMessage({ status: 400, show: true, message: 'Thumbnail Upload Failed try again' });
            return;
        }
        const data = {
            genre: genre.join(','),
            tags: tags.join(','),
            desc: desc,
            title: title,
            permlink: Math.random().toString(36).substring(2),
            thumbnailHash: media.IpfsHash,
            credits: credits,
            files: files,
            trackNewNameArray: newNameArray,
            price: price,
            paid: paid,
            subscriberOnly: subscriberOnly,
            subscription: JSON.stringify(subscriptions)
        };

        let responseData = await uploadAudio(data, uploadProgressCallback);
        if (responseData.data.code === 'ABT0000') {
            clear();
            setMessage({
                status: 200,
                message:
                    'Your Album is successfully submitted. It will appear online after admin approval.'
            });
        } else {
            setMessage({
                status: 400,
                message: 'Your Album is not uploaded due to some reasons.Try Again later'
            });
        }
        setProgress({ value: 0, show: false, message: '' });
    };
    return (
        <Layout>
            <div className="container ">
                <form onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col-md-3">
                            {thumbnail.file && (
                                <div className="d-flex flex-column">
                                    <span
                                        className="text-white pointer"
                                        onClick={() => thumbnailRemove()}>
                                        {' '}
                                        X
                                    </span>
                                    <Img src={thumbnail.url} className="img-fluid" />
                                </div>
                            )}
                            {!thumbnail.file && (
                                <div className="d-flex flex-column  rounded text-center py-4 bg-primary-light">
                                    <Img
                                        src={'/img/Video-upload-min.png'}
                                        width="30"
                                        height="30"
                                        className="mx-auto mb-4"
                                    />
                                    <P1 className="mb-1 text-light font-small">
                                        Upload Album Cover
                                    </P1>
                                    {/* <P1 className="  font-small text-black-light">Maximum sie of upload is 99 MB</P1> */}
                                    <div className="d-flex mx-auto my-2 justify-content-between">
                                        <Label
                                            htmlFor="file"
                                            className="btn bg-color-purple  rounded-10 ml-1">
                                            Upload
                                            <input
                                                onChange={(e) =>
                                                    thumbnailAdd(
                                                        e.target.files[0],
                                                        URL.createObjectURL(e.target.files[0])
                                                    )
                                                }
                                                type="file"
                                                accept="image/*"
                                                id="file"
                                                className="d-none"
                                            />
                                        </Label>
                                    </div>
                                </div>
                            )}
                            <div className="d-flex mt-2">
                                <Input
                                    type="checkbox"
                                    className="bg-transparent"
                                    required={false}
                                    onChange={() => setMaturity(!maturity)}
                                    id="matureThumbnail"
                                />
                                <Label
                                    htmlFor="matureThumbnail"
                                    className="text-white  d-inline font-weight-light ml-2">
                                    Mature thumbnail
                                </Label>
                            </div>

                            {progress.show && <Progress value={progress.value} />}
                            {progress.show && (
                                <P1 className=" mx-3 mt-3 h5 text-white mb-0">
                                    {progress.message}
                                </P1>
                            )}
                            {/* <VideoUploadAdDetails /> */}
                        </div>
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
                            <UploadTextForm
                                label={false}
                                titlePlaceHolder="Album Title"
                                titleClass="placeholder-white"
                                chipPlaceHolder="Tags"
                                subscriberOnly={subscriberOnly}
                            />
                            <div className="d-flex align-items-center flex-wrap">
                                <P1 className="h6 text-white mb-2">Suggested Tags:</P1>{' '}
                                {suggestedTags.map((tag, i) => (
                                    <P1
                                        key={i}
                                        className="form-input__feild pointer px-4 mb-2 py-1 mx-2"
                                        onClick={() => addTag(tag)}>
                                        {tag}
                                    </P1>
                                ))}
                            </div>

                            <div className="d-flex mt-2 ml-1">
                                <Input
                                    type="checkbox"
                                    className="bg-transparent"
                                    required={false}
                                    onChange={() => setMaturity(!maturity)}
                                    id="audioMature"
                                />
                                <Label
                                    htmlFor="audioMature"
                                    className="text-white  d-inline font-weight-light ">
                                    Audio contains mature content
                                </Label>
                            </div>
                            <div className="ml-1">
                                <Input
                                    type="checkbox"
                                    id="checkbox1"
                                    required={false}
                                    onChange={() => setSubscriberOnly(!subscriberOnly)}
                                />
                                <Label
                                    htmlFor="checkbox1"
                                    className="text-white d-inline font-weight-light  ">
                                    Audio is only available to subscribers
                                </Label>
                            </div>
                            <P1 className="text-light font-weight-light mb-0 mt-2">
                                Click <span className="text-white">Publish</span> to send audio for
                                approval
                            </P1>
                            <Button
                                disabled={progress.show}
                                className={`btn bg-color-purple font-14 rounded-10 mt-3 `}
                                type="submit">
                                Publish Audio
                            </Button>
                        </div>
                        <div className="col-md-1" />
                    </div>
                </form>
            </div>
        </Layout>
    );
};
AudioUpload.getInitialProps = authInitialProps('protected');

const mapStateToProps = (state) => ({
    thumbnail: state.videoUpload.albumThumbnail,
    title: state.videoUpload.title.value,
    desc: state.videoUpload.description.value,
    tags: state.videoUpload.tags,
    genre: state.videoUpload.genres,
    credits: state.videoUpload.creditArray,
    audioTracks: state.videoUpload.audioTracks,
    price: +state.videoUpload.albumPrice.value,
    paid: state.videoUpload.albumAvailablity.value,
    subscriptions: state.videoUpload.subscriptionArray,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
    addTag: (value) => dispatch(tagsAdd(value)),
    thumbnailAdd: (file, url) => dispatch(albumThumbnailAdd(file, url)),
    thumbnailRemove: () => dispatch(albumThumbnailRemove()),
    clear: () => dispatch(clearState())
});
export default connect(mapStateToProps, mapDispatchToProps)(AudioUpload);
