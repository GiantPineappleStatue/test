import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
    createFundingPaymentHistory,
    wallet,
    changeTierHandler,
    getOneUser
} from '../services/util';
import P1 from '../components/UI/P1/P1';
import Button from '../components/UI/Button/Button';
import { getAllPlans } from '../services/movie';
import DonateCard from '../components/DonateCard/DonateCard';
import { changeBacking, updateUser } from '../redux/reducers/auth.duck';
import FormInput from '../components/UI/FormInput/FormInput';
import LetsMakeaMovieWrapper from '../components/LetsMakeaMovieWrapper/LetsMakeaMovieWrapper';
const ProfileBacking = () => {
    const [packages, setPackages] = useState([]);
    const [price, setPrice] = React.useState(0);
    const [balance, setBalance] = React.useState(0);
    const [planArr, setPlanArr] = useState([]);
    const [selectedTier, setSelectedTier] = useState('');
    const [location, setLocation] = useState('');
    const formRef = React.useRef();
    const user = useSelector((state) => state.auth);
    const [changeTier, setChangeTier] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const { backing } = user?.user || { backing: { tier: '' } };

    React.useEffect(() => {
        if (price) {
            const plan = packages.find((item) => item.priceId === price);
            localStorage.setItem('pay', true);
            localStorage.setItem('price', plan.price);
            localStorage.setItem('planId', plan._id);
            localStorage.setItem('planTitle', plan.title);
            setLocation(window?.location?.href);
            setTimeout(() => formRef.current.submit(), 1000);
        }
    }, [price]);
    React.useEffect(() => {
        const { success } = router.query;
        const pay = JSON.parse(localStorage.getItem('pay'));
        if (success && pay) {
            localStorage.setItem('pay', false);
            createPaymentHistory();
        }
        getUserWallet();
    }, []);
    async function getUserWallet() {
        const res = await wallet();
        if (res.code === 'ABT0000') {
            setBalance({ ...res.wallet });
            getPlans();
        }
    }

    const createPaymentHistory = async () => {
        const price = localStorage.getItem('price');
        const planId = localStorage.getItem('planId');
        const planTitle = localStorage.getItem('planTitle');

        const reqData = {
            transactionId: '',
            paymentMethod: 'stripe',
            paid: true,
            email: user.user.email,
            user: user.user._id,
            payTo: '5f0de0fb57fce500203473bb',
            amount: price,
            paymentFor: 'croudfunding',
            planId: planId
        };

        dispatch(changeBacking(price, planTitle));
        localStorage.removeItem('price');
        localStorage.removeItem('planId');
        localStorage.removeItem('planTitle');
        await createFundingPaymentHistory(reqData);
        getPlans();
    };
    const donateHandler = (id, price) => {
        setPrice(price);
    };
    const getPlans = async () => {
        const data = await getAllPlans();
        if (data.code === 'ABT0000') {
            setPackages([...data.plans]);
            const plans = data.plans
                .filter((item) => item.price <= balance.referralAmount)
                .map((item) => item.title);
            setPlanArr(plans);
        }
    };
    const changePlan = async () => {
        if (selectedTier) {
            const plan = packages.find((item) => item.title === selectedTier);
            const data = await changeTierHandler({ planId: plan._id });
            if (data.code === 'ABT0000') {
                setChangeTier(false);
                const data = await getOneUser();
                dispatch(updateUser(data.user));
            }
        }
    };
    const totalBacking = (backing?.amount + balance?.referralAmount).toFixed(2);
    let refinedPackages = packages.findIndex((item) => item.title === backing?.tier);
    refinedPackages = packages.slice(refinedPackages + 1);
    return (
        <LetsMakeaMovieWrapper>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <P1 className="text-white h6 mb-3">Backing Amount</P1>
                        <P1 className="profile-sub-navigation__item-active py-4 color-blue px-3 mb-4 ">
                            ${backing.amount}
                        </P1>
                        {/* <P1 className="text-white h6 mb-3">Wallet Balance</P1>
                        <P1 className="profile-sub-navigation__item-active py-4 color-blue px-3 mb-4 ">
                            {balance?.balance?.toFixed(2)} $
                        </P1> */}
                        <P1 className="text-white h6 mb-3">Referral Credit</P1>
                        <P1 className="profile-sub-navigation__item-active py-4 color-blue px-3 mb-4 ">
                            ${balance?.referralAmount}
                        </P1>
                        <P1 className="text-white h6 mb-3">Total Backing Credit</P1>
                        <P1 className="profile-sub-navigation__item-active py-4 color-blue px-3 mb-4 ">
                            ${totalBacking}
                        </P1>
                        {!changeTier && (
                            <>
                                {' '}
                                <P1 className="text-white h6 mb-3">Backing Tier</P1>
                                <P1 className="profile-sub-navigation__item-active py-4 color-blue px-3 mb-4 ">
                                    {backing.tier}
                                </P1>
                            </>
                        )}
                        {changeTier && packages?.length && (
                            <FormInput
                                name="plans"
                                onChange={(e) => setSelectedTier(e.target.value)}
                                inputType="select"
                                label={true}
                                title="Change Tier"
                                options={planArr}
                            />
                        )}
                        {/* {changeTier && packages?.length && (
                            <Button onClick={() => changePlan()} className="btn btn-primary ">
                                Change Plan
                            </Button>
                        )}
                        <Button
                            onClick={() => setChangeTier(!changeTier)}
                            className="mx-1 btn btn-primary ">
                            Upgrade Plan
                        </Button> */}
                        <div className="my-2">
                            {refinedPackages.length &&
                                refinedPackages.map((item, i) => (
                                    <Button
                                        onClick={() => donateHandler(null, item.priceId)}
                                        className="much-donate-card--btn btn rounded-pill mx-1"
                                        key={i}>
                                        $
                                        {totalBacking >= item.price
                                            ? 0
                                            : Math.abs(totalBacking - item.price)}{' '}
                                        -{item.title}
                                    </Button>
                                ))}
                        </div>
                        <div className="opacity-0">
                            <form
                                ref={formRef}
                                action="https://artbot-backend-api-9v7k9.ondigitalocean.app/api/plan/openStripeWithDynamic"
                                method="POST">
                                <input type="hidden" value={price} name="priceId" />
                                <input type="hidden" value={location} name="url" />
                                <input type="hidden" value={user?.user?._id} name="userId" />
                                <button type="submit">Checkout</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
                {changeTier && (
                    <div className="container">
                        <div className=" row much-donate">
                            {/* {packages.length &&
                                packages.map((item, i) => (
                                    <div key={i} className="col-md-4">
                                        <DonateCard
                                            id={item._id}
                                            index={i}
                                            priceId={item.priceId}
                                            title={item.title}
                                            price={item.price}
                                            originalPrice={item.originalPrice}
                                            total={item.total}
                                            benefits={item.benefits}
                                            leftPrice={item.leftCount}
                                            donateHandler={donateHandler}
                                        />
                                    </div>
                                ))} */}
                        </div>

                        {/* <div className="opacity-0">
                            <form
                                ref={formRef}
                                action="http://localhost:8080/api/plan/openStripeWithDynamic"
                                method="POST">
                                <input type="hidden" value={price} name="priceId" />
                                <input type="hidden" value={window.location.href} name="url" />
                                <button type="submit">Checkout</button>
                            </form>
                        </div> */}
                    </div>
                )}
            </div>
        </LetsMakeaMovieWrapper>
    );
};

export default ProfileBacking;
