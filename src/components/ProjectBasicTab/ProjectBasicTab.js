import React, { useState, useRef } from 'react';
import P1 from '../UI/P1/P1';
import Img from '../UI/Img/Img';
import Label from '../UI/Label/Label';
import FormInput from '../UI/FormInput/FormInput';
import Button from '../UI/Button/Button';
import VideoPlayer from '../../components/UI/VideoPlayer/VideoPlayer';
import Progress from '../../components/UI/Progress/Progress';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { CountryDropdown } from 'react-country-region-selector';
import SimpleSnackbar from '../../components/UI/Snackbar/Snackbar';
import keyDown from '../../utils/numberField';
const ProjectBasicTab = ({ state, dispatch, type, tabChange }) => {
    const dateRef = useRef();
    const [progress, setProgress] = useState({ value: 0, show: false, message: '' });
    const [message, setMessage] = useState({ status: 0, message: '', isEnable: false });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', isEnable: false });
    const {
        title,
        subTitle,
        category,
        subCategory,
        location,
        duration,
        imageFile,
        videoFile,
        day,
        month,
        year,
        compaignEnd,
        audioFiles
    } = state;
    const inputChange = (e) => {
        dispatch({ type: 'INPUT_CHANGE', name: e.target.name, value: e.target.value });
    };
    const fileChange = (name, file = null, url = null) => {
        dispatch({ type: 'FILE_CHANGE', name: name, file: file, url: url });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        // if(typeof window!== undefined) window.scroll(0,0);
        if (!imageFile.file) {
            setMessage({ status: 400, message: 'Please Select Image First', isEnable: false });
            return;
        }
        const errors = [title, subTitle, category, subCategory, location].filter(
            (item) => !item.value
        );
        if (errors.length > 0) {
            setMessage({
                status: 400,
                message: 'Some Field are missing please fill first',
                isEnable: false
            });
            return;
        }
        setSnackbar({
            open: true,
            message: 'Information Saved you can move to next',
            isEnable: true
        });
        //    return setMessage({status:200,message:'Information Saved you can move to next',isEnable:true});
    };
    let files = null;
    if (videoFile.file) {
        files = (
            <div className="d-flex flex-column mt-4">
                <span className="text-white pointer" onClick={() => fileChange('videoFile')}>
                    X
                </span>
                <VideoPlayer src={videoFile.url} />
            </div>
        );
    } else if (audioFiles.length > 0) {
        files = (
            <div className="d-flex flex-column mt-4">
                <span
                    className="text-white pointer"
                    onClick={() => dispatch({ type: 'AUDIO_CHANGE', audios: [] })}>
                    X
                </span>
                <P1>You have selected {audioFiles.length + 1} audio files</P1>
            </div>
        );
    }
    return (
        <div className="project mx-4">
            <SimpleSnackbar
                message={snackbar.message}
                open={snackbar.open}
                handleClose={() => setSnackbar({ open: false, message: '' })}
            />

            <form onSubmit={submitHandler}>
                <div className="row">
                    <div className="col-6 my-auto">
                        <P1 className="mb-1 font-25">Project Title</P1>
                        <P1 className="project-subTitle">
                            Write a clear, brief title that helps people quickly understand the gist
                            of your project
                        </P1>
                    </div>
                    <div className="col-6">
                        <FormInput
                            required={true}
                            title="Title"
                            placeholder={`Enter Title`}
                            name="title"
                            type="text"
                            label={'Title'}
                            value={title.value}
                            onChange={(event) => inputChange(event)}
                            inputType="input"
                            maxLength="100"
                        />
                        <FormInput
                            required={true}
                            title="Subtitle"
                            placeholder={`Enter Subtitle`}
                            name="subTitle"
                            type="text"
                            label={true}
                            value={subTitle.value}
                            onChange={(event) => inputChange(event)}
                            inputType="input"
                        />
                    </div>
                </div>
                <div className="project-hr__line my-3" />
                <div className="row">
                    <div className="col-6">
                        <P1 className="mb-1 font-25">Project Category</P1>
                        <P1 className="project-subTitle">
                            Choose the category that most closely aligns your project
                        </P1>
                        <P1 className="project-subTitle">
                            Think of where backers may look to find it. Reach a more specfic
                            community by also choosing a subcategory
                        </P1>
                        <P1 className="project-subTitle">
                            You'll be able to change the category and subcategory even after your
                            project is live{' '}
                        </P1>
                    </div>
                    <div className="col-6">
                        <FormInput
                            required={true}
                            title="Category"
                            name="category"
                            label={true}
                            onChange={(event) => inputChange(event)}
                            inputType="select"
                            options={['category1', 'category2']}
                        />
                        <FormInput
                            required={true}
                            title="Subcategory"
                            name="subCategory"
                            label={true}
                            onChange={(event) => inputChange(event)}
                            inputType="select"
                            options={['category1', 'category2']}
                        />
                    </div>
                </div>
                <div className="project-hr__line my-3" />
                <div className="row my-2">
                    <div className="col-md-6">
                        <P1 className="mb-1 font-25">Project Location</P1>
                        <P1 className="project-subTitle">
                            {' '}
                            Enter the location that best describes where your project is based{' '}
                        </P1>
                    </div>
                    <div className="col-md-6">
                        <Label>Location</Label>
                        <CountryDropdown
                            classes="form-control  bg-transparent form-input__feild"
                            value={location.value}
                            name="location"
                            onChange={(val) =>
                                inputChange({ target: { name: 'location', value: val } })
                            }
                        />
                    </div>
                </div>
                <div className="project-hr__line my-3" />
                <div className="row">
                    <div className="col-md-6 my-auto">
                        <P1 className="mb-1 font-25">Project Image</P1>
                        <P1 className="project-subTitle mb-2">
                            Add an image that clealy reqresents your project
                        </P1>
                        <P1 className="project-subTitle mb-2">
                            You may want to avoid including banners,badges and text because they may
                            not be legible at smaller sizes.
                        </P1>
                        <P1 className="project-subTitle">
                            Your image should be atleast 1024*576 pixels. it will be cropped to a
                            16:9 ratio.
                        </P1>
                    </div>
                    <div className="col-md-6">
                        {imageFile.file ? (
                            <div>
                                <P1
                                    onClick={() => fileChange('imageFile')}
                                    className="mb-0 text-light pointer">
                                    X
                                </P1>{' '}
                                <Img src={imageFile.url} className="img-fluid" />
                            </div>
                        ) : (
                            <div className="d-flex flex-column  rounded text-center py-4 bg-primary-light">
                                <Img
                                    src={'/img/Video-upload-min.png'}
                                    width="30"
                                    height="30"
                                    className="mx-auto mb-4"
                                />
                                <P1 className="mb-1 text-light">
                                    Drag an image here, or select a file
                                </P1>
                                <P1 className="mb-1 font-small project-subHeading__color">
                                    It must be JPG,PNG,GIF,TIFF,or BMP, no larger then 200 MB
                                </P1>
                                {/* <P1 className="  font-small text-black-light">Maximum sie of upload is 99 MB</P1> */}
                                <div className="d-flex mx-auto my-2 justify-content-between">
                                    <Label
                                        htmlFor="imgFile"
                                        className="btn bg-color-purple  rounded-10 ml-1">
                                        Upload
                                    </Label>
                                    <input
                                        onChange={(e) =>
                                            fileChange(
                                                'imageFile',
                                                e.target.files[0],
                                                URL.createObjectURL(e.target.files[0])
                                            )
                                        }
                                        type="file"
                                        accept="image/*"
                                        id="imgFile"
                                        className="d-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="project-hr__line my-3" />
                <div className="row">
                    <div className="col-md-6 my-auto">
                        <P1 className="mb-1 font-25">
                            Project <span className="text-capitalize">{type}</span> (optional)
                        </P1>
                        <P1 className="project-subTitle mb-2">
                            Add an video that describe your project
                        </P1>
                        <P1 className="project-subTitle mb-2">
                            Tell people what you're raising funds to do, how you plan to make it
                            happen, who you are, and why you care about this project
                        </P1>
                    </div>
                    <div className="col-md-6">
                        {files ? (
                            files
                        ) : (
                            <div className="d-flex flex-column  rounded text-center py-4 bg-primary-light">
                                <Img
                                    src={'/img/Video-upload-min.png'}
                                    width="30"
                                    height="30"
                                    className="mx-auto mb-4"
                                />
                                <P1 className="mb-1 text-light">
                                    Drag an <span className="text-capitalize">{type}</span> here, or
                                    select a file
                                </P1>
                                <P1 className="mb-1 font-small project-subHeading__color">
                                    It must be a{' '}
                                    {type === 'video' ? 'MOV,MPEG,AVI,MP4,3GP,WMV,or FLY,' : 'MP3'}{' '}
                                    no larger than 5120 MB.
                                </P1>
                                <div className="d-flex mx-auto my-2 justify-content-between">
                                    <Label
                                        htmlFor="file1"
                                        className="btn bg-color-purple  rounded-10 ml-1">
                                        Upload
                                    </Label>
                                    <input
                                        onChange={(e) => {
                                            if (type === 'video') {
                                                fileChange(
                                                    'videoFile',
                                                    e.target.files[0],
                                                    URL.createObjectURL(e.target.files[0])
                                                );
                                            } else {
                                                dispatch({
                                                    type: 'AUDIO_CHANGE',
                                                    audios: e.target.files
                                                });
                                            }
                                        }}
                                        type="file"
                                        accept={
                                            type === 'video'
                                                ? 'video/mp4,video/x-m4v,video/*'
                                                : 'audio/*'
                                        }
                                        id="file1"
                                        className="d-none"
                                        multiple={type === 'video' ? false : true}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="project-hr__line my-3" />
                <div className="row">
                    <div className="col-md-6 my-auto">
                        <P1 className="mb-1 font-25">Compaign launch date (optional)</P1>
                        <P1 className="project-subTitle ">
                            Enter a date when you plan to launch-you can always return to his after
                            you're built out more of your Kickstarter project page.
                        </P1>
                        <P1 className="project-subTitle mb-2">
                            We won't automatically launch your project.
                        </P1>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex align-items-end">
                            <FormInput
                                placeholder="DD"
                                title="Day"
                                label={true}
                                min="1"
                                max="30"
                                pattern="[0-9]{2}"
                                name="day"
                                type="number"
                                value={day.value}
                                onChange={(event) => inputChange(event)}
                                inputType="input"
                            />
                            <FormInput
                                placeholder={'MM'}
                                title="Month"
                                label={true}
                                min="1"
                                max="12"
                                name="month"
                                type="number"
                                value={month.value}
                                onChange={(event) => inputChange(event)}
                                inputType="input"
                            />
                            <FormInput
                                placeholder={'YY'}
                                title="Year"
                                label={true}
                                name="year"
                                min="1900"
                                max="9999"
                                type="number"
                                value={year.value}
                                onChange={(event) => inputChange(event)}
                                inputType="input"
                            />
                            <Label
                                onClick={() => document.getElementById('date-field').click()}
                                htmlFor="date-field"
                                className="mb-2 ml-2">
                                {/* <i className="fas pointer font-25 fa-calendar-week mb-0"></i> */}
                            </Label>

                            <input
                                ref={dateRef}
                                id="date-field"
                                type="date"
                                onChange={(e) => console.log(e.target.value)}
                                className="d-none"
                            />
                        </div>
                        {(year.error || month.error || day.error) && (
                            <small className="text-danger">Date Error</small>
                        )}
                    </div>
                </div>
                <div className="project-hr__line my-3" />
                <div className="row">
                    <div className="col-md-6">
                        <P1 className="mb-1 font-25">Compaign Duration</P1>
                        <P1 className="project-subTitle ">
                            Enter the location that best describe where your project is bases
                        </P1>
                    </div>
                    <div className="col-md-6">
                        <P1 className="mb-1 text-light font-14">Duration</P1>
                        <div className="project-compaign-duration form-input__feild">
                            <P1 className="project-compaign-duration__top text-light bg-primary-light p-3">
                                Fixed number of days (1-60)
                            </P1>
                            <div className="project-compaign-duration__bottom mx-2 mb-2 ">
                                <P1 className="mb-1 font-14">Enter number of days</P1>
                                <FormInput
                                    onKeyDown={keyDown}
                                    required={false}
                                    name="duration"
                                    type="number"
                                    min="0"
                                    step="1"
                                    max="60"
                                    label={false}
                                    value={duration.value}
                                    onChange={(event) => inputChange(event)}
                                    inputType="input"
                                />
                                {duration.error && (
                                    <small className="text-danger">Please enter valid days</small>
                                )}
                            </div>
                        </div>
                        <div className="d-flex align-items-center bg-primary-light p-2">
                            <input
                                type="radio"
                                checked={compaignEnd}
                                name="compaignEnd"
                                onChange={(e) =>
                                    dispatch({
                                        type: 'RADIO_INPUT',
                                        name: e.target.name,
                                        checked: e.target.checked
                                    })
                                }
                            />
                            <P1 className="project-compaign-duration__top bg-primary-light mb-0 ml-2">
                                {' '}
                                End on a specfic date and time
                            </P1>
                        </div>
                    </div>
                </div>
                <div className="project-hr__line my-3" />
                <div className="d-flex justify-content-between align-items-center">
                    <P1 className="mb-0"> Please Save and Hit Next to Proceed</P1>
                    <div>
                        <Button type="submit" className="btn bg-color-blue px-4">
                            Save
                        </Button>
                        <Button
                            type="button"
                            onClick={() => tabChange('funding')}
                            disabled={!snackbar.isEnable}
                            className="btn bg-color-blue mx-2 px-4">
                            Next
                        </Button>
                    </div>
                </div>
                {progress.show && <Progress value={progress.value} />}
                {progress.show && (
                    <P1 className=" mx-3 mt-3 h5 text-white mb-0">{progress.message}</P1>
                )}
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
            </form>
        </div>
    );
};

export default ProjectBasicTab;
