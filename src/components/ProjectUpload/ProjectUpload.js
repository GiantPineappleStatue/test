import React, { useEffect, useState, useReducer } from 'react';

import Layout from '../Layout/Layout';
import { subheaderChange } from '../../redux/actions/videoCategory';
import { useDispatch, useSelector } from 'react-redux';
import ProjectNavigation from '../ProjectNavigation/ProjectNavigation';
import ProjectBasicTab from '../ProjectBasicTab/ProjectBasicTab';
import ProjectStoryTab from '../ProjectStoryTab/ProjectStoryTab';
import ProjectTeamTab from '../ProjectTeamTab/ProjectTeamTab';
import ProjectFundingTab from '../ProjectFundingTab/ProjectFundingTab';
import ProjectPaymentTab from '../ProjectPaymentTab/ProjectPaymentTab';
import Progress from '../UI/Progress/Progress';
import P1 from '../UI/P1/P1';
import { createProject } from '../../services/project';
import clsx from 'clsx';
import { uploadAudioTrack } from '../../services/audio';

const initialState = {
    title: {
        value: '',
        touch: false,
        error: false
    },
    subTitle: {
        value: '',
        touch: false,
        error: false
    },
    category: {
        value: 'category 1',
        touch: false,
        error: false
    },
    subCategory: {
        value: 'category 2',
        touch: false,
        error: false
    },
    location: {
        value: '',
        touch: false,
        error: false
    },
    imageFile: { file: null, url: null },
    videoFile: { file: null, url: null },
    image: '',
    video: '',
    date: '',
    day: {
        value: '',
        touch: false,
        error: false,
        validate: /(0[1-9]|[12]\d|3[01])/
    },
    month: {
        value: '',
        touch: false,
        error: false,
        validate: /^(0?[1-9]|1[012])$/
    },
    year: {
        value: '',
        touch: false,
        error: false,
        validate: /^(19|20)\d{2}$/
    },
    duration: {
        value: '',
        touch: false,
        error: false,
        validate: /^(?:[1-9]\d*|\d)$/
    },
    compaignEnd: false,
    audioFiles: [],
    amount: {
        value: '',
        touch: false,
        error: false,
        validate: /^[0-9]\d*$/
    },
    percentage: {
        value: '',
        touch: false,
        error: false,
        validate: /^[0-9]\d*$/
    },
    projectEndDate: {
        value: '',
        touch: false,
        error: false
    },
    projectStartDate: {
        value: '',
        touch: false,
        error: false
    },
    teamMembers: [],
    description: {
        value: '',
        touch: false,
        error: false
    },
    riskAndChallanges: {
        value: '',
        touch: false,
        error: false
    },
    fundingGoal: {
        value: '',
        touch: false,
        error: false
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    value: action.value,
                    error: !state[action.name]?.validate?.test(action.value)
                }
            };
        case 'FILE_CHANGE':
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    url: action.url,
                    file: action.file
                }
            };
        case 'RADIO_INPUT':
            return {
                ...state,
                [action.name]: action.checked
            };
        case 'AUDIO_CHANGE':
            return {
                ...state,
                audioFiles: action.audios
            };
        case 'SET_TEAM_MEMBERS':
            return {
                ...state,
                teamMembers: action.value
            };
        default:
            break;
    }
};

