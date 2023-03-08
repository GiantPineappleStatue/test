import React from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import {
    inputChange,
    tagRemove,
    tagsAdd,
    genreAdd,
    genreRemove,
    subscriptionPlanChange
} from '../../redux/actions/videoUpload';
import FormInput from '../UI/FormInput/FormInput';
import ChipInput from 'material-ui-chip-input';
import clsx from 'clsx';
// import CkEditor from '../UI/CkEditor/CkEditor';
const CkEditor = dynamic(() => import('../UI/CkEditor/CkEditor'), { ssr: false });

const UploadTextForm = (props) => {
    const {
        title,
        inputChange,
        tagsAdd,
        tagRemove,
        description,
        tags,
        label,
        titlePlaceHolder,
        chipPlaceHolder,
        subscriberOnly,
        subscriptions,
        subscriptionChange,
        genre,
        genreAdd,
        genreRemove
    } = props;
    const planChangeHandler = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(subscriptions[i]._id);
            }
        }
        subscriptionChange(value);
    };
    return (
        <React.Fragment>
            <FormInput
                required={true}
                title="Title"
                placeholder={titlePlaceHolder || `Enter Title`}
                name="title"
                type="text"
                label={label}
                value={title.value}
                onChange={(event) => inputChange(event)}
                inputType="input"
                maxLength="100"
            />
            {label && (
                <label className={`text-light`}>
                    Description
                    <small className="text-muted ml-1 form-input__required">(required)</small>
                </label>
            )}
            <CkEditor
                data={description.value}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    inputChange({
                        target: {
                            name: 'description',
                            value: data
                        }
                    });
                }}
            />
            {label && <label className={`text-light ${clsx({ 'mt-2': label })}`}>Genre</label>}
            {/* {!label && <br />}
			<FormInput
				required={true}
				title="Genre"
				placeholder="Category"
				name="genres"
				type="text"
				label={label}
				value={genre.value}
				onChange={(event) => inputChange(event)}
				inputType="input"
			/> */}
            {label && <label className={`text-light ${clsx({ 'mt-2': label })}`}>Tags</label>}
            <ChipInput
                className={`mb-4 chip-input `}
                blurBehavior="ignore"
                fullWidth
                value={tags}
                onAdd={(chip) => tagsAdd(chip)}
                onDelete={(chip, index) => tagRemove(index)}
                variant="outlined"
                placeholder={chipPlaceHolder}
            />
            {subscriberOnly && (
                <FormInput
                    name="plans"
                    onChange={planChangeHandler}
                    inputType="select"
                    label={label}
                    title="Plans"
                    options={subscriptions.map((item) => item.title)}
                    multiple={true}
                />
            )}
        </React.Fragment>
    );
};
const mapStateToProps = (state) => ({
    title: state.videoUpload.title,
    description: state.videoUpload.description,
    tags: state.videoUpload.tags,
    genre: state.videoUpload.genres,
    subscriptions: state.auth.user?.subscriptions || []
});
const mapDispatchToProps = (dispatch) => ({
    inputChange: (event) => dispatch(inputChange(event)),
    tagsAdd: (value) => dispatch(tagsAdd(value)),
    tagRemove: (index) => dispatch(tagRemove(index)),
    genreAdd: (value) => dispatch(genreAdd(value)),
    genreRemove: (index) => dispatch(genreRemove(index)),
    subscriptionChange: (payload) => dispatch(subscriptionPlanChange(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadTextForm);
