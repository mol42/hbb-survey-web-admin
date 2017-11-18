import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST,
    APP_INITIALIZED
} from "../constants";

export function doLogin(userData) {
    return {
        type: LOGIN_REQUEST,
        userData
    };
}

export function loginSuccess(loginData) {
    return {
        type : LOGIN_SUCCESS,
        user : loginData.user,
        token : loginData.token
    }
}

export function doLogout() {
    return {
        type : LOGOUT_REQUEST
    }
}

export function informAppInitialized() {
    return {
        type : APP_INITIALIZED
    }
}