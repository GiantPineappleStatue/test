import { put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actionTypes';

export const tagsAdd = (input, value) => ({ type: 'ADS_TAGS_ADD_SAGA', value: value, input });

export const tagRemove = (input, index) => ({ type: 'ADS_TAGS_REMOVE_SAGA', index: index, input });

export const ageChangeHandler = (value) => ({ type: 'ADS_AGE_SAGA', value: value });

export const inputChange = (data) => ({ type: 'ADS_INPUT_SAGA', target: data });

export function* saga() {
    yield takeLatest('ADS_INPUT_SAGA', function* adsAge(data) {
        yield put({ type: actions.ADS_INPUT_CHANGE, target: data.target });
    });
    yield takeLatest('ADS_AGE_SAGA', function* adsAge(data) {
        yield put({ type: actions.ADS_AGE_CHANGE, value: data.value });
    });
    yield takeLatest('ADS_TAGS_ADD_SAGA', function* tagAdd(data) {
        yield put({ type: actions.ADS_CHIP_ADD, value: data.value, input: data.input });
    });
    yield takeLatest('ADS_TAGS_REMOVE_SAGA', function* tagRemove(data) {
        yield put({ type: actions.ADS_CHIP_REMOVE, value: data.index, input: data.input });
    });
}
