import React from 'react';
import Popper from '@material-ui/core/Popover/Popover';
import Paper from '@material-ui/core/Paper/Paper';
import Grow from '@material-ui/core/Grow/Grow';
import Switch from '@material-ui/core/Switch/Switch';
import MenuList from '@material-ui/core/MenuList/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
// import { ClickAwayListener, Grow, Paper, Popper, MenuList, Switch } from '@material-ui/core';
import P1 from '../UI/P1/P1';
import Button from '../UI/Button/Button';
import Icons from '../UI/ReactIcons/ReactIcons';
import Input from '../UI/Input/Input';
import clsx from 'clsx';
import { TiTick } from 'react-icons/ti';
const PaymentModel = ({ content_type }) => {
    const [open, setOpen] = React.useState(false);
    const [paymentMethod, setPaymentMethod] = React.useState('card');
    const [saveCard, setSaveCard] = React.useState(true);
    const paymentRef = React.useRef();
    return (
        <div>
            <Button
                refs={paymentRef}
                onClick={() => setOpen(!open)}
                className={`btn   ml-2 ${content_type === 'video' && 'bg-color-blue'} ${
                    content_type === 'audio' && 'bg-color-purple'
                } ${
                    content_type === 'image' && 'bg-color-green border-green'
                }   video-info__btn px-4 rounded-10 p-1  `}>
                Buy Download
            </Button>
            <Popper
                className="download-dropdown payment-model w-100"
                placement="top-start"
                open={open}
                anchorEl={paymentRef.current}
                role={undefined}
                transition
                disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: 'center'
                        }}>
                        <Paper className="rounded-0   mt-5">
                            <ClickAwayListener onClickAway={() => setOpen(false)}>
                                <MenuList autoFocusItem={open} id="menu-list-grow">
                                    <P1 className="mb-1 text-white py-2 text-center">
                                        Payment Process
                                    </P1>
                                    <div className="payment-model__card  p-3">
                                        <P1 className="h6 text-white font-weight-light mb-1">
                                            Select your method
                                        </P1>
                                        <div className="d-flex">
                                            <div
                                                onClick={() => setPaymentMethod('card')}
                                                className={` ${clsx({
                                                    'bg-color-blue':
                                                        paymentMethod === 'card' &&
                                                        content_type === 'video',
                                                    'bg-color-purple':
                                                        paymentMethod === 'card' &&
                                                        content_type === 'audio',
                                                    'bg-color-green':
                                                        paymentMethod === 'card' &&
                                                        content_type === 'image'
                                                })} rounded payment-model__card--select m-1 `}>
                                                <Icons.GoCreditCard
                                                    className=" mx-5 my-3"
                                                    size={30}
                                                    color={'#fff'}
                                                />
                                                {paymentMethod === 'card' && (
                                                    <TiTick
                                                        color={'green'}
                                                        size={15}
                                                        className="payment-model__card--select--tick"
                                                    />
                                                )}
                                            </div>
                                            <div
                                                onClick={() => setPaymentMethod('paypal')}
                                                className={` ${clsx({
                                                    'bg-color-blue':
                                                        paymentMethod === 'paypal' &&
                                                        content_type === 'video',
                                                    'bg-color-purple':
                                                        paymentMethod === 'paypal' &&
                                                        content_type === 'audio',
                                                    'bg-color-green':
                                                        paymentMethod === 'paypal' &&
                                                        content_type === 'image'
                                                })} rounded payment-model__card--select m-1 `}>
                                                <Icons.FaCcPaypal
                                                    size={30}
                                                    className=" mx-5 my-3"
                                                    color={'#fff'}
                                                />
                                                    {paymentMethod === 'paypal' && (
                                                        <TiTick
                                                            color={'green'}
                                                            size={15}
                                                            className="payment-model__card--select--tick"
                                                        />
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <P1 className="h6 text-white font-weight-light mb-1">
                                            Enter Your Payment Details
                                        </P1>
                                        <Input
                                            type="text"
                                            placeholder="CARDHOLDER NAME"
                                            className="form-control mb-3 bg-transparent payment-model__input "
                                        />
                                        <Input
                                            type="number"
                                            placeholder="CARD NUMBER"
                                            className="form-control mb-3 bg-transparent payment-model__input "
                                        />
                                        <div className="d-flex">
                                            <Input
                                                type="text"
                                                placeholder="EXPIRATION DATE"
                                                className="form-control mb-3 bg-transparent payment-model__input "
                                            />

                                            <Input
                                                type="password"
                                                placeholder="CVV"
                                                className="form-control mb-3 bg-transparent payment-model__input "
                                            />
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <P1 className="h6 text-white font-weight-light mb-1">
                                                Remember my card details
                                            </P1>
                                            <Switch
                                                size="small"
                                                checked={saveCard}
                                                onChange={() => setSaveCard(!saveCard)}
                                                value="autoPlay"
                                                color="secondary"
                                                className="payment-model__switch rounded-pill"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                        </div>
                                        <Button
                                            style={{ border: '1px solid transparent' }}
                                            className={`payment-model__buy--button1 ${clsx({
                                                'bg-color-blue': content_type === 'video',
                                                'bg-color-purple': content_type === 'audio',
                                                'bg-color-green': content_type === 'image'
                                            })} rounded-10 btn-block`}>
                                            <div className="d-flex my-2">
                                                <Icons.FaArrowRight
                                                    size={30}
                                                    color={'#000'}
                                                    className="bg-white rounded-circle p-2"
                                                />
                                                <span className="flex-grow-1 my-auto text-center">
                                                    BUY NOW
                                                </span>
                                            </div>
                                        </Button>
                                    </div>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};
export default PaymentModel;
