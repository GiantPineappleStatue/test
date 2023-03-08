import React from 'react';
import SubscriptionEditCard from '../SubscriptionEditCard/SubscriptionEditCard';
import Icons from '../UI/ReactIcons/ReactIcons';
import P1 from '../UI/P1/P1';
import { useSelector, useDispatch } from 'react-redux';
import { addSubscription } from '../../redux/actions/profile';
export default function SubscriptionSection() {
    const subscriptionArray = useSelector((state) => state.profile.subscriptions);
    const dispatch = useDispatch();
    return (
        <div className="mt-2 ml-2 monetization-subscription d-flex ">
            {subscriptionArray.map((k, i) => (
                <React.Fragment key={i}>
                    <SubscriptionEditCard edit={k.edit} index={i} item={k} />
                    <div className="monetization-subscription__vertical--line mx-2 my-5" />
                </React.Fragment>
            ))}
            <div
                onClick={() => dispatch(addSubscription())}
                style={{ minHeight: '24rem' }}
                className="d-flex flex-column monetization-subscription__card justify-content-center subscription-edit-card m-1 rounded  monetization-subscription__add">
                <Icons.GoPlus className="text-white mx-auto" size={40} />
                <P1 className="mb-0">Add Subscription</P1>
            </div>
        </div>
    );
}

//d-flex w-25 mx-25 sub-menu-bg rounded p-3 m-2 flex-column monetization-subscriptions__card
