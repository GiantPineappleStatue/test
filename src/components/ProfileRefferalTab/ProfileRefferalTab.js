import React, { useEffect, useState } from 'react';
import { getAllCodes } from '../../services/util';
import P1 from '../UI/P1/P1';
import Dialog from '../UI/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import Span from '../UI/Span/Span';
import { useDispatch, useSelector } from 'react-redux';
import { profileReferral } from '../../redux/actions/profile';

const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
const ProfileRefferalTab = () => {
    const [refferal, setRefferal] = useState([]);
    const referralDialog = useSelector((state) => state.profile.referralDialog);

    const dispatch = useDispatch();
    useEffect(async () => {
        const data = await getAllCodes();
        if (data.code === 'ABT0000') {
            let refferal = [];
            data.referralCodes.forEach((item) => {
                if (item?.users && item.users.length) {
                    refferal = [...refferal, ...item.users];
                }
            });
            setRefferal(refferal);
        }
    }, []);
    return (
        <div>
            <div>
                <Dialog
                    className="custom-dialog "
                    open={referralDialog}
                    handleClose={() => dispatch(profileReferral(!referralDialog))}
                    scroll="body">
                    <DialogTitle className="text-light">Referrals</DialogTitle>
                    <DialogContent dividers={true}>
                        {refferal.length &&
                            refferal.map((item, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="d-flex justify-content-between align-items-center profile-sub-navigation__item-active py-4 color-blue px-3 mb-4 ">
                                        <div>
                                            {item.username} &nbsp; &#x3c;{item.email} &#x3e;
                                        </div>
                                        <Span className="font-weight-bold">
                                            JOINED {` `}
                                            {new Date(item.created_at).getDate()}
                                            {`  `}
                                            {monthNames[new Date(item.created_at).getMonth()]}
                                            {`,  `}
                                            {new Date(item.created_at).getFullYear()}
                                        </Span>
                                    </div>
                                );
                            })}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ProfileRefferalTab;
