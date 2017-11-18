/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SAVE_SURVEY_REQUEST,
  SAVE_SURVEY_SUCCESS,
  SAVE_SURVEY_ERROR,
  UPDATE_SURVEY_REQUEST,
  UPDATE_SURVEY_SUCCESS,
  SET_SURVEY_NAME,
  ADD_SURVEY_QUESTION,
  SET_SURVEY_ACTIVE_TAB,
  UPDATE_SURVEY_ITEM,
  ADD_NEW_SURVEY_RELATION,
  ADD_NEW_ANSWER,
  DELETE_ANSWER,
  UPDATE_ANSWER,
  UPDATE_RELATION,
  SAVE_RELATION,
  DELETE_RELATION,
  FETCH_SURVEY_LIST,
  FETCH_SURVEY_LIST_SUCCESS,
  SET_SELECTED_SURVEY,
  RESET_SURVEY,
  DELETE_SURVEY_REQUEST,
  DELETE_SURVEY_SUCCESS,
  FETCH_PASSIVE_SURVEY_LIST,
  FETCH_PASSIVE_SURVEY_LIST_SUCCESS,
  SHOW_HIDE_DELETE_SURVEY_MODAL,
  TOOGLE_SURVEY_STATUS
} from '../constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of SAVE_SURVEY
 */
export function saveSurvey() {
  return {
    type: SAVE_SURVEY_REQUEST
  };
}

export function updateSurvey() {
  return {
    type: UPDATE_SURVEY_REQUEST
  }; 
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of SAVE_SURVEY_SUCCESS passing the repos
 */
export function saveSurveySuccess(responseData) {
  return {
    type: SAVE_SURVEY_SUCCESS,
    responseData
  };
}

export function updateSurveySuccess(responseData) {
  return {
    type: UPDATE_SURVEY_SUCCESS,
    responseData
  };
}


/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of SAVE_SURVEY_ERROR passing the error
 */
export function saveSurveyError(error) {
  return {
    type: SAVE_SURVEY_ERROR,
    error,
  };
}

export function setSurveyActiveTab(tabIndex) {
  return {
    type: SET_SURVEY_ACTIVE_TAB,
    tabIndex
  };
} 

export function setSurveyName(surveyName) {
  return {
    type: SET_SURVEY_NAME,
    surveyName
  };
}

export function addSurveyQuestion() {
  return {
    type: ADD_SURVEY_QUESTION
  };
}

export function updateSurveyItem(index, newQuestion) {
  return {
    type: UPDATE_SURVEY_ITEM,
    index,
    newQuestion
  };
}

export function addNewSurveyRelation() {
  return {
    type: ADD_NEW_SURVEY_RELATION
  };
}

export function addNewAnswer(surveyItem) {
  return {
    type: ADD_NEW_ANSWER,
    surveyItem
  };
}

export function deleteAnswer(surveyItem, answer, index) {
  return {
    type: DELETE_ANSWER,
    surveyItem,
    answer,
    index
  };
}

export function updateAnswer(surveyItem, answer, index, value) {
  return {
    type: UPDATE_ANSWER,
    surveyItem,
    answer,
    index,
    value
  };
}

export function updateRelation(newRelation, index) {
  return {
    type: UPDATE_RELATION,
    newRelation,
    index
  };
}

export function saveRelation(index) {
  return {
    type: SAVE_RELATION,
    index
  };
}

export function deleteRelation(index) {
  return {
    type: DELETE_RELATION,
    index
  };
}

export function fetchSurveyList() {
  return {
    type: FETCH_SURVEY_LIST
  };
}

export function fetchSurveyListSuccess(surveyList) {
  return {
    type: FETCH_SURVEY_LIST_SUCCESS,
    surveyList
  };
}

export function fetchPassiveSurveyList() {
  return {
    type: FETCH_PASSIVE_SURVEY_LIST
  };
}

export function fetchPassiveSurveyListSuccess(passiveSurveyList) {
  return {
    type: FETCH_PASSIVE_SURVEY_LIST_SUCCESS,
    passiveSurveyList
  };
}


export function setSelectedSurvey(surveyId) {
  return {
    type: SET_SELECTED_SURVEY,
    surveyId
  }; 
}

export function resetSurvey() {
  return {
    type: RESET_SURVEY
  }; 
}

export function deleteSurvey(surveyId) {
  return {
    type: DELETE_SURVEY_REQUEST,
    surveyId
  }; 
}

export function deleteSurveySuccess(surveyId) {
  return {
    type: DELETE_SURVEY_SUCCESS,
    surveyId
  }; 
}

export function showHideDeleteSurveyModal(visible) {
  return {
    type: SHOW_HIDE_DELETE_SURVEY_MODAL,
    visible
  };  
}


export function toggleSurveyStatus(surveyId, surveyStatus) {
  return {
    type : TOOGLE_SURVEY_STATUS,
    surveyId,
    surveyStatus
  }
}