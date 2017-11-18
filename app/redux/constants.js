/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const FETCH_SUMMARY = 'global/App/FETCH_SUMMARY';
export const FETCH_SUMMARY_SUCCESS = 'global/App/FETCH_SUMMARY_SUCCESS';
export const FETCH_SUMMARY_ERROR = 'global/App/FETCH_SUMMARY_ERROR';
export const DEFAULT_LOCALE = 'tr';


// auth
export const LOGIN_REQUEST = "app/Login/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "app/Login/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "app/Login/LOGIN_FAILURE";

export const LOGOUT_REQUEST = "app/Login/LOGOUT_REQUEST";


// survey
export const SAVE_SURVEY_REQUEST = 'survey/Survey/SAVE_SURVEY_REQUEST';
export const SAVE_SURVEY_SUCCESS = 'survey/Survey/SAVE_SURVEY_SUCCESS';
export const SAVE_SURVEY_ERROR = 'survey/Survey/SAVE_SURVEY_ERROR';

export const SET_SURVEY_NAME = 'survey/Survey/SET_SURVEY_NAME';
export const ADD_SURVEY_QUESTION = 'survey/Survey/ADD_SURVEY_QUESTION';
export const SET_SURVEY_ACTIVE_TAB = 'survey/Survey/SET_SURVEY_ACTIVE_TAB';
export const UPDATE_SURVEY_ITEM = 'survey/Survey/UPDATE_SURVEY_ITEM';
export const ADD_NEW_SURVEY_RELATION = 'survey/Survey/ADD_NEW_SURVEY_RELATION';

export const ADD_NEW_ANSWER = 'survey/Survey/ADD_NEW_ANSWER';
export const DELETE_ANSWER = 'survey/Survey/DELETE_ANSWER';
export const UPDATE_ANSWER = 'survey/Survey/UPDATE_ANSWER';

export const UPDATE_RELATION = 'survey/Survey/UPDATE_RELATION';
export const SAVE_RELATION = 'survey/Survey/SAVE_RELATION';
export const DELETE_RELATION = 'survey/Survey/DELETE_RELATION';

export const FETCH_SURVEY_LIST = 'survey/Survey/FETCH_SURVEY_LIST';
export const FETCH_SURVEY_LIST_SUCCESS = 'survey/Survey/FETCH_SURVEY_LIST_SUCCESS';

export const SET_SELECTED_SURVEY = 'survey/Survey/SET_SELECTED_SURVEY';
export const RESET_SURVEY = 'survey/Survey/RESET_SURVEY';

export const DELETE_SURVEY_REQUEST = 'survey/Survey/DELETE_SURVEY_REQUEST';
export const DELETE_SURVEY_SUCCESS = 'survey/Survey/DELETE_SURVEY_SUCCESS';

export const UPDATE_SURVEY_REQUEST = 'survey/Survey/UPDATE_SURVEY_REQUEST';
export const UPDATE_SURVEY_SUCCESS = 'survey/Survey/UPDATE_SURVEY_SUCCESS';

export const FETCH_PASSIVE_SURVEY_LIST = 'survey/Survey/FETCH_PASSIVE_SURVEY_LIST';
export const FETCH_PASSIVE_SURVEY_LIST_SUCCESS = 'survey/Survey/FETCH_PASSIVE_SURVEY_LIST_SUCCESS';

export const SHOW_HIDE_DELETE_SURVEY_MODAL = 'survey/Survey/SHOW_HIDE_DELETE_SURVEY_MODAL';

export const TOOGLE_SURVEY_STATUS = 'survey/Survey/TOOGLE_SURVEY_STATUS';

//
export const APP_INITIALIZED = 'survey/Survey/APP_INITIALIZED';


// user management
export const USER_LIST_REQUEST = 'survey/Survey/USER_LIST_REQUEST';
export const USER_LIST_SUCCESS = 'survey/Survey/USER_LIST_SUCCESS';

export const USER_CREATE_REQUEST = 'survey/Survey/USER_CREATE_REQUEST';
export const USER_CREATE_SUCCESS = 'survey/Survey/USER_CREATE_SUCCESS';