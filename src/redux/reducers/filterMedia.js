import * as actions from '../actionTypes';

const initialState = {
    videos: [],
    filter: false,
    sortDate: null,
    sortRating: null,
    sortLength: null,
    sortMintuesWatched: null,
    searchQuery: '',
    searchType: '',
    letsMakeMovie: false,
    letsMakeMovieV2: false
};

const filterMedia = (state = initialState, action) => {
    switch (action.type) {
        case actions.FILTER_CHANGE:
            return {
                ...state,
                videos: action.media,
                filter: true
            };
        case actions.FILTER_RESET:
            return {
                ...state,
                videos: [],
                filter: false,
                searchQuery: '',
                searchType: '',
                sortDate: null,
                sortRating: null,
                sortLength: null,
                sortMintuesWatched: null
            };
        case actions.LETS_MAKE_MOVIE:
            return {
                ...state,
                letsMakeMovie: action.value
            };
        case actions.LETS_MAKE_MOVIE_V2:
            return {
                ...state,
                letsMakeMovieV2: action.value
            };
        case actions.FILTER_DATE:
            switch (action.name) {
                case 'sortDate':
                    return {
                        ...state,
                        sortDate: action.value,
                        sortRating: null,
                        sortLength: null,
                        sortMintuesWatched: null
                    };
                case 'sortRating':
                    return {
                        ...state,
                        sortDate: null,
                        sortRating: action.value,
                        sortLength: null,
                        sortMintuesWatched: null
                    };
                case 'sortLength':
                    return {
                        ...state,
                        sortDate: null,
                        sortRating: null,
                        sortLength: action.value,
                        sortMintuesWatched: null
                    };
                case 'sortMintuesWatched':
                    return {
                        ...state,
                        sortDate: null,
                        sortRating: null,
                        sortLength: null,
                        sortMintuesWatched: action.value
                    };

                default:
                    return {
                        ...state,
                        [action.name]: action.value
                    };
            }

        default:
            return state;
    }
};

export default filterMedia;
