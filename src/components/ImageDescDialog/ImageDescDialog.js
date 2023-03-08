import React from 'react';
import DialogBox from '../UI/Dialog/Dialog';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import Label from '../UI/Label/Label';
import clsx from 'clsx';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { connect } from 'react-redux';
import { addImageDetail } from '../../store/actions/videoUpload';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function ImageDescDialog({ dialogOpen, setDialogOpen, imagesArray, current, addImageDetail }) {
    const [imgType, setType] = React.useState('photo');
    const [imgMature, setMature] = React.useState('mature');
    const [imgTitle, setImgTitle] = React.useState('');
    const [imgDesc, setImgDesc] = React.useState('');
    const [imgCategory, setImgCategory] = React.useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        addImageDetail(current, {
            type: imgType,
            mature: imgMature,
            title: imgTitle,
            desc: imgDesc,
            category: imgCategory
        });
        setImgTitle('');
        setImgDesc('');
        setImgCategory('');
        setDialogOpen(false);
    };
    return (
        <DialogBox
            className="custom-dialog"
            title=""
            open={dialogOpen}
            handleClose={() => setDialogOpen(false)}
            fullWidth={true}
            maxWidth="sm">
            <div className="container-fluid row mb-3">
                <div className="col-md-6">
                    <Img
                        src={
                            imagesArray.length > 0 &&
                            imagesArray[current] &&
                            URL.createObjectURL(imagesArray[current])
                        }
                        className="w-100 h-100"
                        alt="image"
                    />
                </div>
                <div className="col-md-6">
                    <form onSubmit={submitHandler}>
                        <P1
                            className="text-white mb-0 float-right pointer"
                            onClick={() => setDialogOpen(false)}>
                            X
                        </P1>
                        <Input
                            required
                            placeholder="Title"
                            onChange={(e) => setImgTitle(e.target.value)}
                            className="border-top-0 mb-1 bg-transparent form-input__feild form-control  border-left-0 border-right-0"
                            value={imgTitle}
                            name="imageTitle"
                            id="title"
                        />
                        {/** Image Type */}
                        <P1 className="text-light my-2 mb-1">Image type</P1>
                        <div className="d-flex justify-content-between ">
                            <Label
                                htmlFor="radio11"
                                className={`btn px-md-5 ${clsx({
                                    'bg-color-green': imgType === 'photo'
                                })} text-white btn-sm bg-white-light`}>
                                Photo
                                <Input
                                    onChange={(e) => setType(e.target.value)}
                                    type="radio"
                                    id="radio11"
                                    name="imageType"
                                    className="d-none radio"
                                    value="photo"
                                />
                            </Label>
                            <Label
                                htmlFor="radio21"
                                className={`btn px-md-5 px-sm-2 ${clsx({
                                    'bg-color-green': imgType === 'illustration'
                                })} text-white btn-sm bg-white-light`}>
                                Illustration
                                <Input
                                    onChange={(e) => setType(e.target.value)}
                                    type="radio"
                                    id="radio21"
                                    name="imageType"
                                    className="d-none radio"
                                    value="illustration"
                                />
                            </Label>
                        </div>
                        {/** Mature Content */}
                        <P1 className="text-light mt-1 mb-1"> Mature Content</P1>
                        <div className="d-flex justify-content-between ">
                            <Label
                                htmlFor="radio31"
                                className={`btn px-md-5 ${clsx({
                                    'bg-color-green': imgMature === 'mature'
                                })} text-white btn-sm bg-white-light`}>
                                Mature
                                <Input
                                    required
                                    onChange={(e) => setMature(e.target.value)}
                                    type="radio"
                                    id="radio31"
                                    className="d-none radio"
                                    value="mature"
                                />
                            </Label>
                            <Label
                                htmlFor="radio41"
                                className={`btn px-md-4 ${clsx({
                                    'bg-color-green': imgMature === 'non-mature'
                                })} text-white btn-sm bg-white-light`}>
                                Non Mature
                                <Input
                                    required
                                    onChange={(e) => setMature(e.target.value)}
                                    type="radio"
                                    id="radio41"
                                    className="d-none radio"
                                    value="non-mature"
                                />
                            </Label>
                        </div>

                        {/** Description */}
                        <P1 className="text-light mt-1 mb-1"> Description</P1>

                        <CKEditor
                            editor={ClassicEditor}
                            data={imgDesc}
                            placeholder="hihihi"
                            onInit={(editor) => {}}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setImgDesc(data);
                            }}
                            onBlur={(event, editor) => {}}
                            onFocus={(event, editor) => {}}
                        />

                        <Input
                            required
                            onChange={(e) => setImgCategory(e.target.value)}
                            className="border-top-0 mb-1 border-left-0 border-right-0 bg-transparent form-input__feild form-control"
                            id="imageCategory"
                            name="imageCategory"
                            value={imgCategory}
                            placeholder="Category"
                        />
                        <Button
                            type="submit"
                            className="btn mt-2 bg-color-green rounded-10 btn-sm px-5">
                            Confirm
                        </Button>
                    </form>
                </div>
            </div>
        </DialogBox>
    );
}

const mapStateToProps = (state) => ({
    imagesArray: state.videoUpload.imagesArray
});

export default connect(mapStateToProps, { addImageDetail })(ImageDescDialog);
