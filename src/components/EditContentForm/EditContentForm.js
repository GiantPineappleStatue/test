import React, { useRef } from 'react';
import { connect } from 'react-redux';
import Img from '../UI/Img/Img';
import Label from '../UI/Label/Label';
import P1 from '../UI/P1/P1';
import {
    tagsAdd,
    albumThumbnailAdd,
    albumThumbnailRemove,
    clearState,
    videoFile,
    addThumbnail,
    clearUrl
} from '../../redux/actions/videoUpload';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import UploadTextForm from '../UploadTextForm/UploadTextForm';

function EditContentForm({
    submitHandler,
    bgColor,
    type,
    message,
    maturity,
    setMaturity,
    addTag,
    thumbnailAdd,
    thumbnailRemove,
    thumbnail,
    videoFile,
    video,
    videoUrl,
    videoThumbnailUrl,
    clearUrl,
    addThumbnail,
    subscriberOnly,
    setSubscriberOnly
}) {
    const [suggestedTags, setSuggestedTags] = React.useState([
        'artbot',
        'album',
        'Album',
        'movie',
        'artbot',
        'album',
        'audio',
        'movie'
    ]);
    const videoRef = useRef();
    const canvas = useRef();
    const captureImage = () => {
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
        addThumbnail(b);
    };
    return (
        <div className="container">
            <form onSubmit={(e) => submitHandler(e)}>
                <div className="row">
                    <div className="col-md-3">
                        {thumbnail.url && !videoUrl && (
                            <div className="d-flex flex-column position-relative">
                                <Img src={thumbnail.url} className="img-fluid position-relative" />
                                <div className="d-flex justify-content-center mt-1">
                                    <Label
                                        htmlFor="imageThumbnail"
                                        className={`btn ${bgColor}   rounded-10 ml-1`}>
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
                                            id="imageThumbnail"
                                            className="d-none"
                                        />
                                    </Label>
                                </div>
                            </div>
                        )}
                        {/* {videoUrl && (
							<div className="d-flex flex-column mt-4">
								<span className="text-white pointer" onClick={clearUrl}>
									X
								</span>
								<Player
									fluid={true}
									ref={videoRef}
									src={videoUrl}
									width="550"
									height="500"
									autoPlay
									playsInline
								>
									<LoadingSpinner />
								</Player>
								<div className="d-flex mx-auto my-2 justify-content-between">
									<Label
										className={`btn ${videoThumbnailUrl
											? 'bg-color-blue text-white'
											: 'btn-outline-secondary text-black-light'}  btn-sm rounded-10`}
										onClick={captureImage}
									>
										{videoThumbnailUrl ? 'Selected' : 'Select Screenshot'}
									</Label>
								</div>
								<canvas ref={canvas} hidden />
							</div>
						)} */}
                        {!thumbnail.url && (
                            <div className="d-flex flex-column  rounded text-center py-4 bg-primary-light">
                                <Img
                                    src={'/img/Video-upload-min.png'}
                                    width="30"
                                    height="30"
                                    className="mx-auto mb-4"
                                />
                                <P1 className="mb-1 text-light font-small">Upload Album Cover</P1>
                                <P1 className="  font-small text-black-light">
                                    Maximum size of upload is 99 MB
                                </P1>
                                <div className="d-flex mx-auto my-2 justify-content-between">
                                    {type === 'Video' && (
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
                                    )}
                                    {!type === 'Video' && (
                                        <Label
                                            htmlFor="imageThumbnail"
                                            className={`btn ${bgColor}   rounded-10 ml-1`}>
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
                                                id="imageThumbnail"
                                                className="d-none"
                                            />
                                        </Label>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="d-flex mt-2">
                            <Input
                                type="checkbox"
                                className="bg-transparent"
                                required={false}
                                onChange={() => setMaturity(!maturity)}
                                id="checkbo1"
                            />
                            <Label
                                htmlFor="checkbo1"
                                className="text-white  d-inline font-weight-light ml-2">
                                Mature Thumbnail
                            </Label>
                        </div>
                        {message.message && (
                            <P1 className="text-light font-16 mb-1">{message.message}</P1>
                        )}
                    </div>
                    <div className="col-md-8">
                        <UploadTextForm
                            label={false}
                            titlePlaceHolder="Album Title"
                            titleClass="placeholder-white"
                            chipPlaceHolder="Tags"
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

                        <div className="d-flex mt-2">
                            <Input
                                value={maturity}
                                type="checkbox"
                                className="bg-transparent"
                                required={false}
                                onChange={() => setMaturity(!maturity)}
                                id="checkbo2"
                            />
                            <Label
                                htmlFor="checkbo2"
                                className="text-light d-inline font-weight-light ml-2">
                                {type} contains mature content (Language, Violance, Sextual content,
                                Nudity Drugs)
                            </Label>
                        </div>
                        <div className="d-flex mt-2">
                            <Input
                                checked={subscriberOnly}
                                type="checkbox"
                                className="bg-transparent"
                                required={false}
                                // onChange={(e) => console.log(e.target.checked)}
                                onChange={(e) => setSubscriberOnly(!subscriberOnly)}
                                id="checkbo3"
                            />
                            <Label
                                htmlFor="checkbo3"
                                className="text-light d-inline font-weight-light ml-2">
                                {type} is only available to subscribers
                            </Label>
                        </div>

                        <Button className={`btn bg-light  rounded-10 mt-3 `}>Undo Changes </Button>
                        <Button
                            disabled={message.loading}
                            className={`btn  mx-1 ${bgColor}  rounded-10 mt-3 `}
                            type="submit">
                            Save Changes{' '}
                        </Button>
                    </div>
                    <div className="col-md-1" />
                </div>
            </form>
        </div>
    );
}
const mapStateToProps = (state) => ({
    video: state.videoUpload.videoFile,
    videoUrl: state.videoUpload.videoFileUrl,
    thumbnail: state.videoUpload.albumThumbnail,
    videoThumbnailUrl: state.videoUpload.thumbnail,
    title: state.videoUpload.title.value,
    desc: state.videoUpload.description.value,
    tags: state.videoUpload.tags,
    genre: state.videoUpload.genres,
    user: state.auth.user
});
const mapDispatchToProps = (dispatch) => ({
    videoFile: (file, url) => dispatch(videoFile(file, url)),
    addTag: (value) => dispatch(tagsAdd(value)),
    thumbnailAdd: (file, url) => dispatch(albumThumbnailAdd(file, url)),
    thumbnailRemove: () => dispatch(albumThumbnailRemove()),
    addThumbnail: (url) => dispatch(addThumbnail(url)),
    clearUrl: () => dispatch(clearUrl()),
    clear: () => dispatch(clearState())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContentForm);
