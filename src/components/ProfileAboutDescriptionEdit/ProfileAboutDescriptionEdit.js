import React, { useState } from 'react';
import P1 from '../UI/P1/P1';
import FormInput from '../UI/FormInput/FormInput';
import Button from '../UI/Button/Button';
import { updateProfile } from '../../services/util';
function ProfileAboutDescriptionEdit({ user, editHandler }) {
    const [tab, setTab] = useState('');
    const [title, setTitle] = useState({
        value: user.profile_name || '',
        touch: false,
        error: false
    });
    const [desc, setDesc] = useState({ value: user.description || '', touch: false, error: false });
    const [twitter, setTwitter] = useState({
        value: user.twitter || '',
        touch: false,
        error: false
    });
    const [facebook, setFacebook] = useState({
        value: user.facebook || '',
        touch: false,
        error: false
    });
    const [instagram, setInstagram] = useState({
        value: user.instagram || '',
        touch: false,
        error: false
    });
    const [twich, setTwich] = useState({ value: user.twich || '', touch: false, error: false });
    const default_tab = ['','Video', 'Audio', 'Image', 'About'];
    const findIndex = default_tab.findIndex((k) => k.toLowerCase() === user['default_tab']?.toLowerCase() );
    if(findIndex>-1){
        default_tab.shift();
        default_tab.unshift(default_tab[findIndex-1]);
        default_tab.splice(findIndex,1);
    }


    const update = async (e, type) => {
        e.preventDefault();
        let data = {};
        if (type === 'title' && (tab || title.touch)) {
            data = {
                default_tab: tab || user.default_tab,
                user_id: user._id,
                profile_name: title.value
            };
        } else if (type === 'desc' && desc.touch) {
            data = {
                user_id: user._id,
                description: desc.value
            };
        } else if (type === 'social') {
            data = {
                user_id: user._id,
                ...(facebook.value && { facebook: facebook.value }),
                ...(instagram.value && { instagram: instagram.value }),
                ...(twitter.value && { twitter: twitter.value })
            };
        }
        const update_response = await updateProfile(data);
        console.log(update_response);
        if (update_response && update_response.code === 'ABT0000') {
            editHandler(false);
        }
    };
    const cancelEdit = () => editHandler(false);
    return (
        <React.Fragment>
            <P1 className="text-white text-uppercase  mb-3">Default tab</P1>
            <FormInput
                label={false}
                onChange={(event) => setTab(event.target.value)}
                title="Genre"
                name="default_tab"
                inputType="select"
                options={default_tab}
            />
            <P1 className="text-white text-uppercase  mb-3">Channel Name</P1>
            <form onSubmit={(e) => update(e, 'title')}>
                <div className="d-flex flex-wrap align-items-start">
                    <div className="flex-fill">
                        <FormInput
                            required={true}
                            title="Title"
                            placeholder={`Enter Title`}
                            name="title"
                            type="text"
                            label={false}
                            value={title.value}
                            onChange={(event) =>
                                setTitle({
                                    value: event.target.value,
                                    touch: true,
                                    error: !event.target.value
                                })
                            }
                            inputType="input"
                            maxLength="100"
                        />
                    </div>
                    <div className="btn-group12 mx-2">
                        <P1
                            onClick={cancelEdit}
                            className="btn bg-secondary px-4 pointer mr-1 text-dark  rounded-10">
                            CANCEL
                        </P1>
                        <Button
                            type="submit"
                            className="btn mb-3 bg-color-blue px-4 pointer ml-1 rounded-10">
                            DONE
                        </Button>
                    </div>
                </div>
            </form>
            <form onSubmit={(e) => update(e, 'desc')}>
                <P1 className="text-white text-uppercase  mb-3">Description</P1>
                <FormInput
                    label={false}
                    required={true}
                    title="Description"
                    placeholder=""
                    name="description"
                    type="text"
                    onChange={(event) =>
                        setDesc({
                            value: event.target.value,
                            touch: true,
                            error: !event.target.value
                        })
                    }
                    value={desc.value}
                    inputType="textarea"
                    maxLength="500"
                />
                <div className="d-flex justify-content-between">
                    <small>Part of this description appears elsewhere on Artbot</small>
                    <div className="">
                        <P1
                            onClick={cancelEdit}
                            className="btn bg-secondary  px-4 pointer mr-1 text-dark  rounded-10">
                            CANCEL
                        </P1>
                        <Button
                            type="submit"
                            className="btn mb-3 bg-color-blue mx-3 px-4 pointer ml-1 rounded-10">
                            DONE
                        </Button>
                    </div>
                </div>
            </form>
            <div className="w-100 mb-3" style={{ background: '#716e86', height: '1px' }} />
            <form onSubmit={(e) => update(e, 'social')}>
                <P1 className="text-white text-uppercase  mb-3">Social Media Links</P1>
                <div className="p-3 profile-sub-navigation__item-active">
                    <FormInput
                        required={true}
                        title="Title"
                        placeholder={`Your Facebook Link`}
                        name="facebook"
                        type="text"
                        label={false}
                        value={facebook.value}
                        onChange={(event) =>
                            setFacebook({
                                value: event.target.value,
                                touch: true,
                                error: !event.target.value
                            })
                        }
                        inputType="input"
                        maxLength="100"
                    />
                    <FormInput
                        required={false}
                        title="Title"
                        placeholder={`Your Twitter Link`}
                        name="twitter"
                        type="text"
                        label={false}
                        value={twitter.value}
                        onChange={(event) =>
                            setTwitter({
                                value: event.target.value,
                                touch: true,
                                error: !event.target.value
                            })
                        }
                        inputType="input"
                        maxLength="100"
                    />
                    <FormInput
                        required={false}
                        title="Title"
                        placeholder={`Your Instagram Link`}
                        name="instagram"
                        type="text"
                        label={false}
                        value={instagram.value}
                        onChange={(event) =>
                            setInstagram({
                                value: event.target.value,
                                touch: true,
                                error: !event.target.value
                            })
                        }
                        inputType="input"
                        maxLength="100"
                    />
                    <FormInput
                        required={false}
                        title="Title"
                        placeholder={`Your Twitch Link`}
                        name="twitch"
                        type="text"
                        label={false}
                        value={twich.value}
                        onChange={(event) =>
                            setTwich({
                                value: event.target.value,
                                touch: true,
                                error: !event.target.value
                            })
                        }
                        inputType="input"
                        maxLength="100"
                    />
                    <div className="d-flex justify-content-end">
                        <P1
                            onClick={cancelEdit}
                            className="btn bg-secondary  px-4  mr-1 text-dark  rounded-10">
                            CANCEL
                        </P1>
                        <Button
                            type="submit"
                            className="btn bg-color-blue mb-3 ml-3 px-4  ml-1 rounded-10">
                            DONE
                        </Button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}

export default ProfileAboutDescriptionEdit;
