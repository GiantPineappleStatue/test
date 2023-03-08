import * as actions from '../actionTypes';

const initialState = {
    gender: { value: '', touch: false, error: false },
    whitelist: { value: '', touch: false, error: false },
    sponsorship: { value: '', touch: false, error: false },
    mature: { value: '', touch: false, error: false },
    language: { value: '', touch: false, error: false },
    city: { value: '', touch: false, error: false },
    zipcode: { value: '', touch: false, error: false },
    mile: { value: '', touch: false, error: false },
    age: [13, 100],
    tags: [],
    genre: []
};
const videoUploadAds = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADS_INPUT_CHANGE:
            return {
                ...state,
                [action.target.name]: {
                    value: action.target.value,
                    touch: true,
                    error: false
                }
            };
        case actions.ADS_AGE_CHANGE:
            return {
                ...state,
                age: action.value
            };
        case actions.ADS_CHIP_ADD:
            const updatedtags = [...state.tags];
            updatedtags.push(action.value);
            return {
                ...state,
                [action.input]: action.value
            };
        case actions.ADS_CHIP_REMOVE:
            const updatedTags = [...state.tags];
            updatedTags.splice(action.index, 1);
            console.log(action.input, action.value);

            return {
                ...state,
                [action.input]: action.value
            };

        default:
            return state;
    }
};
export default videoUploadAds;
