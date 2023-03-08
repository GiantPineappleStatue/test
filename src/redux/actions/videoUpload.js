import { put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actionTypes';
export const inputChange = (event) => ({ type: 'INPUT_CHANGE_SAGA', event: event });

export const tagsAdd = (value) => ({ type: 'TAGS_ADD_SAGA', value: value });

export const tagRemove = (index) => ({ type: 'TAGS_REMOVE_SAGA', index: index });

export const genreAdd = (value) => ({ type: 'GENRE_ADD_SAGA', value: value });

export const genreRemove = (index) => ({ type: 'GENRE_REMOVE_SAGA', index: index });

export const videoFile = (file, url) => ({
    type: 'VIDEO_FILE_URL_SAGA',
    data: { file: file, url: url }
});

export const clearUrl = () => ({ type: 'VIDEO_CLEAR_URL_SAGA' });

export const addThumbnail = (url) => ({ type: 'ADD_THUMBNAIL_SAGA', url: url });

export const creditHandleChage = (e) => ({ type: 'CREDIT_HANDLE_SAGA', event: e });

export const addCredit = () => ({ type: 'ADD_CREDIT_SAGA' });

export const removeCredit = (i) => ({ type: 'REMOVE_CREDIT_SAGA', index: i });

export const addImages = (images) => ({ type: 'ADD_IMAGES_SAGA', images: images });

export const removeImages = (index) => ({ type: 'REMOVE_IMAGES_SAGA', index: index });

//Audio Tracks

export const addAudios = (tracks) => ({ type: 'ADD_AUDIOS_SAGA', tracks: tracks });

export const removeAudio = (index) => ({ type: 'REMOVE_AUDIO_SAGA', index: index });

export const updateAudio = (index, name) => ({
    type: 'UPDATE_AUDIO_SAGA',
    index: index,
    name: name
});

// For Image and Audio
export const albumThumbnailAdd = (file, url) => ({
    type: 'ALBUM_THUMBNAIL_ADD_SAGA',
    file: file,
    url: url
});

export const albumThumbnailRemove = () => ({ type: 'ALBUM_THUMBNAIL_REMOVE_SAGA' });
//Image Detail Add
export const addImageDetail = (i, data) => ({
    type: 'ADD_IMAGE_DETAIL_SAGA',
    index: i,
    data: data
});

export const update = (data) => ({ type: 'UPDATE_SAGA', data: data });
//Over All Clear Data
export const clearState = () => ({ type: 'CLEAR_VIDEO_STATE_SAGA' });

export const trackPriceChange = (event) => ({ type: 'TRACK_PRICE_UPDATE_SAGA', data: event });

export const subscriptionPlanChange = (payload) => ({
    type: 'SELECTED_PLANS_CHANGE_SAGA',
    payload
});

export function* saga() {
    yield takeLatest('INPUT_CHANGE_SAGA', function* inputChange(data) {
        yield put({ type: actions.INPUT_CHANGE, event: data.event });
    });
    yield takeLatest('TAGS_ADD_SAGA', function* tagAdd(data) {
        yield put({ type: actions.TAGS_ADD, value: data.value });
    });
    yield takeLatest('TAGS_REMOVE_SAGA', function* tagRemove(data) {
        yield put({ type: actions.TAGS_REMOVE, index: data.index });
    });
    yield takeLatest('GENRE_ADD_SAGA', function* tagAdd(data) {
        yield put({ type: actions.GENRE_ADD, value: data.value });
    });
    yield takeLatest('GENRE_REMOVE_SAGA', function* tagRemove(data) {
        yield put({ type: actions.GENRE_REMOVE, index: data.index });
    });
    yield takeLatest('VIDEO_FILE_URL_SAGA', function* videoFile(data) {
        yield put({
            type: actions.VIDEO_FILE_CHANGE,
            file: data.data.file,
            videoUrl: data.data.url
        });
    });
    yield takeLatest('VIDEO_CLEAR_URL_SAGA', function* videoClear(data) {
        yield put({ type: actions.CLEAR_URL });
    });
    yield takeLatest('ADD_THUMBNAIL_SAGA', function* thumbnail(data) {
        yield put({ type: actions.ADD_THUMBNAIL, url: data.url });
    });
    yield takeLatest('CREDIT_HANDLE_SAGA', function* creditHandleChage(data) {
        yield put({ type: actions.CREDIT_HANDLE_CHANGE, e: data.event });
    });
    yield takeLatest('REMOVE_CREDIT_SAGA', function* removeCredit(data) {
        yield put({ type: actions.REMOVE_CREDIT, index: data.index });
    });
    yield takeLatest('ADD_CREDIT_SAGA', function* addCredit(data) {
        yield put({ type: actions.ADD_CREDIT });
    });
    yield takeLatest('ADD_IMAGES_SAGA', function* addImages(data) {
        yield put({ type: actions.ADD_IMAGES, images: data.images });
    });
    yield takeLatest('REMOVE_IMAGES_SAGA', function* removeImages(data) {
        yield put({ type: actions.REMOVE_IMAGE, index: data.index });
    });
    yield takeLatest('ALBUM_THUMBNAIL_ADD_SAGA', function* albumThumbnailAdd(data) {
        yield put({ type: actions.ALBUM_THUMBNAIL_ADD, file: data.file, url: data.url });
    });
    yield takeLatest('ALBUM_THUMBNAIL_REMOVE_SAGA', function* albumThumbnailRemove(data) {
        yield put({ type: actions.ALBUM_THUMBNAIL_REMOVE });
    });
    yield takeLatest('CLEAR_VIDEO_STATE_SAGA', function* clear() {
        yield put({ type: actions.CLEAR_VIDEO_STATE });
    });
    yield takeLatest('ADD_IMAGE_DETAIL_SAGA', function* addImageDetail(data) {
        yield put({ type: actions.ADD_IMAGE_DETAIL, index: data.index, data: data.data });
    });
    yield takeLatest('ADD_AUDIOS_SAGA', function* addAudios(data) {
        yield put({ type: actions.ADD_AUDIO_TRACKS, tracks: data.tracks });
    });
    yield takeLatest('REMOVE_AUDIO_SAGA', function* removeAudio(data) {
        yield put({ type: actions.REMOVE_AUDIO_TRACK, index: data.index });
    });
    yield takeLatest('UPDATE_AUDIO_SAGA', function* addImageDetail(data) {
        yield put({ type: actions.UPDATE_AUDIO_TRACK, index: data.index, name: data.name });
    });
    yield takeLatest('UPDATE_SAGA', function* update(data) {
        yield put({ type: actions.UPDATE_DATA, data: data.data });
    });
    yield takeLatest('TRACK_PRICE_UPDATE_SAGA', function* updateTrackPrice(data) {
        yield put({
            type: actions.UPDATE_AUDIO_TRACK_PRICE,
            index: data.data.index,
            name: data.data.name,
            value: data.data.value
        });
    });
    yield takeLatest('SELECTED_PLANS_CHANGE_SAGA', function* subscriptionChange(data) {
        yield put({
            type: actions.SELECTED_PLANS_CHANGE,
            payload: data.payload
        });
    });
}
