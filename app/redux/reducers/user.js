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
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS
} from "../constants";

// The initial state of the App
const initialState = fromJS({
    userList : [],
    user : {},
    userFlags : {
        saveInProgress : false,
        saveCompleted : false
    }
});

function loginReducer(state = initialState, action) {

  switch (action.type) {
    case USER_CREATE_REQUEST:
        return state.setIn(["userFlags", "saveInProgress"], true)
                    .setIn(["userFlags", "saveCompleted"], false);
    case USER_CREATE_SUCCESS:
    return state.setIn(["userFlags", "saveInProgress"], false)
                .setIn(["userFlags", "saveCompleted"], true);    
    case USER_LIST_SUCCESS:
        return state.setIn(["userList"], fromJS(action.userList));
    default:
        return state;
  }
}

export default loginReducer;
