import React, { useState } from 'react';
import Dialog from '../UI/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import CustomButton from '../UI/Button/Button';
import FormInput from '../UI/FormInput/FormInput';
import { createWaitlist } from '../../services/util';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { DialogContentText } from '@material-ui/core';
import PropTypes from 'prop-types';

function JoinOurWaitlist({ open, handleClose }) {
    const [email, setEmail] = useState({ value: '', error: false });
    const [loading,setLoading] = useState(false)
    const [message, setMessage] = useState({ value: '', status: 200 });
    const submitHandler = async (e) => {
        e.preventDefault();
        const reqData = {
            email: email.value,
        };
        const data = await createWaitlist(reqData);
        setLoading(true);
        if (data.code === 'ABT0000'){
            setMessage({ value: data.message, status: 200 });  
        } 
        else setMessage({ value: 'Something went wrong', error: 404 });
        setLoading(false);

    };
    
    return (
        <Dialog
            className="video-report-card"
            open={open}
            handleClose={() => handleClose(false)}
            maxWidth="lg">
            <DialogTitle id="form-dialog-title" >
                <div className="d-flex justify-content-between">
                      <span>{message.value ? 'Status' : 'Join Our Waitlist'}</span> <span onClick={() => handleClose(false)} className="text-white ml-auto pointer">x</span>
                </div>
            </DialogTitle>
            {message.value === '' ? (
                <form onSubmit={submitHandler}>
                    <DialogContent>
                        <FormInput
                            required={true}
                            title="Email"
                            placeholder={`Enter Email`}
                            name="email"
                            type="email"
                            label="Add Email"
                            value={email.value}
                            onChange={(e) => setEmail({ value: e.target.value, error: false })}
                            inputType="input"
                        />
                        
                    </DialogContent>
                    <DialogActions>
                        <CustomButton className="btn text-white" onClick={() => handleClose(false)}>
                            Cancel
                        </CustomButton>
                        <CustomButton className="btn rounded-10 bg-color-blue" type="submit">
                            {loading ? <CircularProgress color="inherit" size={30} /> : 'Submit'}
                        </CustomButton>
                    </DialogActions>
                </form>
            ) : (
                <DialogContent>
                    <DialogContentText className="text-light">
                        {message.value}</DialogContentText>
                </DialogContent>
            )}
        </Dialog>
    );
}

JoinOurWaitlist.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
}

export default  React.memo(JoinOurWaitlist);
