
import {
  call,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import {
  SAVE_SURVEY_REQUEST,
  FETCH_SURVEY_LIST,
  DELETE_SURVEY_REQUEST,
  FETCH_PASSIVE_SURVEY_LIST,
  TOOGLE_SURVEY_STATUS,
  UPDATE_SURVEY_REQUEST,
  FETCH_SUMMARY
} from '../constants';
import {
  fetchSurveyListSuccess,
  saveSurveySuccess,
  updateSurveySuccess,
  saveSurveyError,
  deleteSurveySuccess,
  fetchSurveyList,
  fetchPassiveSurveyList,
  fetchPassiveSurveyListSuccess
} from 'redux/actions/survey';
import {
  fetchSummarySuccess
} from "redux/actions/global";
import request from 'utils/request';
import { generateId } from "utils/idGenerator";

import {
  makeSelectSurvey,
  makeSelectSurveyIdToDelete
} from 'redux/selectors/survey';
import {
  makeSelectToken
} from "redux/selectors/auth";

import surveyApi from "./configureApi";

export function* fetchSummarySaga() {

  try {
    const response = yield call(surveyApi.fetchSummaryData);
    
    if(response.status == 'ok') {
      const summary = yield response.data;
      yield put(fetchSummarySuccess(summary));
    }
  } catch (err) {
    // TODO(tayfun) : handle error
  }  
}

/**
 * Github repos request/response handler
 */
export function* saveSurvey() {
  const survey = yield select(makeSelectSurvey());
  const apiToken = yield select(makeSelectToken());
  const surveyJS = survey.toJS();

  const postData = {
    uid : generateId(),
    name : surveyJS.name,
    author : 1,
    status : 1,
    questionROList : [],
    relationROList : []
  };

  surveyJS.questions.forEach((surveyQuestion, surveyIndex) => {
    
    let tmpQuestionObj = {
      uid : surveyQuestion.uid,
      text : surveyQuestion.text,
      type : surveyQuestion.type,
      questionOrder : surveyIndex,
      relationExist : false,
      visible : surveyQuestion.visible,
      mandatory : surveyQuestion.mandatory,
      status : 1,
      answerROList : []
    };

    if (surveyQuestion.type == 1) {
      // Eğer text cevap istiyor isek dummy bir answer nesnesi yaratmalıyız sunucu tarafında
      // buradaki lojik bu dummy nesneyi yarattırmak için.
      tmpQuestionObj.answerROList.push({
        uid : generateId(),
        text : surveyQuestion.text,
        answerOrder : 1,
        status : 1
      });

    } else {

      surveyQuestion.answers.forEach((answer, answerIndex) => {
        tmpQuestionObj.answerROList.push({
          uid : answer.uid,
          text : answer.text,
          answerOrder : answerIndex,
          status : 1
        });
      });
    }
    
    postData.questionROList.push(tmpQuestionObj);
  });

  surveyJS.relations.forEach((relation, relationIndex) => {
    
    let tmpRelationObj = {
      ...relation,
      status : 1
    };

    delete tmpRelationObj.completed;
    postData.relationROList.push(tmpRelationObj);
  });

  try {
    const response = yield call(surveyApi.saveSurvey, postData);

    yield put(saveSurveySuccess(response));
  } catch (err) {
    yield put(saveSurveyError(err));
  }

}

export function* updateSurvey() {
  const survey = yield select(makeSelectSurvey());
  const apiToken = surveyApi.getToken();
  const surveyJS = survey.toJS();

  const postData = {
    uid : generateId(),
    surveyId : surveyJS.surveyId,
    name : surveyJS.name,
    author : surveyJS.author,
    status : surveyJS.status,
    questionROList : [],
    relationROList : []
  };

  surveyJS.questions.forEach((surveyQuestion, surveyIndex) => {
    
    let tmpQuestionObj = {
      uid : surveyQuestion.uid,
      text : surveyQuestion.text,
      type : surveyQuestion.type,
      questionOrder : surveyIndex,
      relationExist : false,
      visible : surveyQuestion.visible,
      mandatory : surveyQuestion.mandatory,
      status : 1,
      answerROList : []
    };

    if (surveyQuestion.type == 1) {
      // Eğer text cevap istiyor isek dummy bir answer nesnesi yaratmalıyız sunucu tarafında
      // buradaki lojik bu dummy nesneyi yarattırmak için.
      tmpQuestionObj.answerROList.push({
        uid : generateId(),
        text : surveyQuestion.text,
        answerOrder : 1,
        status : 1
      });

    } else {

      surveyQuestion.answers.forEach((answer, answerIndex) => {
        tmpQuestionObj.answerROList.push({
          uid : answer.uid,
          text : answer.text,
          answerOrder : answerIndex,
          status : 1
        });
      });
    }
    
    postData.questionROList.push(tmpQuestionObj);
  });

  surveyJS.relations.forEach((relation, relationIndex) => {
    
    let tmpRelationObj = {
      ...relation,
      status : 1
    };

    delete tmpRelationObj.completed;
    postData.relationROList.push(tmpRelationObj);
  });

  try {
    const response = yield call(surveyApi.updateSurvey, postData);

    yield put(updateSurveySuccess(response));
  } catch (err) {
    yield put(saveSurveyError(err));
  }
}

/**
 * Github repos request/response handler
 */
export function* getSurveyList() {

    try {
      const response = yield call(surveyApi.getSurveyList);
      
      if(response.status == 'ok') {
          const surveyList = yield response.data;
          yield put(fetchSurveyListSuccess(surveyList));
      }

    } catch (err) {
      // TODO(tayfun) : handle error
    }
}

export function* getPassiveSurveyList() {
  
    try {
      const response = yield call(surveyApi.getPassiveSurveyList);
      
      if(response.status == 'ok') {
          const surveyList = yield response.data;
          yield put(fetchPassiveSurveyListSuccess(surveyList));
      }
    } catch (err) {
      // TODO(tayfun) : handle error
    }
}

// sadece pasif anketler silinebilir...
export function* deleteSurvey({surveyId}) {

    try {
        const response = yield call(surveyApi.deleteSurvey, surveyId);

        yield put(deleteSurveySuccess(surveyId));
        yield put(fetchPassiveSurveyList());
    } catch (err) {
        // TODO(tayfun) : handle error
    }
}

export function* toggleSurveyStatus({surveyId, surveyStatus}) {
  
  let toggledStatus = surveyStatus == 0 ? 1 : 0;

  try {
    const response = yield call(surveyApi.toggleSurveyStatus, surveyId, toggledStatus);
    
    yield put(fetchSurveyList());
    yield put(fetchPassiveSurveyList());
  } catch (err) {
    // TODO(tayfun) : handle error
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* surveySaga() {
   yield takeLatest(FETCH_SURVEY_LIST, getSurveyList);
   yield takeLatest(FETCH_PASSIVE_SURVEY_LIST, getPassiveSurveyList);
   yield takeLatest(DELETE_SURVEY_REQUEST, deleteSurvey);
   yield takeLatest(SAVE_SURVEY_REQUEST, saveSurvey);
   yield takeLatest(UPDATE_SURVEY_REQUEST, updateSurvey);
   yield takeLatest(TOOGLE_SURVEY_STATUS, toggleSurveyStatus);
   yield takeLatest(FETCH_SUMMARY, fetchSummarySaga)
}