/* eslint-disable react/display-name */
import React from 'react';
// import PaypalExpressBtn from 'react-paypal-express-checkout';
import { useSelector } from 'react-redux';
// import { PayPalButton } from 'react-paypal-button-v2';
const StripeCheckout = React.lazy(() => import('react-stripe-checkout'));
// eslint-disable-next-line no-unused-vars
export default React.forwardRef(({ onSuccess, onError, price }, ref) => {
    const amount = useSelector((state) => state?.profile?.selectedSubscription?.price);
    const payableAmount = price ? price * 100 : amount * 100;

    return (
        <React.Suspense fallback={<div>Loading....</div>}>
            <StripeCheckout
                amount={+payableAmount.toFixed(2)}
                stripeKey="pk_test_51HgYidLkOu6EGbwkJgfxRqmDSD6SfIxdWkgFs12RDfU8ZGHzEIsFyWZHid5pYA42O4hsG3r9mSOAhurdLu4duIYQ00b11rp7Sk"
                token={onSuccess}>
                <button ref={ref} className="btn btn-primary">
                    {' '}
                    Pay with Credit Card
                </button>
            </StripeCheckout>
        </React.Suspense>
    );
    // return (
    // 	<PayPalButton
    // 		options={{
    // 			clientId: 'AfR6BY5ANuIRs9lp3IW-zbrQ_W3zgud0E70BZyLaGpYb29CCI1BMl29DRJZsHPDaPOBcknQ0Pt2Igqi9',
    // 			vault: true
    // 		}}
    // 		createSubscription={function(data, actions) {
    // 			return actions.subscription.create({
    // 				plan_id: amount
    // 			});
    // 		}}
    // 		onApprove={onSuccess}
    // 		onError={onError}
    // 		style={{ color: 'blue', tagline: false, label: 'subscribe' }}
    // 	/>
    // );
    // <PaypalExpressBtn
    // 	env={'sandbox'}
    // 	client={{
    // 		sandbox: 'AfR6BY5ANuIRs9lp3IW-zbrQ_W3zgud0E70BZyLaGpYb29CCI1BMl29DRJZsHPDaPOBcknQ0Pt2Igqi9',
    // 		production: 'AXXJEDlTRsCndj219Wy97_gPNSEVFzfZ7oigM5Vb3KJD-pvkx1qmwW_zg3SL0k-qLqSZxGxdQGAAoKHp'
    // 	}}
    // 	currency={'USD'}
    // 	total={+amount}
    // 	onError={onError}
    // 	onSuccess={onSuccess}
    // 	style={{ color: 'blue', tagline: false, label: 'pay' }}
    // />
});
