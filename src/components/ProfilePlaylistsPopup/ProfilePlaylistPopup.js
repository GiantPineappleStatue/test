import React, { useState } from 'react';
import Dialog from '../UI/Dialog/Dialog';

import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import FormGroup from '@material-ui/core//FormGroup/FormGroup';
import CustomButton from '../../components/UI/Button/Button';
import { addMediaToPlaylist, getMyPlaylists, removeMediaFromPlaylist } from '../../services/util';
import SimpleSnackbar from '../UI/Snackbar/Snackbar';
import Icons from '../UI/ReactIcons/ReactIcons';
import AddPlaylist from '../AddPlaylist/AddPlaylist';
import P1 from '../UI/P1/P1';
const ProfilePlaylistPopup = ({ open, handleClose, mediaId, type }) => {
    const [playlist, setPlaylist] = useState([]);
    const [snackbar, setSnackbar] = useState({open:false,message:''});
    const [addPlaylist, setaddPlaylist] = useState(false);
    React.useEffect(() => {
        getData();
    }, [addPlaylist,snackbar]);
    const getData = async () => {
        const response = await getMyPlaylists(type);
        if (response.code === 'ABT0000') setPlaylist(response.playlists);
    };
    const playlistChangeHandler = async (id,checked) => {
        if(checked){
            const response = await addMediaToPlaylist(id, { mediaId: mediaId });
            if (response.code === 'ABT0000'){
                setSnackbar({open:true,message:`${type} added to playlist`}); 
                setTimeout(() => {
                    setSnackbar({open:false,message:``});
                
                }, 3000);
            }    
        }else {
            const response = await removeMediaFromPlaylist(id,{mediaId:mediaId});
            if(response.code==='ABT0000'){
                setSnackbar({open:true,message:`${type} removed from playlist`});
                setTimeout(() => {
                    setSnackbar({open:false,message:``});
                
                }, 3000);
            } 
        }
        
    };
    return (
        <div>
            {addPlaylist && <AddPlaylist contentType={type} open={addPlaylist} handleClose={setaddPlaylist} />}
            {/* <SimpleSnackbar
                message="Added to Playlist"
                open={snackbar}
                handleClose={() => setSnackbar(false)}
                handleUndo={() => {}}
            /> */}
            <Dialog
                className="video-report-card"
                open={open}
                handleClose={() => handleClose(false)}
                scroll="paper">
              {playlist.length &&  <DialogTitle id="form-dialog-title">Save To</DialogTitle>}
                <React.Fragment>
                    <DialogContent style={{ maxHeight: '400px' }}>
                        <FormGroup>
                            {playlist.map((item, i) => (
                                <FormControlLabel
                                    key={i}
                                    control={
                                        <Checkbox
                                        checked={item.list.findIndex(item=>item._id===mediaId)>-1?true:undefined}
                                            onChange={(event) =>{
                                               
                                                playlistChangeHandler(event.target.value,event.target.checked)
                                            }
                                            }
                                            value={item._id}
                                        />
                                    }
                                    label={item.title}
                                />
                            ))}
                        </FormGroup>
                        {snackbar.open&& <Dialog
                            className="video-report-card"
                            open={snackbar.open}
                            handleClose={() => setSnackbar({open:false,message:''})}
                            scroll="paper"
                        >
                            <React.Fragment>
                                <DialogContent>
                                    <P1 className="text-capitalize">{snackbar.message}</P1>
                                </DialogContent>
                            </React.Fragment>

                            </Dialog>}
                    </DialogContent>
                    <DialogActions>
                        <hr/>
                        <CustomButton
                            className="btn ml-0 text-white"
                            onClick={() => setaddPlaylist(true)}>
                            <Icons.MdPlaylistAdd color={'#B3ACCF'} size={19} /> Create Playlist
                        </CustomButton>
                        <CustomButton className="btn text-white" onClick={() => handleClose(false)}>
                            Cancel
                        </CustomButton>
                    </DialogActions>
                </React.Fragment>
            </Dialog>{' '}
        </div>
    );
};
export default ProfilePlaylistPopup;
