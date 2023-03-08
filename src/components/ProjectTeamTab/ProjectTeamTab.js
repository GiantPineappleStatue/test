import React, { useState } from 'react';
import P1 from '../UI/P1/P1';
import FormInput from '../UI/FormInput/FormInput';
import { updateProject } from '../../services/project';
import Button from '../UI/Button/Button';
import clsx from 'clsx';
import SimpleSnackbar from '../UI/Snackbar/Snackbar';

const ProjectTeamTab = ({ projectId, state, dispatch, tabChange }) => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [bio, setBio] = useState('');
    const [url, setUrl] = useState('');
    const [snachbar, setSnackbar] = useState({ open: false, message: '', isEnable: false });

    // const [teamMembers, setTeamMembers] = useState([]);
    const [message, setMessage] = useState({ status: 0, message: '' });
    const { teamMembers } = state;
    const addNewMember = () => {
        if (!name || !position || !bio || !url) return;
        const team = [...teamMembers];
        team.push({ name: name, position: position, bio: bio, urls: url });
        dispatch({ type: 'SET_TEAM_MEMBERS', value: team });
        setName('');
        setPosition('');
        setBio('');
        setUrl('');
        // setTeamMembers(team);
    };
    const removeTeamMember = (index) => {
        const team = [...teamMembers];
        team.splice(index, 1);
        dispatch({ type: 'SET_TEAM_MEMBERS', value: team });

        // setTeamMembers(team);
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        setSnackbar({ open: true, message: 'Information saved now you can move to next' });

        // const response = await updateProject(projectId, { team: teamMembers });
        // if (response.code === 'ABT0000') {
        //     setMessage({ status: 200, message: 'Team added to Project' });
        // }
    };
    return (
        <div className="mx-4">
            <SimpleSnackbar
                open={snachbar.open}
                message={snachbar.message}
                handleClose={() => setSnackbar({ open: false, message: '', isEnable: true })}
            />
            <form onSubmit={submitHandler}>
                <div className="row">
                    <div className="col-md-4 my-auto">
                        <P1 className="mb-1 font-25">Project Team</P1>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-2">
                                <P1 className="mb-0">Name</P1>
                            </div>
                            <div className="col-2">
                                <P1 className="mb-0">Position</P1>
                            </div>
                            <div className="col-2">
                                <P1 className="mb-0">Bio</P1>
                            </div>
                            <div className="col-5">
                                <P1 className="mb-0">URLS</P1>
                            </div>
                            <div className="col-1"></div>
                        </div>
                        <div className="project-hr__line my-3" />
                        {teamMembers.length > 0 &&
                            teamMembers.map((item, i) => (
                                <div className="row" key={i}>
                                    <div className="col-2">
                                        <P1 className="mb-0 text-center sub-menu-bg p-2">
                                            {item.name}
                                        </P1>
                                    </div>
                                    <div className="col-2">
                                        <P1 className="mb-0 text-center sub-menu-bg p-2">
                                            {item.position}
                                        </P1>
                                    </div>
                                    <div className="col-2">
                                        <P1 className="mb-0 text-center sub-menu-bg p-2">
                                            {item.bio}
                                        </P1>
                                    </div>
                                    <div className="col-5">
                                        <P1 className="mb-0 text-center sub-menu-bg p-2">
                                            {item.urls}
                                        </P1>
                                    </div>
                                    <div className="col-1 ">
                                        <P1
                                            onClick={() => removeTeamMember(i)}
                                            className="font-weight-bold py-2 pointer">
                                            X
                                        </P1>
                                    </div>
                                </div>
                            ))}
                        <div className="project-hr__line my-3" />
                        <div className="team-form row">
                            <div className="col-md-3">
                                <FormInput
                                    required={false}
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    inputType="input"
                                />
                            </div>
                            <div className="col-md-3">
                                <FormInput
                                    required={false}
                                    name="position"
                                    type="text"
                                    value={position}
                                    onChange={(event) => setPosition(event.target.value)}
                                    inputType="input"
                                />
                            </div>
                            <div className="col-md-3">
                                <FormInput
                                    required={false}
                                    name="bio"
                                    type="text"
                                    value={bio}
                                    onChange={(event) => setBio(event.target.value)}
                                    inputType="input"
                                />
                            </div>
                            <div className="col-md-3">
                                <FormInput
                                    required={false}
                                    name="url"
                                    type="text"
                                    value={url}
                                    onChange={(event) => setUrl(event.target.value)}
                                    inputType="input"
                                />
                            </div>
                        </div>
                        <P1 onClick={addNewMember} className="sub-menu-bg text-center pointer py-2">
                            Add New Member
                        </P1>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center ml-1">
                    <P1 className="mb-0">Please Save and Hit Next to Proceed</P1>
                    <div>
                        <Button
                            type="button"
                            onClick={() => tabChange('funding')}
                            className="btn btn-primary mx-2">
                            Back
                        </Button>
                        <Button
                            type="submit"
                            disabled={projectId ? false : true}
                            className="btn btn-primary">
                            Save
                        </Button>
                        <Button
                            type="button"
                            onClick={() => tabChange('story')}
                            className="btn btn-primary mx-2">
                            Next
                        </Button>
                    </div>
                </div>
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

export default ProjectTeamTab;
