import React from 'react';
import Dialog from '../UI/Dialog/Dialog';

import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import Button from '@material-ui/core/Button/Button';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import TextField from '@material-ui/core/TextField/TextField';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import FormGroup from '@material-ui/core//FormGroup/FormGroup';
import CustomButton from '../UI/Button/Button';
import { report } from '../../services/util';

const VideoReportDialog = ({ content_type, id }) => {
    const [input, setInput] = React.useState({ value: '', touch: false, error: false });
    const [checkBoxes, setCheckBoxes] = React.useState({
        spam: false,
        hate: false,
        offensiveContent: false,
        copyrighted: false,
        other: false
    });
    const [open, handleClose] = React.useState(true);
    const [message, setMessage] = React.useState({ value: '', show: false, success: false });
    const submitHandler = async () => {
        let reportReason = '';
        if (checkBoxes.spam) reportReason = reportReason + 'Spam';
        if (checkBoxes.hate) reportReason = reportReason + ', Hate Speech';
        if (checkBoxes.offensiveContent) reportReason = reportReason + ', Offensive Content';
        if (checkBoxes.copyrighted) reportReason = reportReason + ', Copyrighted';
        if (checkBoxes.other) reportReason = reportReason + ', Other';
        if (reportReason.startsWith(',')) reportReason = reportReason.substr(1).trim();
        const response = await report({
            itemId: id,
            reportReason: reportReason,
            reportComment: input.value,
            contentType: content_type
        });
        if (response) setMessage({ show: true, value: response.message, success: true });
        else setMessage({ show: true, value: 'Report Failed Due to Some Reason', ...message });
    };
    return (
        <Dialog className="video-report-card" open={open} handleClose={() => handleClose(false)}>
            <DialogTitle id="form-dialog-title">
                {`${
                    message.show
                        ? `${message.success ? 'Thanks For Reporting' : 'Error'}`
                        : 'Select reason for reporting'
                } `}
            </DialogTitle>
            {!message.show && (
                <React.Fragment>
                    <DialogContent>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkBoxes.spam}
                                        onChange={(event) =>
                                            setCheckBoxes({
                                                ...checkBoxes,
                                                [event.target.value]: !checkBoxes[
                                                    event.target.value
                                                ]
                                            })
                                        }
                                        value="spam"
                                    />
                                }
                                label="Spam"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkBoxes.hate}
                                        onChange={(event) =>
                                            setCheckBoxes({
                                                ...checkBoxes,
                                                [event.target.value]: !checkBoxes[
                                                    event.target.value
                                                ]
                                            })
                                        }
                                        value="hate"
                                    />
                                }
                                label="Hate Speech"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkBoxes.offensiveContent}
                                        onChange={(event) =>
                                            setCheckBoxes({
                                                ...checkBoxes,
                                                [event.target.value]: !checkBoxes[
                                                    event.target.value
                                                ]
                                            })
                                        }
                                        value="offensiveContent"
                                    />
                                }
                                label="Offensive content"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkBoxes.copyrighted}
                                        onChange={(event) =>
                                            setCheckBoxes({
                                                ...checkBoxes,
                                                [event.target.value]: !checkBoxes[
                                                    event.target.value
                                                ]
                                            })
                                        }
                                        value="copyrighted"
                                    />
                                }
                                label="Copyrighted"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkBoxes.other}
                                        onChange={(event) =>
                                            setCheckBoxes({
                                                ...checkBoxes,
                                                [event.target.value]: !checkBoxes[
                                                    event.target.value
                                                ]
                                            })
                                        }
                                        value="other"
                                    />
                                }
                                label="Other"
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label=""
                                multiline
                                rows="4"
                                value={input.value}
                                className="text-white"
                                onChange={(event) =>
                                    setInput({
                                        value: event.target.value,
                                        touch: true,
                                        error: event.target.value === '' ? true : false
                                    })
                                }
                                variant="outlined"
                            />
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <CustomButton className="btn text-white" onClick={() => handleClose(false)}>
                            Cancel
                        </CustomButton>
                        <CustomButton
                            className="btn rounded-10 bg-color-blue"
                            onClick={submitHandler}>
                            Submit
                        </CustomButton>
                    </DialogActions>
                </React.Fragment>
            )}
            {message.show && (
                <React.Fragment>
                    <DialogContent>
                        <DialogContentText className="text-white">
                            {message.value}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose(false)} color="primary">
                            close
                        </Button>
                    </DialogActions>
                </React.Fragment>
            )}
        </Dialog>
    );
};
export default VideoReportDialog;
