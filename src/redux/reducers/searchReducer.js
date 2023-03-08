import * as actions from '../actionTypes';
const searchReducer = (state = { filtered: [], playlistId: null }, action) => {
    switch (action.type) {
        case actions.SEARCH_RESULT:
            return {
                filtered: [...action.payload]
            };
        case actions.PLAYLIST_ID_CHANGE:
            return {
                ...state,
                playlistId: action.id
            };
        default:
            return { ...state };
    }
};

export default searchReducer;
