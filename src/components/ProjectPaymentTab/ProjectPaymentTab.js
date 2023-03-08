import React, { useReducer, useState } from 'react';
import P1 from '../UI/P1/P1';
import FormInput from '../UI/FormInput/FormInput';
import Button from '../UI/Button/Button';
import clsx from 'clsx';
import { updateProfile } from '../../services/util';
import Label from '../UI/Label/Label';
import { CountryDropdown } from 'react-country-region-selector';
import SimpleSnackbar from '../UI/Snackbar/Snackbar';

const initialState = {
    email: {
        value: '',
        touch: false,
        error: false
    },
    firstName: {
        value: '',
        touch: false,
        error: false
    },
    lastName: {
        value: '',
        touch: false,
        error: false
    },
    day: {
        value: '',
        touch: false,
        error: false,
        validate: /(0[1-9]|[12]\d|3[01])/
    },
    month: {
        value: '',
        touch: false,
        error: false,
        validate: /^(0?[1-9]|1[012])$/
    },
    year: {
        value: '',
        touch: false,
        error: false,
        validate: /^(19|20)\d{2}$/
    },
    homeAddress: {
        value: '',
        touch: false,
        error: false
    },
    homeAddress1: {
        value: '',
        touch: false,
        error: false
    },
    city: {
        value: '',
        touch: false,
        error: false
    },
    street: {
        value: '',
        touch: false,
        error: false
    },
    postalCode: {
        value: '',
        touch: false,
        error: false
    },
    country: {
        value: '',
        touch: false,
        error: false
    },
    cardName: {
        value: '',
        touch: false,
        error: false
    },
    cardNumber: {
        value: '',
        touch: false,
        error: false
    },
    cnv: {
        value: '',
        touch: false,
        error: false
    },
    cardExpire: {
        value: '',
        touch: false,
        error: false
    },
    billingCountry: {
        value: '',
        touch: false,
        error: false
    },
    billingAddress1: {
        value: '',
        touch: false,
        error: false
    },
    billingAddress2: {
        value: '',
        touch: false,
        error: false
    },
    billingCity: {
        value: '',
        touch: false,
        error: false
    },
    billingState: {
        value: '',
        touch: false,
        error: false
    },
    billingPostalCode: {
        value: '',
        touch: false,
        error: false
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    value: action.value,
                    error: !state[action.name]?.validate?.test(action.value)
                }
            };

        default:
            break;
    }
};
const ProjectPaymentTab = ({ state, dispatch, saveFunding, tabChange }) => {
    const [snachbar, setSnackbar] = useState({ open: false, message: '', isEnable: false });
    const [paymentState, paymentDispatch] = useReducer(reducer, initialState);
    const [message, setMessage] = useState({ status: 0, message: '', isEnable: false });
    const {
        email,
        firstName,
        lastName,
        day,
        month,
        year,
        homeAddress,
        homeAddress1,
        city,
        street,
        postalCode,
        country,
        cardName,
        cardNumber,
        cardExpire,
        cnv,
        billingCountry,
        billingAddress1,
        billingAddress2,
        billingCity,
        billingState,
        billingPostalCode
    } = paymentState;
    const { fundingGoal } = state;
    const inputChangeHandler = (e) => {
        paymentDispatch({ type: 'INPUT_CHANGE', name: e.target.name, value: e.target.value });
    };
    const projectUpdateHandler = async () => {};
    const billingInfoHandler = async (e) => {
        e.preventDefault();
        // const validate = Object.keys()
        const validate = [
            firstName,
            lastName,
            day,
            month,
            year,
            homeAddress,
            street,
            postalCode,
            country
        ].filter((item) => !item.value);
        if (validate.length > 0) {
            return;
        }
        const reqData = {
            billingInfo: {
                firstName: firstName.value,
                lastName: lastName.value,
                dateOfBirth: `${day.value}-${month.value}-${year.value}`,
                address: `${homeAddress.value} ${homeAddress1.value}`,
                street: street.value,
                postalCode: postalCode.value,
                country: country.value
            }
        };

        const update = await updateProfile(reqData);
        if (update.code === 'ABT0000') {
            // window.scroll(0,0);
            setSnackbar({ open: true, message: 'Billing info added successfully', isEnable: true });
        }
    };
    const submitPaymentHandler = async (e) => {
        e.preventDefault();
        const validate = [
            cardName,
            cardNumber,
            billingCountry,
            billingAddress1,
            billingState,
            billingCity,
            billingPostalCode
        ].filter((item) => !item.value);
        if (validate.length > 0) {
            return;
        }
        e.preventDefault();
        const reqData = {
            paymentInfo: {
                name: cardName.value,
                cardNumber: cardNumber.value,
                billingCountry: billingCountry.value,
                billingAddress: `${billingAddress1.value} ${billingAddress2.value}`,
                billingState: billingState.value,
                billingPostalCode: billingPostalCode.value,
                billingCity: billingCity.value
            }
        };

        const update = await updateProfile(reqData);
        if (update.code === 'ABT0000') {
            setSnackbar({ open: true, message: 'Payment info added successfully', isEnable: true });

            // setMessage({ status: 200, message: 'Payment info added successfully' });
        }
    };
    return (
        <div className="mx-4">
            <SimpleSnackbar
                open={snachbar.open}
                message={snachbar.message}
                handleClose={() => setSnackbar({ open: false, message: '', isEnable: false })}
            />
            {/* Project Funding goal */}

            <div className="row">
                <div className="col-md-6">
                    <P1 className="mb-1 font-25">Funding goal</P1>
                    <P1 className="project-subTitle mb-3">
                        Enter info for the individual or legal entity running this project.
                    </P1>
                    <P1 className="project-subTitle mb-2">
                        If you're running this project as a legal entity, someone within the
                        organization should complete this section.
                    </P1>
                    <P1 className="project-subTitle">
                        All the info entered here (including the name) must match the info
                        associated with the bank account that will be used to receive funds, if this
                        project is successfully funded.
                    </P1>
                </div>
                <div className="col-md-6">
                    <P1 className="font-14">Email</P1>
                    <div className="d-flex bg-primary-light p-2">
                        <input
                            type="radio"
                            name="fundingGoal"
                            onClick={(e) =>
                                dispatch({
                                    type: 'INPUT_CHANGE',
                                    name: e.target.name,
                                    value: e.target.value
                                })
                            }
                            value="individual"
                        />
                        <P1 className="font-14 mb-0 mx-2">Individual</P1>
                    </div>
                    <div className="d-flex bg-primary-light p-2 my-2">
                        <input
                            type="radio"
                            name="fundingGoal"
                            onClick={(e) =>
                                dispatch({
                                    type: 'INPUT_CHANGE',
                                    name: e.target.name,
                                    value: e.target.value
                                })
                            }
                            value="organization"
                        />
                        <P1 className="font-14 mb-0 mx-2">Legal entity (organization) </P1>
                    </div>
                    <Button
                        className="btn btn-block bg-color-purple"
                        onClick={projectUpdateHandler}>
                        Continue
                    </Button>
                </div>
            </div>
            <div className="project-hr__line my-4" />

            {/* Project receipt email */}
            <div className="row">
                <div className="col-md-6 my-auto">
                    <P1 className="font-25 mb-0">Recipient email</P1>
                </div>
                <div className="col-md-6">
                    <FormInput
                        title="Email"
                        label={true}
                        name="email"
                        type="email"
                        value={email.value}
                        onChange={(event) => inputChangeHandler(event)}
                        inputType="input"
                    />
                </div>
            </div>
            <div className="project-hr__line my-4" />

            {/* Identity confirmation */}
            <div className="row">
                <div className="col-md-6">
                    <P1 className="mb-1 font-25">Identity confirmation</P1>
                    <P1 className="project-subTitle mb-3">
                        Please enter your legal name and info, no nicknames or abbreviations.
                    </P1>
                    <P1 className="project-subTitle ">
                        This name may be different then your profile name but both will appear on
                        your creator bio.
                    </P1>
                </div>
                <div className="col-md-6">
                    <form onSubmit={billingInfoHandler}>
                        <FormInput
                            required={true}
                            title="First name"
                            label={true}
                            placeholder={'First Name'}
                            name="firstName"
                            type="text"
                            value={firstName.value}
                            onChange={(event) => inputChangeHandler(event)}
                            inputType="input"
                        />
                        <FormInput
                            required={true}
                            title="Last name"
                            label={true}
                            placeholder="Last name"
                            name="lastName"
                            type="text"
                            value={lastName.value}
                            onChange={(event) => inputChangeHandler(event)}
                            inputType="input"
                        />
                        <P1 className="font-14 mb-3">Date of birth</P1>
                        <div className="d-flex">
                            <FormInput
                                required={true}
                                placeholder="DD"
                                title="Day"
                                label={true}
                                name="day"
                                type="number"
                                min="1"
                                max="12"
                                value={day.value}
                                onChange={(event) => inputChangeHandler(event)}
                                inputType="input"
                            />
                            <FormInput
                                required={true}
                                placeholder={'MM'}
                                title="Month"
                                label={true}
                                name="month"
                                type="number"
                                min="1"
                                max="12"
                                value={month.value}
                                onChange={(event) => inputChangeHandler(event)}
                                inputType="input"
                            />
                            <FormInput
                                required={true}
                                placeholder={'YY'}
                                title="Year"
                                label={true}
                                name="year"
                                type="number"
                                min="1900"
                                max={new Date().toISOString().split('-')}
                                value={year.value}
                                onChange={(event) => inputChangeHandler(event)}
                                inputType="input"
                            />
                        </div>
                        {[day, month, year].filter((item) => item.error).length > 0 && (
                            <small className="text-danger">Please Enter Valid Date</small>
                        )}
                        <FormInput
                            required={true}
                            placeholder={'Street address'}
                            title="Home address"
                            label={true}
                            name="homeAddress"
                            type="text"
                            value={homeAddress.value}
                            onChange={(event) => inputChangeHandler(event)}
                            inputType="input"
                        />
                        <FormInput
                            required={true}
                            placeholder={'Unit/apartment number (optional)'}
                            label={false}
                            name="homeAddress1"
                            type="text"
                            value={homeAddress1.value}
                            onChange={(event) => inputChangeHandler(event)}
                            inputType="input"
                        />
                        <FormInput
                            required={true}
                            title="City"
                            placeholder={'City'}
                            label={true}
                            name="city"
                            type="text"
                            value={city.value}
                            onChange={(event) => inputChangeHandler(event)}
                            inputType="input"
                        />
                        <FormInput
                            required={true}
                            title="Street/Territory"
                            label={true}
                            name="street"
                            type="text"
                            value={street.value}
                            onChange={(event) => inputChangeHandler(event)}
                            inputType="input"
                        />
                        <FormInput
                            required={true}
                            title="Postal Code"
                            label={true}
                            name="postalCode"
                            type="number"
                            value={postalCode.value}
                            onChange={(event) => inputChangeHandler(event)}
                            inputType="input"
                        />
                        <Label>Country:</Label>
                        <CountryDropdown
                            classes="form-control  bg-transparent form-input__feild"
                            value={country.value}
                            name="country"
                            onChange={(val) =>
                                inputChangeHandler({ target: { name: 'country', value: val } })
                            }
                        />

                        <Button type="submit" className="btn btn-block bg-color-purple my-2">
                            Send for confirmation
                        </Button>
                    </form>
                </div>
            </div>
            <div className="project-hr__line my-4" />

            {/* Payment source */}
            <div className="row">
                <div className="col-md-6">
                    <P1 className="font-25 ">Payment source</P1>
                    <P1 className="project-subTitle ">
                        Add a credit or debit card that we may use in the event of chargebacks.
                    </P1>
                    <P1 className="project-subTitle ">
                        Make sure the card belongs to the same individual or legal entity running
                        this project
                    </P1>
                    <P1 className="project-subTitle ">
                        The card must be a Visa, Mastercard, or American Express Discover, J CB,
                        Maestro, and Visa Election cards are not accepted.
                    </P1>
                </div>
                <div className="col-md-6">
                    <form onSubmit={submitPaymentHandler}>
                        <FormInput
                            title="Name"
                            placeholder={'Name'}
                            label={true}
                            name="cardName"
                            type="text"
                            value={cardName.value}
                            onChange={(event) => inputChangeHandler(event)}
                            inputType="input"
                        />
                        <FormInput
                            title="Card"
                            placeholder={'4242424242424242'}
                            label={true}
                            name="cardNumber"
                            type="number"
                            min="0"
                            value={cardNumber.value}
                            onChange={(event) => inputChangeHandler(event)}
                            inputType="input"
                        />
                        <div className="d-flex">{/* Expiration & CVN */}</div>
                        <P1 className="font-14 mb-0"> Billing Address</P1>
                        <div className="project-hr__line my-2" />
                        <div className="ml-4">
                            <Label>Country:</Label>
                            <CountryDropdown
                                classes="form-control  bg-transparent form-input__feild"
                                value={billingCountry.value}
                                name="billingCountry"
                                onChange={(val) =>
                                    inputChangeHandler({
                                        target: { name: 'billingCountry', value: val }
                                    })
                                }
                            />

                            <FormInput
                                title="Address 1"
                                placeholder={'Address 1'}
                                label={true}
                                name="billingAddress1"
                                type="text"
                                value={billingAddress1.value}
                                onChange={(event) => inputChangeHandler(event)}
                                inputType="input"
                            />
                            <FormInput
                                title="Address 2"
                                placeholder={'Address 2'}
                                label={true}
                                name="billingAddress2"
                                type="text"
                                value={billingAddress2.value}
                                onChange={(event) => inputChangeHandler(event)}
                                inputType="input"
                            />
                            <FormInput
                                title="City"
                                placeholder={'City'}
                                label={true}
                                name="billingCity"
                                type="text"
                                value={billingCity.value}
                                onChange={(event) => inputChangeHandler(event)}
                                inputType="input"
                            />
                            <FormInput
                                title="State"
                                placeholder={'State'}
                                label={true}
                                name="billingState"
                                type="text"
                                value={billingState.value}
                                onChange={(event) => inputChangeHandler(event)}
                                inputType="input"
                            />
                            <FormInput
                                title="Postal code"
                                placeholder={'State'}
                                label={true}
                                name="billingPostalCode"
                                type="number"
                                min="0"
                                value={billingPostalCode.value}
                                onChange={(event) => inputChangeHandler(event)}
                                inputType="input"
                            />
                            <Button type="submit" className="btn btn-block bg-color-purple my-2">
                                Save Payment Information
                            </Button>
                        </div>
                    </form>
                    <div className="d-flex justify-content-end align-items-center">
                        <div>
                            <Button
                                onClick={() => tabChange('story')}
                                type="button"
                                className="btn btn-primary mx-2">
                                Back
                            </Button>
                            <Button
                                onClick={saveFunding}
                                type="button"
                                className="btn btn-primary mx-2">
                                Finish
                            </Button>
                        </div>
                    </div>
                </div>
                {message.status !== 0 && (
                    <div
                        className={`alert ${clsx({
                            'alert-primary': message.status === 200,
                            'alert-danger': message.status === 400
                        })}  alert-dismissible fade show`}
                        role="alert">
                        {message.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectPaymentTab;
