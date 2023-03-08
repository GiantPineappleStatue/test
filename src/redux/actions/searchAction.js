import { put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actionTypes';
export const searchResult = (data) => ({
    type: 'REARCH_RESULT_SAGA',
    payload: data
});

export const playlistIdChange = (id) => ({
    type: 'PLAYLIST_ID_SAGA',
    payload: id
});

export function* saga() {
    yield takeLatest('REARCH_RESULT_SAGA', function* incSaga(data) {
        yield put({ type: actions.SEARCH_RESULT, payload: data.payload });
    });
    yield takeLatest('PLAYLIST_ID_SAGA', function* incSaga(data) {
        yield put({ type: actions.PLAYLIST_ID_CHANGE, id: data.payload });
    });
}
