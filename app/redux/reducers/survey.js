/*
 * HomeReducer
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
import { generateId } from "../../utils/idGenerator";

import {
  SAVE_SURVEY_REQUEST,
  SAVE_SURVEY_SUCCESS,
  SAVE_SURVEY_ERROR,
  SET_SURVEY_NAME,
  SET_SURVEY_ACTIVE_TAB,
  ADD_SURVEY_QUESTION,
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
  FETCH_PASSIVE_SURVEY_LIST_SUCCESS,
  SHOW_HIDE_DELETE_SURVEY_MODAL,
  UPDATE_SURVEY_REQUEST,
  UPDATE_SURVEY_SUCCESS
} from '../constants';

const REDUCER_NAME = "surveyReducer";

// The initial state of the App
const initialState = fromJS({
  __reducerName : REDUCER_NAME,
  survey: {
    surveyActiveTab : 1,
    name : "",
    questions : [],
    relations : []
  },
  surveyResponse : {},
  surveyList : {
    list : []
  },
  passiveSurveyList : [],
  surveyStates : {
    deleteModalVisible : false,
    saveCompleted : false,
    updateCompleted : false
  },
  surveyIdToDelete : null
});

function createEmptySurveyQuestion() {
  return fromJS({
    uid : generateId(),
    activeTab : 1,
    text : "",
    type : 1,
    visible : true,
    mandatory : false,
    answers : [],
    relationExist : false,
    questionOrder : -1
  })
}

function createEmptyRelation() {
  return fromJS({
    uid : generateId(),
    selectedQuestionUid : -1,
    selectedAnswerUid : -1,
    actionType : -1,
    targetQuestionUid : -1,
    completed : false
  })
}

function createEmptyAnswer() {
  return fromJS({
    uid : generateId(),
    text : ''
  })
}

function surveyReducer(state = initialState, action) {
  
  // TODO(tayfun): weird fix to prevent multiple reducer runs
  // somehow unrelated state comes in so we added this check to 
  // prevent unintended reducer call.
  if(state.get("__reducerName") !== REDUCER_NAME) {
    return state;
  }

  let surveyQuestions = state.getIn(['survey', 'questions']);
  let surveyRelations = state.getIn(['survey', 'relations']);
  let surveyList = state.getIn(['surveyList', 'list']);
  let passiveSurveyList = state.getIn(["passiveSurveyList"]);
  let newSurveyQuestions = null;
  let newRelations = null;
  let index;

  switch (action.type) {
    case ADD_SURVEY_QUESTION:
      return state.setIn(["survey", "questions"], surveyQuestions.push(createEmptySurveyQuestion()));
    case UPDATE_SURVEY_ITEM:
      newSurveyQuestions = surveyQuestions.update(action.index, (question) => {
        return fromJS(action.newQuestion);
      });
      return state.setIn(["survey", "questions"], newSurveyQuestions);
    case ADD_NEW_SURVEY_RELATION:
      let newSurveyRelationArray = surveyRelations.push(createEmptyRelation());
      return state.setIn(['survey', 'relations'], newSurveyRelationArray);
    case ADD_NEW_ANSWER:
      index = surveyQuestions.indexOf(action.surveyItem);
      newSurveyQuestions = surveyQuestions.update(index, (surveyItem) => {
        return surveyItem.set('answers', surveyItem.get('answers').push(createEmptyAnswer()));
      });
      return state.setIn(["survey", "questions"], newSurveyQuestions);
    case DELETE_ANSWER:
      index = surveyQuestions.indexOf(action.surveyItem);
      newSurveyQuestions = surveyQuestions.update(index, (surveyItem) => {
        return surveyItem.set('answers', surveyItem.get('answers').delete(action.index));
      });      
      return state.setIn(["survey", "questions"], newSurveyQuestions);
    case UPDATE_ANSWER:
      index = surveyQuestions.indexOf(action.surveyItem);
      newSurveyQuestions = surveyQuestions.update(index, (surveyItem) => {
        let tmpArray = surveyItem.get('answers').update(action.index, (answer) => {
          return answer.set('text', action.value);
        });
        return surveyItem.set('answers', tmpArray);
      });
      return state.setIn(["survey", "questions"], newSurveyQuestions);
    case SAVE_RELATION:
      newRelations = surveyRelations.update(action.index, (relation) => {
        return relation.set('completed', true);
      });
      return state.setIn(["survey", "relations"], newRelations);    
    case DELETE_RELATION:
      return state.setIn(["survey", "relations"], surveyRelations.delete(action.index));        
    case UPDATE_RELATION:
      newRelations = surveyRelations.update(action.index, (relation) => {
        
        let {newRelation} = action;
        let {selectedQuestionUid, selectedAnswerUid, actionType, targetQuestionUid} = newRelation;

        if (selectedQuestionUid) {
          return relation.set("selectedQuestionUid", selectedQuestionUid);
        } else if(selectedAnswerUid) {
          return relation.set("selectedAnswerUid", selectedAnswerUid);
        } else if(actionType) {
          return relation.set("actionType", actionType);
        } else if(targetQuestionUid) {
          return relation.set("targetQuestionUid", targetQuestionUid);
        }
      });
      return state.setIn(["survey", "relations"], newRelations);
    case SET_SURVEY_NAME:
      return state.setIn(["survey", "name"], action.surveyName);
    case SET_SURVEY_ACTIVE_TAB:
      return state.setIn(["survey", "surveyActiveTab"], action.tabIndex);
    case SAVE_SURVEY_REQUEST:
      return state.setIn(['surveyStates', 'inProgress'], true)
                  .setIn(['surveyStates', 'saveCompleted'], false);
    case SAVE_SURVEY_SUCCESS:
      return state.setIn(['surveyStates', 'inProgress'], false).setIn(['surveyStates', 'saveCompleted'], true);
    case UPDATE_SURVEY_REQUEST:
      return state.setIn(['surveyStates', 'inProgress'], true)
                  .setIn(['surveyStates', 'updateCompleted'], false);      
    case UPDATE_SURVEY_SUCCESS:
      return state.setIn(['surveyStates', 'inProgress'], false).setIn(['surveyStates', 'updateCompleted'], true);
    case FETCH_SURVEY_LIST_SUCCESS:
      // apply sorting first...
      action.surveyList.forEach((survey) => {
        // sort questions..
        survey.questions.sort((question1, question2) => {
          return question1.questionOrder - question2.questionOrder;
        });
        // sort answers
        survey.questions.forEach((question) => {

          question.activeTab = 3;

          question.answers.sort((answer1, answer2) => {
            return answer1.answerOrder - answer2.answerOrder;
          });
        });

        survey.relations.forEach((relation) => {
          relation.completed = true;
        });
      });
      return state.setIn(['surveyList', 'list'], fromJS(action.surveyList))
                  .setIn(['surveyStates', 'saveCompleted'], false);
    case FETCH_PASSIVE_SURVEY_LIST_SUCCESS:
      return state.setIn(["passiveSurveyList"], fromJS(action.passiveSurveyList));
    case SET_SELECTED_SURVEY:
      let selectedSurvey = surveyList.find((survey) => {
        return survey.get('surveyId') == action.surveyId;
      });
      if (!selectedSurvey) {
        selectedSurvey = passiveSurveyList.find((survey) => {
          return survey.get('surveyId') == action.surveyId;
        });
      }
      return state.setIn(['survey'], selectedSurvey)
                  .setIn(['surveyStates', 'saveCompleted'], false)
                  .setIn(['surveyStates', 'updateCompleted'], false);
    case RESET_SURVEY:
      return state.set('survey', initialState.get('survey'));
    case DELETE_SURVEY_REQUEST:
      return state.set('surveyIdToDelete', action.surveyId);
    case DELETE_SURVEY_SUCCESS:
      let indexToDelete = surveyList.findIndex((surveyItem) => {
        return surveyItem.get('surveyId') == action.surveyId;
      });
      return state.setIn(['surveyList', 'list'], surveyList.delete(indexToDelete))
                  .setIn(['surveyStates', 'deleteModalVisible'], false);
    case SHOW_HIDE_DELETE_SURVEY_MODAL:
      return state.setIn(['surveyStates', 'deleteModalVisible'], action.visible);
    default:
      return state;
  }
}

export default surveyReducer;
