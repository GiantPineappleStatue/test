import React from 'react';
import SubscriptionSection from '../SubscriptionSection/SubscriptionSection';
import P1 from '../UI/P1/P1';
import Button from '../UI/Button/Button';
import { updateProfile } from '../../services/util';
import { useSelector } from 'react-redux';

const ProfileMonetization = () => {
    const subscriptions = useSelector((state) => state.profile.subscriptions);
    const saveHandler = async () => {
        const res = await updateProfile({
            subscriptions: JSON.stringify(subscriptions)
        });
        console.log(res);
    };
    return (
        <div className="container-fluid monetization">
            {/** Subscritpions Section */}
            <div className="monetization-subscriptions mb-5">
                <P1 className="mb-2 rounded monetization-title  text-white d-inline-block pointer px-3 py-2 ">
                    Subscriptions
                </P1>
                <div className="horizontal-line" />
                <SubscriptionSection />
                <Button className="btn btn-primary ml-2 mt-2" onClick={saveHandler}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default React.memo(ProfileMonetization);
