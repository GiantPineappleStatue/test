import React from 'react';
import SubscriptionCard from '../SubscriptionCard/SubscriptionCard';
import Button from '../UI/Button/Button';
import PaypalButton from '../PaypalButton/PaypalButton';
import { useSelector } from 'react-redux';
import { isSubscribe, subscribe } from '../../services/util';
import PopperUI from '../UI/PopperUI/PopperUI';

const SubscriptionDropdownIndependent = ({
    content_type,
    onSuccess,
    onError,
    subscriptions,
    userId
}) => {
    const subscriptionRef = React.useRef();
    const [open, setOpen] = React.useState(false);
    const subscr = useSelector((state) => state.profile.selectedSubscription);
    const paymentStatus = useSelector((state) => state.profile.paymentStatus);
    const user = useSelector((state) => state.auth.user);
    const [subscribed, setSubscribed] = React.useState(null);
    const [active, setActive] = React.useState(null);
    React.useEffect(() => {
        const checkSubscription = async () => {
            if (user?._id !== userId) {
                const response = await isSubscribe({ subscribe: userId });
                if (response.code === 'ABT0000') {
                    setSubscribed(response.data);
                    setActive(response.data.planId);
                }
            }
        };
        checkSubscription();
    }, [paymentStatus]);
    const subscriptionHandler = async () => {
        if (userId && user?._id !== userId && !subscribed) {
            const response = await subscribe({ subscribe: userId });
            if (response.code === 'ABT0000') setSubscribed(response.subscribe);
        }
    };
    return (
        <div>
            {subscriptions?.length === 0 ? (
                <Button
                    className={`btn mx-1 px-4 ${content_type === 'video' && 'bg-color-blue'} ${
                        content_type === 'audio' && 'bg-color-purple'
                    } ${
                        content_type === 'image' && 'bg-color-green border-green'
                    }  btn-primary video-info__btn  rounded-10   `}
                    onClick={subscriptionHandler}>
                    {subscribed?.planId
                        ? subscribed.subscribed
                            ? 'Subscribed'
                            : 'Subscribe'
                        : subscribed
                        ? 'Subscribed'
                        : 'Subscribe'}
                </Button>
            ) : (
                <Button
                    className={`btn mx-1 px-4 ${content_type === 'video' && 'bg-color-blue'} ${
                        content_type === 'audio' && 'bg-color-purple'
                    } ${
                        content_type === 'image' && 'bg-color-green border-green'
                    }  btn-primary video-info__btn  rounded-10   `}
                    onClick={() => setOpen(!open)}
                    refs={subscriptionRef}>
                    {subscribed?.planId
                        ? subscribed.subscribed
                            ? 'Subscribed'
                            : 'Subscribe'
                        : subscribed
                        ? 'Subscribed'
                        : 'Subscribe'}
                </Button>
            )}
            <PopperUI
                className="subscription-dropdown"
                anchorEl={subscriptionRef.current}
                open={open}
                setOpen={setOpen}>
                <div className="subscription-dropdown__caret" />
                <div className="d-flex ">
                    {subscriptions?.length > 0 &&
                        subscriptions.map((item, i) => (
                            <SubscriptionCard
                                key={i}
                                className="subscription-card"
                                content_type={content_type}
                                price={item.price}
                                duration={item.month}
                                title={item.title}
                                desc={item.desc}
                                _id={item._id}
                                active={active === item._id}
                                setActive={setActive}
                                current={subscribed?.planId === item._id}
                                planId={item.planId}
                            />
                        ))}
                </div>
                <div className="d-flex justify-content-center mt-1">
                    {subscr && user && user?._id !== userId && (
                        <PaypalButton onSuccess={onSuccess} onError={onError} />
                    )}
                </div>
            </PopperUI>
        </div>
    );
};
export default React.memo(SubscriptionDropdownIndependent);