const ProjectUpload = ({ type }) => {
    const user = useSelector((state) => state.auth.user);
    const [projectId, setProjectId] = useState(null);
    const [active, setActive] = useState('basics');
    const [state, dispatchReduce] = useReducer(reducer, initialState);
    const [message, setMessage] = useState({ status: 0, message: '' });
    const [progress, setProgress] = useState({
        value: 0,
        show: false,
        message: ``
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(subheaderChange());
        return () => {
            dispatch(subheaderChange());
        };
    }, []);
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
        audioFiles,
        amount,
        percentage,
        projectStartDate,
        projectEndDate,
        teamMembers,
        description,
        riskAndChallanges,
        fundingGoal
    } = state;
    const submitProjectHandler = async () => {
        const imageHash = await _createRequest(imageFile.file, 'Image');
        let videoHash = null;
        let audios = null;
        if (videoFile.file) {
            videoHash = await _createRequest(videoFile.file, 'Video');
        }
        if (audioFiles.length > 0) {
            audios = await uploadAudioFiles();
            audios = audios.map((item) => item._id);
        }
        setProgress({ ...progress, message: 'Please wait...' });

        const data = {
            title: title.value,
            subTitle: subTitle.value,
            category: category.value,
            subCategory: subCategory.value,
            location: location.value,
            imageHash: imageHash.IpfsHash,
            videoHash: videoHash ? videoHash.IpfsHash : '',
            compaignLaunchDate: `${year.value}-${month.value}-${day.value}T00:00:00.000Z`,
            duration: duration.value,
            compaignEnd: compaignEnd,
            type: type,
            audios: audios,
            goalAmount: amount.value,
            revenuePercentage: percentage.value,
            startDate: projectStartDate.value,
            endDate: projectEndDate.value,
            team: teamMembers,
            description: description.value,
            riskAndChallanges: riskAndChallanges.value,
            fundingGoal: fundingGoal.value
        };
        const response = await createProject(data);
        if (response.code === 'ABT0000') {
            setProgress({ value: 0, show: false, message: '' });
            setMessage({ status: 200, message: 'Project added Successfully' });
            window.scroll(0, 0);
        }
    };
    function _createRequest(file, type) {
        return new Promise((resolve, reject) => {
            let videoData = new FormData();
            videoData.append('file', file);
            // videoData.append('hold_time', holdTime);

            let uploadRequest = new XMLHttpRequest();
            uploadRequest.withCredentials = false;
            uploadRequest.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    const percentage = Math.round((e.loaded / e.total) * 100);

                    setProgress({
                        value: percentage,
                        show: true,
                        message: `Uploading ${type} ...`
                    });
                }
            };

            uploadRequest.addEventListener(
                'readystatechange',
                function () {
                    if (uploadRequest.readyState === 4) {
                        let result = JSON.parse(uploadRequest.responseText);
                        if (result.IpfsHash) {
                            setProgress({ value: 100, show: true, message: `${type} Complete!` });
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
    const uploadAudioFiles = async () => {
        const files = [...audioFiles];
        for (let i = 0; i < audioFiles.length; i++) {
            const file = files[i];
            file.uploading = true;
            files[i] = file;
            const media = await _createRequest(file, 'Audio');
            let data = new FormData();
            data.append('file', file);
            data.append('user', user._id);
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

    return (
        <Layout title="Project">
            <ProjectNavigation active={active} changehandler={setActive} />
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
            {active === 'basics' && (
                <ProjectBasicTab
                    state={state}
                    dispatch={dispatchReduce}
                    tabChange={setActive}
                    type={type}
                    setProjectId={setProjectId}
                />
            )}
            {active === 'story' && (
                <ProjectStoryTab
                    state={state}
                    dispatch={dispatchReduce}
                    tabChange={setActive}
                    projectId={projectId}
                />
            )}
            {active === 'people' && (
                <ProjectTeamTab
                    projectId={83}
                    state={state}
                    dispatch={dispatchReduce}
                    tabChange={setActive}
                />
            )}
            {active === 'funding' && (
                <ProjectFundingTab
                    state={state}
                    dispatch={dispatchReduce}
                    tabChange={setActive}
                    projectId={projectId}
                />
            )}
            {active === 'payment' && (
                <ProjectPaymentTab
                    tabChange={setActive}
                    saveFunding={submitProjectHandler}
                    state={state}
                    dispatch={dispatchReduce}
                    projectId={projectId}
                />
            )}
            {progress.show && <Progress value={progress.value} />}
            {progress.show && <P1 className=" mx-3 mt-3 h5 text-white mb-0">{progress.message}</P1>}
        </Layout>
    );
};

export default ProjectUpload;
