import React from 'react';
import Img from '../UI/Img/Img';
import { useSelector } from 'react-redux';
import P1 from '../UI/P1/P1';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { wallet } from '../../services/util';
import Label from '../UI/Label/Label';

const ProfileCashoutInfoSection = () => {
    const user = useSelector((state) => state.profile.profileUser.user);
    const [balance, setBalance] = React.useState(0);
    React.useEffect(() => {
        let mount = true;
        async function getUserWallet() {
            if (mount) {
                const res = await wallet();
                if (res.code === 'ABT0000') setBalance(res.wallet.balance);
            }
        }

        getUserWallet();
        return () => {
            mount = false;
        };
    }, []);
    return (
        <div className="container-fluid profile-cashout">
            <div className="d-flex profile-cashout-header justify-content-between">
                <div className="d-flex profile-cashout-header__card">
                    <Img
                        className="img-fluid"
                        src={
                            user.profile_photo
                                ? `https://artbot.mypinata.cloud/ipfs/${user.profile_photo}?img-width=100`
                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtG0T1Y9ZYq13u7G0EI-igcBsfk-qFbF5cIQ&usqp=CAU'
                        }
                    />
                    <div className="d-flex flex-column ml-2">
                        <P1 className="text-white mb-1 font-18 mt-3">{user.username}</P1>
                        {/* <P1 className=" font-16 ">User</P1> */}
                    </div>
                </div>
                <div>
                    <div className="d-flex justify-content-between mt-5 bg-primary-light p-4">
                        <div className="mr-5">
                            <P1 className="text-white mb-1 font-18">${balance?.toFixed(2)}</P1>
                            <P1 className="text-white  font-16">Current Wallet Balance</P1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-cashout-form row mt-4">
                <div className="col-1" />
                <div className="col-10">
                    <P1 className="d-block bg-primary-light font-18 text-white p-2">
                        Payment Details
                    </P1>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="d-flex mb-4 justify-content-between align-items-center">
                                <P1 className="text-white mb-0 text-nowrap mr-3">
                                    Paypal Email Address
                                </P1>
                                <Input
                                    placeholder="example@gmail.com"
                                    className="form-control flex-grow-1 bg-transparent form-input__feild"
                                />
                            </div>
                            <div className="d-flex mb-4 justify-content-between align-items-center">
                                <P1 className="text-white text-nowrap mr-2  mb-0">
                                    Confirm Email Address
                                </P1>
                                <Input
                                    placeholder="example@gmail.com"
                                    className="form-control  bg-transparent form-input__feild"
                                />
                            </div>
                            <div className="d-flex mb-4 justify-content-between align-items-center">
                                <P1 className="text-white text-nowrap mr-4  mb-0 pr-3">
                                    Withdraw Amount
                                </P1>
                                <Input
                                    placeholder="$"
                                    className="form-control  bg-transparent form-input__feild"
                                />
                               
                            </div>
                            <div className="d-flex mb-4 justify-content-end align-items-center">
                                <P1 className="text-white text-nowrap mr-4  mb-0 pr-3">
                                    
                                </P1>
                                <Label>
                                    Minimum Withdrawl limit is 20$
                                </Label>
                               
                            </div>
                           
                            <div className="d-flex mb-4 justify-content-between align-items-center">
                                <P1 className="text-white text-nowrap mr-4  mb-0">
                                    Transaction Country
                                </P1>
                                <Input
                                    placeholder="USA"
                                    className="form-control  bg-transparent form-input__feild"
                                />
                            </div>
                            <Button className="btn  btn-primary px-5 py-2 btn-lg">Submit</Button>
                        </div>
                        <div className="col-sm-2" />
                        <div className="col-sm-2" />
                    </div>
                </div>
                <div className="col-1" />
            </div>
        </div>
    );
};

export default React.memo(ProfileCashoutInfoSection);
