/* eslint-disable react/prop-types */
import React from 'react';
import P1 from '../UI/P1/P1';
import Button from '../UI/Button/Button';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import ReactIcons from '../UI/ReactIcons/ReactIcons';
import Input from '../UI/Input/Input';
const DonateCard = ({
    id,
    title,
    price,
    originalPrice,
    leftPrice,
    benefits,
    total,
    index,
    priceId,
    donateHandler
}) => {
    const [amount, setAmount] = React.useState(0);
    const [edit, setEdit] = React.useState(false);
    return (
        <div className="much-donate-card">
            <P1 className="much-donate-card--title">{title}</P1>
            {benefits.map((item, i) => (
                <div key={i} className="d-flex much-donate-card-inner align-items-center1 ">
                    <img
                        className="much-donate-card--check"
                        src={`/img/${i <= total ? 'check.svg' : 'cross.svg'}`}
                        alt="alt"
                    />
                    <P1
                        className={`mb-0 ${
                            i <= total
                                ? 'much-donate-card-inner--active'
                                : 'much-donate-card-inner--disable'
                        }`}>
                        &nbsp; {item}
                    </P1>
                </div>
            ))}
            <div className="d-flex justify-content-center align-items-center">
                <P1 className="much-donate-card--original ">
                    {originalPrice ? '$' : ''}
                    {originalPrice}
                </P1>
                &nbsp;&nbsp;
                <P1 className="much-donate-card--price">${price}</P1>
                {/* <ReactIcons.FaEdit
                    size={20}
                    className="pointer mx-2 mb-3"
                    onClick={() => setEdit(!edit)}
                /> */}
            </div>
            {edit && (
                <div>
                    <Input
                        className="form-control  bg-transparent form-input__feild"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                    />
                </div>
            )}
            <P1 className={`much-donate-card--left ${clsx({ 'opacity-0': index === 0 })}`}>
                {leftPrice} left at this price
            </P1>
            <Button
                onClick={() => {
                    setEdit(false);
                    donateHandler(id, priceId);
                    setAmount(0);
                }}
                className="much-donate-card--btn btn rounded-pill">
                Choose
            </Button>
        </div>
    );
};

DonateCard.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    originalPrice: PropTypes.number,
    leftPrice: PropTypes.number,
    benefits: PropTypes.array,
    total: PropTypes.number
};

export default DonateCard;
