import React from 'react';
import Button from '../UI/Button/Button';
const StripeCheckout = React.lazy(() => import('react-stripe-checkout'));

const StripeButton = ({ amount, onSuccess }) => (
    <React.Suspense fallback={<div>Loading....</div>}>
        <StripeCheckout
            amount={amount * 100}
            stripeKey="pk_test_51HgYidLkOu6EGbwkJgfxRqmDSD6SfIxdWkgFs12RDfU8ZGHzEIsFyWZHid5pYA42O4hsG3r9mSOAhurdLu4duIYQ00b11rp7Sk"
            token={onSuccess}>
            <Button type="button" className="btn bg-color-purple ">
                {' '}
                Donate
            </Button>
        </StripeCheckout>
    </React.Suspense>
);

export default StripeButton;
