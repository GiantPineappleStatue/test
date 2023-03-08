import * as actions from '../actionTypes';

const VIDEO_CATEGORY = 'VIDEO_CATEGORY';

const initialState = {
    videoCategory: 'trending',
    path: '',
    url: '',
    home: true,
    subHeaderVisible: false
};

const videoCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case VIDEO_CATEGORY:
            return {
                ...state,
                videoCategory: action.category
            };
        case actions.PATH:
            return {
                ...state,
                path: action.path
            };
        case actions.VIDEO_EDIT:
            return {
                ...state,
                url: action.url
            };
        case 'HOME_CHANGE':
            return {
                ...state,
                home: action.value
            };
        case actions.SUBHEADER_CHANGE:
            return {
                ...state,
                subHeaderVisible: !state.subHeaderVisible
            };
        case actions.SUBHEADER_STATE_CHANGE:
            return {
                ...state,
                subHeaderVisible: action.value
            };
        default:
            return state;
    }
};

export default videoCategoryReducer;
