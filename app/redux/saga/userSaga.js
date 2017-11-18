/**
 * 
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from 'utils/request';
import { 
    USER_LIST_REQUEST,
    USER_CREATE_REQUEST
} from '../constants';

import {
    fetchUserListSuccess,
    createUserSuccess
} from "../actions/user";

import surveyApi from "./surveyApi";

export function* fetchUserListSaga() {
    
    try {
        let response = yield call(surveyApi.fetchUserList);
        yield put(fetchUserListSuccess(response.data));
    } catch (err) {
        
    }
}

export function* createUserSaga({userInfo}) {

    let userData = {
        ...userInfo,
        "status": 1
    };

    try {
        let response = yield call(surveyApi.createUser, userData);
        yield put(createUserSuccess());
    } catch (err) {
        
    }  
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginSaga() {
    yield takeLatest(USER_LIST_REQUEST, fetchUserListSaga);
    yield takeLatest(USER_CREATE_REQUEST, createUserSaga);
}