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
  FETCH_SUMMARY_SUCCESS,
  FETCH_SUMMARY_ERROR
} from '../constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  summary : {}
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUMMARY_SUCCESS:
      return state.setIn(["summary"], action.summary);
    default:
      return state;
  }
}

export default appReducer;
