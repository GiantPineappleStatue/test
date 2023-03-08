import React, { useState } from 'react';
import Dialog from '../UI/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import CustomButton from '../UI/Button/Button';
import FormInput from '../UI/FormInput/FormInput';
import { createPlaylist } from '../../services/util';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { DialogContentText } from '@material-ui/core';

function AddPlaylist({ open, handleClose, contentType }) {
    const [title, setTitle] = useState({ value: '', error: false });
    const [desc, setDesc] = useState({ value: '', error: false });
    const [visibility, setVisibility] = useState('Public');
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('video');
    const [message, setMessage] = useState({ value: '', status: 200 });
    const submitHandler = async (e) => {
        e.preventDefault();
        const reqData = {
            title: title.value,
            ...(desc.value && {desc:desc.value} ),
            visibility: visibility === 'Public' ? true : false,
            type: type
        };
        setLoading(true);
        const data = await createPlaylist(reqData);
        if (data.code === 'ABT0000'){
            setMessage({ value: data.message, status: 200 });  
        } 
        else setMessage({ value: 'Something went wrong', error: 404 });
        setLoading(false);
    };
    React.useEffect(()=>{
        if(contentType){
            setType(contentType);
        }
    },[]);
    return (
        <Dialog
            className="video-report-card"
            open={open}
            handleClose={() => handleClose(false)}
            maxWidth="lg">
            <DialogTitle id="form-dialog-title" >
                <div className="d-flex justify-content-between">
                <span>{message.value ? 'Status' : 'Add Playlist'}</span> <span onClick={() => handleClose(false)} className="text-white ml-auto pointer">x</span>

                </div>
            </DialogTitle>
            {message.value === '' ? (
                <form onSubmit={submitHandler}>
                    <DialogContent>
                        <FormInput
                            required={true}
                            title="Title"
                            placeholder={`Enter Title`}
                            name="title"
                            type="text"
                            label="Add Title"
                            value={title.value}
                            onChange={(e) => setTitle({ value: e.target.value, error: false })}
                            inputType="input"
                            maxLength="100"
                        />
                        <FormInput
                            required={false}
                            title="Description"
                            placeholder={`Enter Description`}
                            name="desc"
                            type="text"
                            label="Add Description"
                            value={desc.value}
                            onChange={(e) => setDesc({ value: e.target.value, error: false })}
                            inputType="textarea"
                            maxLength="500"
                        />
                        <FormInput
                            required={true}
                            title="Visibility"
                            name="visibility"
                            type="text"
                            label="Visibility"
                            onChange={(event) => setVisibility(event.target.value)}
                            inputType="select"
                            options={['Public', 'Private']}
                        />
                     {!contentType &&   <FormInput
                            required={true}
                            title="Type"
                            name="type"
                            value={type}
                            type="text"
                            label="Type"
                            onChange={(event) => setType(event.target.value)}
                            inputType="select"
                            options={['video', 'audio']}
                        />}
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

export default AddPlaylist;
