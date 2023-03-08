import React from 'react';
import SubscriptionCard from '../SubscriptionCard/SubscriptionCard';
import Button from '../UI/Button/Button';
import clsx from 'clsx';
import PaypalButton from '../PaypalButton/PaypalButton';
import { useSelector } from 'react-redux';
import PopperUI from '../UI/PopperUI/PopperUI';
import { isSubscribe, subscribe } from '../../services/util';

export default function SubscriptionDropdown({
    content_type,
    subscription,
    onSuccess,
    onError,
    subscriptions,
    userId
}) {
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
        <div className={`flex-grow-1  `}>
            {subscriptions?.length === 0 ? (
                <Button
                    className={`btn flex-grow-1 ${clsx({
                        'opacity-0': !subscription,
                        'opacity-1': subscription
                    })} subscription-dropdown__btn w-100 w-md-75   ${
                        content_type === 'video' && 'bg-color-blue-light'
                    } ${content_type === 'audio' && 'bg-color-purple-light'} ${
                        content_type === 'image' && 'bg-color-green-light border-green-light'
                    }   video-info__btn px-4 p-1 px-xl-4  `}
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
                    className={`btn flex-grow-1 ${clsx({
                        'opacity-0': !subscription,
                        'opacity-1': subscription
                    })} subscription-dropdown__btn w-100 w-md-75   ${
                        content_type === 'video' && 'bg-color-blue-light'
                    } ${content_type === 'audio' && 'bg-color-purple-light'} ${
                        content_type === 'image' && 'bg-color-green-light border-green-light'
                    }   video-info__btn px-4 p-1 px-xl-4  `}
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
                    {' '}
                    {subscr && user && user?._id !== userId && (
                        <PaypalButton onSuccess={onSuccess} onError={onError} />
                    )}
                </div>
            </PopperUI>
            {/* <Popper
				className="subscription-dropdown rounded"
				placement="bottom-end"
				open={open}
				anchorEl={subscriptionRef.current}
				role={undefined}
				transition
				disablePortal={true}
				modifiers={{
					flip: {
						enabled: false,
					},
					preventOverflow: {
						enabled: true,
						boundariesElement: 'window',
					},
					arrow: {
						enabled: true,
						element: subscriptionRef.current,
					},
				}}
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin: 'right'
						}}
					>
						<Paper className="rounded-0 p-3 ">
							<ClickAwayListener onClickAway={() => setOpen(false)}>
								<MenuList autoFocusItem={open} id="menu-list-grow">
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
												/>
											))}
										
									</div>
									<div className="d-flex justify-content-center mt-1">
										{' '}
										{(subscr && user && user?._id!==userId) && <PaypalButton onSuccess={onSuccess} onError={onError} />}
									</div>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper> */}
        </div>
    );
}
