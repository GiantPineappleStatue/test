import React, { useState } from 'react';
import P1 from '../UI/P1/P1';
import dynamic from 'next/dynamic';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { updateProject } from '../../services/project';
import clsx from 'clsx';
import SimpleSnackbar from '../UI/Snackbar/Snackbar';
const CkEditor = dynamic(() => import('../UI/CkEditor/CkEditor'), { ssr: false });

const ProjectStoryTab = ({ projectId, state, dispatch, tabChange }) => {
    const [snachbar, setSnackbar] = useState({ open: false, message: '', isEnable: true });
    const [message, setMessage] = useState({ status: 0, message: '', isEnable: false });
    const { description, riskAndChallanges } = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        // if(typeof window!=="undefined") window.scroll(0,0);
        if (!description.value) {
            setMessage({
                status: 400,
                message: 'Some Fields are missing please enter value',
                isEnable: false
            });
            return;
        }
        setSnackbar({
            open: true,
            message: 'Information saved now you can move to next',
            isEnable: true
        });
        // setMessage({status:200,message:'Information saved now you can move to next',isEnable:true});
        return;
        if (!projectId) return;
        const data = {
            description: description,
            riskAndChallanges: riskAndChallanges
        };
        const res = await updateProject(projectId, data);
        if (res.code === 'ABT0000') {
            setMessage({ status: 200, message: 'Summary added to Project' });
        }
    };
    return (
        <div className="project-story mx-4">
            <SimpleSnackbar
                open={snachbar.open}
                message={snachbar.message}
                handleClose={() => setSnackbar({ open: false, message: '', isEnable: true })}
            />
            <form onSubmit={submitHandler}>
                <div className="row">
                    <div className="col-6 ">
                        <P1 className="mb-1 font-25">Project summary (optional)</P1>
                        <P1 className="project-subTitle">
                            Answer three basic questions about your project so that readers can get
                            a quick sense of what it is. Your responses will display promenently
                            above your project description.
                        </P1>
                        <P1 className="project-subTitle">
                            This is an experiment that could raise your backer count, so only half
                            of your visitors will see it.
                        </P1>
                    </div>
                    <div className="col-md-6">
                        <P1 className=" my-3 bg-primary-light text-light p-3">
                            <Input type="radio" /> &nbsp;Include this on my project
                        </P1>
                    </div>
                </div>
                <div className="project-hr__line my-3" />

                <div className="row">
                    <div className="col-6 ">
                        <P1 className="mb-1 font-25">Project Description</P1>
                        <P1 className="project-subTitle">
                            Describe what you are raising funds to do. why you care about it. how
                            you plan to make it happen, and who are you. Your description should
                            tell backers everything they need to know. if possible, include images
                            to shpow them what your project is all about and what rewards look like.
                        </P1>
                    </div>
                    <div className="col-md-6">
                        <CkEditor
                            data={''}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                dispatch({
                                    type: 'INPUT_CHANGE',
                                    name: 'description',
                                    value: data
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="project-hr__line my-3" />

                <div className="row">
                    <div className="col-6 ">
                        <P1 className="mb-1 font-25">Risk and challanges </P1>
                        <P1 className="project-subTitle">
                            Be honest about the potential risks and challanges of this project and
                            how you plan to overcome them to complete it.
                        </P1>
                    </div>
                    <div className="col-md-6">
                        <CkEditor
                            data={''}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                dispatch({
                                    type: 'INPUT_CHANGE',
                                    name: 'riskAndChallanges',
                                    value: data
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="project-hr__line my-3" />
                <div className="d-flex justify-content-between align-items-center">
                    <P1 className="mb-0"> Please Save and Hit Next to Proceed</P1>
                    <div>
                        <Button
                            onClick={() => tabChange('people')}
                            type="submit"
                            className="btn mx-2 bg-color-purple">
                            Next
                        </Button>
                        <Button type="submit" className="btn bg-color-purple">
                            Save
                        </Button>
                        <Button
                            onClick={() => tabChange('payment')}
                            disabled={!snachbar.isEnable}
                            type="submit"
                            className="btn mx-2 bg-color-purple">
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

export default ProjectStoryTab;
