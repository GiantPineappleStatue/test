import React from 'react';
import Button from '../UI/Button/Button';
import P1 from '../UI/P1/P1';
import Icons from '../UI/ReactIcons/ReactIcons';
import { useDispatch } from 'react-redux';
import { planDurationChange, selectSubscription } from '../../redux/actions/profile';
import parser from 'react-html-parser';
import clsx from 'clsx';
import FormInput from '../UI/FormInput/FormInput';

function SubscriptionCard({
    editable,
    price,
    duration,
    title,
    desc,
    className,
    setEdit,
    _id,
    active,
    setActive,
    current,
    planId
}) {
    const dispatch = useDispatch();
    return (
        <div className={` ${className} d-flex flex-column rounded p-3 m-1`}>
            {editable && (
                <Icons.FaPencilAlt
                    color={'#fff'}
                    onClick={setEdit}
                    size={30}
                    className="subscription-edit-card__edit p-2 rounded pointer"
                />
            )}
            <P1 className={`mb-0 ${className}__price   `}>${price}</P1>
            {!editable && active && (
                <FormInput
                    onChange={(e) => dispatch(planDurationChange(e.target.value))}
                    inputType="select"
                    options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    label={true}
                    title="No of Months"
                />
            )}
            <P1 className={`mb-0 ${className + '__title'} `}>{title}</P1>
            <div className={`mb-0 flex-grow-1 ${className + '__desc'}  `}>{parser(desc)}</div>
            {!editable && (
                <Button
                    disabled={current}
                    onClick={() => {
                        dispatch(selectSubscription({ price, title, desc, duration, _id, planId }));
                        setActive(_id);
                    }}
                    className={`btn py-1 self-align-center bg-color-blue btn-sm ${
                        className + '__btn'
                    } rounded-pill mx-auto ${clsx({ 'subscription-card__btn-active': active })} `}>
                    {current ? 'Current Plan' : 'Select Plan'}
                </Button>
            )}
        </div>
    );
}
SubscriptionCard.defaultProps = {
    editable: false,
    content_type: 'video'
};

export default SubscriptionCard;
