import React, { useState } from 'react';
import P1 from '../UI/P1/P1';
import FormInput from '../UI/FormInput/FormInput';
import Button from '../UI/Button/Button';
import { updateProject } from '../../services/project';
import clsx from 'clsx';
import SimpleSnackbar from '../UI/Snackbar/Snackbar';

const ProjectFundingTab = ({ projectId, state, dispatch, tabChange }) => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', isEnable: false });

    const [message, setMessage] = useState({ status: 0, message: '', isEnable: false });
    const { amount, percentage, projectEndDate, projectStartDate } = state;
    const submitHandler = async (e) => {
        e.preventDefault();

        const errors = [amount, percentage].filter((item) => !item.value || item.error);
        if (errors.length > 0) {
            setMessage({
                status: 400,
                message: 'Some fields are missing please fill first',
                isEnable: false
            });
            return;
        }
        setSnackbar({
            open: true,
            message: 'Information saved now you can move to next',
            isEnable: true
        });

        // setMessage({status:200,message:'Information saved now you can move next',isEnable:true})
    };
    const inputChange = (e) => {
        dispatch({ type: 'INPUT_CHANGE', name: e.target.name, value: e.target.value });
    };
    return (
        <div className="mx-4">
            <SimpleSnackbar
                open={snackbar.open}
                message={snackbar.message}
                handleClose={() => setSnackbar({ open: false, message: '', isEnable: true })}
            />

            <form onSubmit={submitHandler}>
                <div className="row">
                    <div className="col-md-6">
                        <P1 className="mb-3 font-25">Funding goal</P1>
                        <P1 className="project-subTitle mb-4">
                            Set an achievable goal that covers what you need to complete your
                            project.
                        </P1>
                        <P1 className="project-subTitle">
                            Funding is all-or-nothing. if you don't meet your goal, you won't
                            receive any money.
                        </P1>
                    </div>
                    <div className="col-md-6 mt-auto">
                        <FormInput
                            required={true}
                            title="Goal Amount"
                            label={true}
                            min="0"
                            name="amount"
                            type="number"
                            value={amount.value}
                            onChange={(event) => inputChange(event)}
                            inputType="input"
                        />
                        {amount.error && (
                            <small className="text-danger">Please Enter Valid Number</small>
                        )}
                    </div>
                </div>
                <div className="project-hr__line my-4" />

                <div className="row">
                    <div className="col-md-6">
                        <P1 className="mb-3 font-25">
                            Percentage of Project Revenue Distributed to Backer
                        </P1>
                        <P1 className="project-subTitle mb-4">
                            For the backers that help you reach your funding goal, this percentage
                            of ArtBot revenue from your project will be distributed back to these
                            users in proportion to the amount of money they pleged.
                        </P1>
                    </div>
                    <div className="col-md-6 mt-2">
                        <FormInput
                            required={false}
                            min="0"
                            max="100"
                            // pattern={}
                            title="Revenue Percentage"
                            label={true}
                            name="percentage"
                            type="number"
                            value={percentage.value}
                            onChange={(event) => inputChange(event)}
                            inputType="input"
                        />
                        {percentage.error && (
                            <small className="text-danger">Please Enter Valid Number</small>
                        )}
                    </div>
                </div>
                <div className="project-hr__line my-4" />
                <div className="row">
                    <div className="col-md-6 my-auto">
                        <P1 className="mb-3 font-25">Project Date</P1>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-between flex-wrap">
                            <FormInput
                                title="Start Date"
                                label={true}
                                name="projectStartDate"
                                type="datetime-local"
                                value={projectStartDate.value}
                                onChange={(event) => inputChange(event)}
                                inputType="input"
                            />
                            <FormInput
                                title="End Date"
                                label={true}
                                name="projectEndDate"
                                type="datetime-local"
                                value={projectEndDate.value}
                                onChange={(event) => inputChange(event)}
                                inputType="input"
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center ml-1">
                    <P1 className="mb-0">Please Save and Hit Next to Proceed</P1>

                    <div>
                        <Button
                            onClick={() => tabChange('basics')}
                            type="button"
                            className="btn btn-primary mx-2">
                            Back
                        </Button>
                        <Button type="submit" className="btn btn-primary">
                            Save
                        </Button>
                        <Button
                            onClick={() => tabChange('people')}
                            type="button"
                            className="btn btn-primary mx-2"
                            disabled={!snackbar.isEnable}>
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

export default ProjectFundingTab;
