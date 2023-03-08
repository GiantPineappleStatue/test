import * as actions from '../actionTypes';

const initialState = {
    title: {
        value: '',
        touch: false,
        error: false
    },
    description: {
        value: '',
        touch: false,
        error: true
    },
    albumPrice: {
        value: '',
        touch: false,
        error: true
    },
    albumAvailablity: {
        value: false,
        touch: false,
        error: true
    },
    tags: [],
    genres: [],
    // genres: { value: '', touch: false, error: false },
    videoFile: null,
    videoFileUrl: null,
    thumbnail: null,
    creditArray: [{ position: '', username: '', percentage: '' }],
    subscriptionArray: [],
    imagedetails: {
        type: 'illustration',
        matureContent: 'mature',
        description: '',
        category: ''
    },
    albumThumbnail: {
        file: null,
        url: null
    },
    audioTracks: [],
    audioTracksPrice: [],
    imageType: { value: 'illustration' },
    imageMatureContent: { value: 'mature' },
    imageTitle: {
        value: '',
        touch: false,
        error: false
    },
    imageDescription: {
        value: '',
        touch: false,
        error: false
    },
    imageCategory: {
        value: '',
        touch: false,
        error: false
    },
    imagesArray: [],
    imagesFiles: null,
    imageDetail: []
};
const copyState = initialState;
const videoCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.INPUT_CHANGE:
            return {
                ...state,
                [action.event.target.name]: {
                    value: action.event.target.value,
                    touch: true,
                    error: !action.event.target.value
                }
            };
        case actions.TAGS_ADD:
            const updatedtags = [...state.tags];
            updatedtags.push(action.value);
            return {
                ...state,
                tags: updatedtags
            };
        case actions.TAGS_REMOVE:
            const updatedTags = [...state.tags];
            updatedTags.splice(action.index, 1);
            return {
                ...state,
                tags: updatedTags
            };
        case actions.GENRE_ADD:
            const updatedGenre = [...state.genres];
            updatedGenre.push(action.value);
            return {
                ...state,
                genres: updatedGenre
            };
        case actions.GENRE_REMOVE:
            const removeGenre = [...state.genres];
            removeGenre.splice(action.index, 1);
            return {
                ...state,
                genres: removeGenre
            };
        case actions.VIDEO_FILE_CHANGE:
            return {
                ...state,
                videoFile: action.file,
                videoFileUrl: action.videoUrl
            };
        case actions.CLEAR_URL:
            return {
                ...state,
                videoFile: null,
                videoFileUrl: null
            };
        case actions.ADD_THUMBNAIL:
            return {
                ...state,
                thumbnail: action.url
            };
        case actions.ADD_CREDIT:
            return {
                ...state,
                creditArray: [...state.creditArray, { position: '', username: '', percentage: '' }]
            };
        case actions.CREDIT_HANDLE_CHANGE:
            const updateCredit = [...state.creditArray];
            updateCredit[action.e.target.name.split('-')[1]][action.e.target.name.split('-')[0]] =
                action.e.target.value;
            return {
                ...state,
                creditArray: updateCredit
            };
        case actions.REMOVE_CREDIT:
            const updateCredit1 = [...state.creditArray];
            updateCredit1.splice(action.index, 1);
            return {
                ...state,
                creditArray: updateCredit1
            };
        case actions.SELECTED_PLANS_CHANGE:
            return {
                ...state,
                subscriptionArray: action.payload
            };
        case actions.ADD_IMAGES:
            return {
                ...state,
                imagesFiles: action.images,
                imagesArray: [...state.imagesArray, ...action.images],
                imageDetail: [
                    ...state.imageDetail,
                    ...[...action.images].map((k) => ({
                        title: '',
                        desc: '',
                        category: '',
                        type: '',
                        mature: ''
                    }))
                ]
            };
        case actions.REMOVE_IMAGE:
            const updateImages = [...state.imagesArray];
            updateImages.splice(action.index, 1);
            const updateImageDetail = [...state.imageDetail];
            updateImageDetail.splice(action.index, 1);
            return {
                ...state,
                imagesArray: updateImages,
                imageDetail: updateImageDetail
            };
        case actions.ALBUM_THUMBNAIL_ADD:
            return {
                ...state,
                albumThumbnail: {
                    file: action.file,
                    url: action.url
                }
            };
        case actions.ALBUM_THUMBNAIL_REMOVE:
            return {
                ...state,
                albumThumbnail: {
                    file: null,
                    url: null
                }
            };
        case actions.ADD_IMAGE_DETAIL:
            const updateImageDetail1 = [...state.imageDetail];
            updateImageDetail1[action.index] = action.data;
            return {
                ...state,
                imageDetail: updateImageDetail1
            };
        case actions.ADD_AUDIO_TRACKS:
            const tracks = [...state.audioTracks, ...action.tracks];
            return {
                ...state,
                audioTracks: tracks,
                audioTracksPrice: tracks.map((k, i) => ({ name: '', value: '' }))
            };
        case actions.REMOVE_AUDIO_TRACK:
            const updateAudioTracks = [...state.audioTracks];
            updateAudioTracks.splice(action.index, 1);
            return {
                ...state,
                audioTracks: updateAudioTracks,
                audioTracksPrice: updateAudioTracks.map((k, i) => ({ name: '', value: '' }))
            };
        case actions.UPDATE_AUDIO_TRACK:
            const updateAudios = [...state.audioTracks];
            const file = new File([updateAudios[action.index]], action.name, {
                type: updateAudios[action.index].type
            });
            updateAudios[action.index] = file;
            return {
                ...state,
                audioTracks: updateAudios
            };
        case actions.UPDATE_AUDIO_TRACK_PRICE:
            const trackPrice = [...state.audioTracksPrice];
            const updatePrice = { name: action.name, value: action.value };
            trackPrice[action.index] = updatePrice;

            return {
                ...state,
                audioTracksPrice: trackPrice
            };
        case actions.UPDATE_DATA:
            return {
                ...state,
                title: {
                    ...state.title,
                    value: action.data.title
                },
                description: {
                    ...state.description,
                    value: action.data.description
                },
                // genres: {
                // 	...state.genres,
                // 	value: action.data.genre
                // },
                genres: action.data.genre,
                tags: action.data.tags,
                albumThumbnail: {
                    ...state.albumThumbnail,
                    file: null,
                    url: action.data.thumbnail
                }
            };
        case actions.CLEAR_VIDEO_STATE:
            return copyState;
        default:
            return state;
    }
};

export default videoCategoryReducer;
