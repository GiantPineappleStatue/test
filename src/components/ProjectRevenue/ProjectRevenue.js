import React from 'react';
import Button from '../UI/Button/Button';
import P1 from '../UI/P1/P1';

const ProjectRevenue = ({ project, amount }) => {
    const launchDate = new Date(project.compaignLaunchDate);
    const endDate = new Date(project.compaignLaunchDate);
    endDate.setDate(endDate.getDate() + project.duration);
    const projectAmount = amount || project.amountCalculated;
    const amountPercentage = ((+projectAmount / +project.goalAmount) * 100).toFixed(2);
    return (
        <div className="project-revenue w-100 mx-1 p-3">
            <P1 className="mb-1 font-25">{project.title}</P1>
            <div className="progress project-revenue-progress">
                <div
                    className="progress-bar project-revenue-progress-bar"
                    role="progressbar"
                    aria-valuenow={amountPercentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${amountPercentage}%` }}></div>
            </div>
            <P1 className="mt-1 mb-0 font-25">US$ {projectAmount?.toFixed(2)}</P1>
            <P1 className=" font-14 mb-1 project-revenue-bg">
                Revenue of US$ {project.goalAmount} Goal{' '}
            </P1>
            <P1 className="mt-1 mb-0 font-25">
                %{((+projectAmount / +project.goalAmount) * 100).toFixed(2)}
            </P1>
            <P1 className=" font-14 mb-1 project-revenue-bg">Revenue earned </P1>
            <P1 className="mt-1 mb-0 font-18">
                {launchDate.toDateString()}{' '}
                <span className="project-revenue-bg">| {launchDate.toLocaleTimeString()}</span> -{' '}
                {endDate.toDateString()}{' '}
                <span className="project-revenue-bg">|{endDate.toLocaleTimeString()}</span>
            </P1>
            <P1 className=" font-14 mb-1 project-revenue-bg">Compaign Duration </P1>
            <P1 className="mt-1 mb-0 font-25">
                {Math.ceil(Math.abs(endDate - launchDate) / (1000 * 60 * 60 * 24))}
            </P1>
            <P1 className=" font-14 mb-1 project-revenue-bg">Days to go </P1>
            <P1 className="mt-1 mb-0 font-25">{project.revenuePercentage}%</P1>
            <P1 className=" font-14 mb-1 project-revenue-bg">
                of the revenue will go back to investor
            </P1>
            <Button type="button" className="btn bg-color-purple px-4">
                Project
            </Button>
        </div>
    );
};

export default React.memo(ProjectRevenue);
