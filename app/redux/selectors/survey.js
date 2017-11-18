/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectSurvey = (state) => state.getIn(['survey', 'survey']);
const selectSurveyParent = (state) => state.getIn(['survey']);

const makeSelectInProgress = () => createSelector(
  selectSurvey,
  (surveyState) => surveyState.get('inProgress')
);

const makeSelectSurvey = () => createSelector(
  selectSurvey,
  (surveyState) => surveyState
);

const makeSelectSelectedSurvey = () => createSelector(
  selectSurveyParent,
  (surveyState) => surveyState.get('selectedSurvey')
);

const makeSelectSurveyList = () => createSelector(
  selectSurveyParent,
  (surveyState) => surveyState.get('surveyList')
);

const makeSelectPassiveSurveyList = () => createSelector(
  selectSurveyParent,
  (surveyState) => surveyState.get('passiveSurveyList')
);

const makeSelectSurveyActiveTab = () => createSelector(
  selectSurvey,
  (surveyState) => surveyState.get('surveyActiveTab')
);

const makeSelectSurveyItems = () => createSelector(
  selectSurvey,
  (surveyState) => surveyState.get('surveyItems')
);

const makeSelectSurveyStates = () => createSelector(
  selectSurveyParent,
  (surveyState) => surveyState.get('surveyStates')
);

const makeSelectSurveyIdToDelete = () => createSelector(
  selectSurveyParent,
  (surveyState) => surveyState.get('surveyIdToDelete')
);


export {
  selectSurvey,
  makeSelectInProgress,
  makeSelectSurvey,
  makeSelectSelectedSurvey,
  makeSelectSurveyActiveTab,
  makeSelectSurveyItems,
  makeSelectSurveyList,
  makeSelectSurveyStates,
  makeSelectSurveyIdToDelete,
  makeSelectPassiveSurveyList
};
