import { put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actionTypes';

export const videoCategory = (type) => ({ type: 'VIDEO_CATEGORY_SAGA', category: type });

export const pathChange = (path) => ({ type: 'PATH_SAGA', path: path });

export const videoEditUrl = (url) => ({ type: 'VIDEO_EDIT_SAGA', url: url });
export const home = (value) => ({ type: 'HOME_CHANGE_SAGA', value });

export const subheaderChange = () => ({ type: 'SUBHEADER_CHANGE_SAGA' });

export const subheaderStateChange = (value) => ({ type: 'SUBHEADER_STATE_CHANGE_SAGA', value });

export function* saga() {
    yield takeLatest('HOME_CHANGE_SAGA', function* homeSaga(data) {
        yield put({ type: 'HOME_CHANGE', value: data.value });
    });
    yield takeLatest('VIDEO_CATEGORY_SAGA', function* category(data) {
        yield put({ type: 'VIDEO_CATEGORY', category: data.category });
    });
    yield takeLatest('PATH_SAGA', function* path(data) {
        yield put({ type: actions.PATH, path: data.path });
    });
    yield takeLatest('VIDEO_EDIT_SAGA', function* path(data) {
        yield put({ type: actions.VIDEO_EDIT, url: data.url });
    });
    yield takeLatest('SUBHEADER_CHANGE_SAGA', function* path() {
        yield put({ type: actions.SUBHEADER_CHANGE });
    });
    yield takeLatest('SUBHEADER_STATE_CHANGE_SAGA', function* path(data) {
        yield put({ type: actions.SUBHEADER_STATE_CHANGE, value: data.value });
    });
}
