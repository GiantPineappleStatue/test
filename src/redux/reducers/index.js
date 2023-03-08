import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import * as searchAction from '../actions/searchAction';
import searchReducer from './searchReducer';

import * as auth from './auth.duck';
import videoCategoryReducer from './videoCategory';
import * as video from '../actions/videoCategory';
import * as videoUpload from '../actions/videoUpload';
import * as profileAction from '../actions/profile';
import * as filterSaga from '../actions/filterMedia';
import VideoUploadReducer from './videoUpload';
import profile from './profile';
import * as videoUploadAdsAction from '../actions/videoUploadAds';
import videoUploadAds from './videoUploadAds';
import filterMedia from './filterMedia';

export default combineReducers({
    auth: auth.reducer,
    videoCategory: videoCategoryReducer,
    videoUpload: VideoUploadReducer,
    profile: profile,
    videoAds: videoUploadAds,
    filter: filterMedia,
    search: searchReducer
});

export function* rootSaga() {
    yield all([
        searchAction.saga(),
        auth.saga(),
        video.saga(),
        videoUpload.saga(),
        profileAction.saga(),
        videoUploadAdsAction.saga(),
        filterSaga.saga()
    ]);
}
