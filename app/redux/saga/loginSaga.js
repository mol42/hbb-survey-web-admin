/**
 * 
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from 'utils/request';
import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    APP_INITIALIZED
} from '../constants';
import { loginSuccess, loginFailure, logoutSuccess } from '../actions/auth';

import surveyApi from "./configureApi";

export function* doLoginRequest(action) {
    
    const loginRequestData = {
        ...action.userData
    };

    try {
        let response = yield call(surveyApi.doLogin, loginRequestData);

        if (response.status == "ok") {

            let authInfo = {
                user : response.data.user,
                token : response.data.xAuthToken
            };
    
            surveyApi.setToken(authInfo.token);
            surveyApi.saveAuthInfo(authInfo);
    
            yield put(loginSuccess({
                user : response.data.user,
                token : response.data.xAuthToken
            }));
        } else {
            // TODO(tayfun) : handle error case...
        }

    } catch (err) {
        // TODO(tayfun) : handle error
    }
}

export function* handleAppInitialized() {

    let authInfoJson = localStorage.getItem("AUTH_INFO");
  
    if (!authInfoJson) {
        return;
    }

    let authInfo = JSON.parse(authInfoJson);
    
    surveyApi.setToken(authInfo.token);

    yield put(loginSuccess(authInfo));
}

export function* doLogout() {
    surveyApi.deleteAuthInfo();
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginSaga() {
    yield takeLatest(LOGIN_REQUEST, doLoginRequest);
    yield takeLatest(APP_INITIALIZED, handleAppInitialized);
    yield takeLatest(LOGOUT_REQUEST, doLogout);
}