import React from 'react';
import P1 from '../UI/P1/P1';
import { fancyTimeFormat } from '../../utils/fancyTimeFormat';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Input from '../UI/Input/Input';
const AudioTrackCard = ({ index, audio, name, duration, deleteHandler, updateHandler, show }) => {
    const [showFeild, setShowFeild] = React.useState(false);
    const [dur, setDur] = React.useState(0);
    const update = (index) => {
        setShowFeild(!showFeild);
    };
    const audioPlay = new Audio(URL.createObjectURL(audio));
    setTimeout(() => setDur(audioPlay.duration), 1000);
    return (
        <div className="row mb-1">
            <div className="col-1 ">
                <P1 className="text-white p-2  bg-white-light text-center mb-0 mx-auto">
                    {index + 1}
                </P1>
            </div>
            <div className="col-8 ">
                <div className="d-flex justify-content-between p-1  bg-white-light">
                    {!showFeild && <P1 className="mb-0 text-white my-auto">{name}</P1>}
                    {showFeild && (
                        <Input
                            type="text"
                            value={name}
                            className="bg-transparent w-100 text-white"
                            onChange={(event) => updateHandler(index, event.target.value)}
                        />
                    )}
                    <div className="bg-primary-light pointer" onClick={() => update(index)}>
                        <CreateIcon className="text-white p-1" fontSize="large" />
                    </div>
                </div>
            </div>
            <div className="col-2 ">
                <P1 className="text-white p-2  bg-white-light text-center mb-0 mx-auto">
                    {fancyTimeFormat(dur)}
                </P1>
            </div>
            <div className="col-1  text-center">
                <div
                    className="bg-white-light pointer py-2"
                    onClick={() => deleteHandler(index)}>
                    <DeleteIcon className="text-white " />
                </div>
            </div>
        </div>
    );
};
export default AudioTrackCard;
