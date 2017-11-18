/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST
} from "../constants";

// The initial state of the App
const initialState = fromJS({
    user : {

    },
    token : ""
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
        return state;
    case LOGIN_SUCCESS:
        return state.set('user', fromJS(action.user)).set('token', action.token);
    case LOGOUT_REQUEST:
        return initialState;
    default:
      return state;
  }
}

export default loginReducer;
