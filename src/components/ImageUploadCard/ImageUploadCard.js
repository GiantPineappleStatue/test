import React from 'react';
import Img from '../UI/Img/Img';
import DeleteIcon from '@material-ui/icons/Delete';
import Icons from '../UI/ReactIcons/ReactIcons';

const ImageUploadCard = ({ src, deleteHandler, editHandler, title }) => {
    return (
        <div className=" mx-1 mb-1  img-upload-card">
            <Img src={src} width="100%" height="100%" className="img-upload-card__img" />
            <div className="img-upload-card__footer d-flex justify-content-between align-items-center px-1 py-1">
                <small className="text-black-light">{title.split('.')[0]}</small>
                <div className="d-flex ">
                    <Icons.FaEdit
                        fontSize="large"
                        className="pointer text-white"
                        onClick={editHandler}
                    />
                    <DeleteIcon className="pointer text-white" onClick={deleteHandler} />
                </div>
            </div>
        </div>
    );
};
export default ImageUploadCard;
