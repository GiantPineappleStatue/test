import { put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actionTypes';

export const profileUser = (user) => ({ type: 'PROFILE_USER_SAGA', user: user });

export const featuredVideo = (videos) => ({ type: 'FEATURED_VIDEO_UPDATE_SAGA', videos: videos });

export const featuredImage = (images) => ({ type: 'FEATURED_2D3D_UPDATE_SAGA', images: images });

export const featuredAudio = (audios) => ({ type: 'FEATURED_AUDIO_UPDATE_SAGA', audios: audios });

export const selectSubscription = (subsc) => ({ type: 'SUBSCRIPTION_SAGA', subsc });

export const planDurationChange = (val) => ({ type: 'PLAN_DURATION_SAGA', val });

export const profileClean = () => ({ type: 'PROFILE_CLEAN_SAGA' });

export const profileReferral = (value) => ({ type: 'PROFILE_REFERRAL_SAGA', value });

// Subscription Actions

export const addSubscription = () => ({ type: 'ADD_SUBSCRIPTION_SAGA' });
export const removeSubscription = (index) => ({ type: 'REMOVE_SUBSCRIPTION_SAGA', index });
export const subscriptionChange = (e) => ({ type: 'SUBSCRIPTION_CHANGE_SAGA', e });
export const subscriptionEdit = (edit, index) => ({ type: 'SUBSCRIPTION_EDIT_SAGA', edit, index });
export const paymentProfile = (val) => ({ type: 'PAYMENT_STATUS_SAGA', value: val });

export function* saga() {
    yield takeLatest('PROFILE_REFERRAL_SAGA', function* profileReferral(data) {
        yield put({ type: actions.PROFILE_REFERRAL, value: data.value });
    });
    yield takeLatest('PROFILE_USER_SAGA', function* profileUser(data) {
        yield put({ type: actions.PROFILE_USER, user: data.user });
    });
    yield takeLatest('FEATURED_VIDEO_UPDATE_SAGA', function* profileUser(data) {
        yield put({ type: actions.PROFILE_FEATURED_VIDEO, videos: data.videos });
    });
    yield takeLatest('FEATURED_2D3D_UPDATE_SAGA', function* profileUserImage(data) {
        yield put({ type: actions.PROFILLE_FEATURED_IMAGES, images: data.images });
    });
    yield takeLatest('FEATURED_AUDIO_UPDATE_SAGA', function* profileUserAudio(data) {
        yield put({ type: actions.PROFILLE_FEATURED_AUDIOS, audios: data.audios });
    });
    yield takeLatest('SUBSCRIPTION_SAGA', function* profileUserSubsc(data) {
        yield put({ type: actions.PROFILE_SUBSCRIPTION_CHANGE, subscription: data.subsc });
    });
    yield takeLatest('PROFILE_CLEAN_SAGA', function* profileUserClean() {
        yield put({ type: actions.PROFILE_CLEAN });
    });
    yield takeLatest('ADD_SUBSCRIPTION_SAGA', function* addSubscr() {
        yield put({ type: actions.ADD_SUBSCRIPTION });
    });
    yield takeLatest('REMOVE_SUBSCRIPTION_SAGA', function* removeSubscr(d) {
        yield put({ type: actions.REMOVE_SUBSCRIPTION, index: d.index });
    });
    yield takeLatest('SUBSCRIPTION_CHANGE_SAGA', function* changeSubscr(d) {
        yield put({ type: actions.HANDLE_SUBSCRIPTION_CHANGE, e: d.e });
    });
    yield takeLatest('SUBSCRIPTION_EDIT_SAGA', function* editSubscr(d) {
        yield put({ type: actions.HANDLE_SUBSCRIPTION_EDIT, edit: d.edit, index: d.index });
    });
    yield takeLatest('PAYMENT_STATUS_SAGA', function* paymentStatus(d) {
        yield put({ type: actions.PAYMENT_STATUS, value: d.value });
    });
    yield takeLatest('PLAN_DURATION_SAGA', function* planDuration(d) {
        yield put({ type: actions.PLAN_DURATION_CHANGE, value: d.val });
    });
}
