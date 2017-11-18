import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS
} from "../constants";

export function fetchUserList() {
    return {
        type: USER_LIST_REQUEST
    };
}

export function fetchUserListSuccess(userList) {
    return {
        type: USER_LIST_SUCCESS,
        userList
    };
}

export function createUser(userInfo) {
    return {
        type : USER_CREATE_REQUEST,
        userInfo
    }
}

export function createUserSuccess() {
    return {
        type : USER_CREATE_SUCCESS
    }
}