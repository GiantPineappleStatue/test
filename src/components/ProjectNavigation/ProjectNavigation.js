import clsx from 'clsx';
import P1 from '../UI/P1/P1';

const ProjectNavigation = ({ active, changehandler }) => {
    return (
        <div className=" profile-navigation mt-3 d-flex flex-wrap align-content-center justify-content-between flex-wrap mb-4">
            <div className="d-flex flex-wrap align-items-center">
                <P1
                    onClick={() => changehandler('basics')}
                    className={`text-light ${clsx({
                        'rounded sub-menu-bg': active === 'basics'
                    })}`}>
                    Basics
                </P1>
                <P1
                    onClick={() => changehandler('funding')}
                    className={`text-light ${clsx({
                        'rounded sub-menu-bg ': active === 'funding'
                    })}`}>
                    Funding
                </P1>
                <P1
                    onClick={() => changehandler('people')}
                    className={`text-light ${clsx({
                        'rounded sub-menu-bg ': active === 'people'
                    })}`}>
                    People
                </P1>

                <P1
                    onClick={() => changehandler('story')}
                    className={`text-light ${clsx({
                        'rounded sub-menu-bg ': active === 'story'
                    })}`}>
                    Story
                </P1>

                <P1
                    onClick={() => changehandler('payment')}
                    className={`text-light ${clsx({
                        'rounded sub-menu-bg ': active === 'payment'
                    })}`}>
                    Payment
                </P1>
            </div>
        </div>
    );
};

export default ProjectNavigation;
