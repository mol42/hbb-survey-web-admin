import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route
} from 'react-router-dom';
import {
  Helmet
} from 'react-helmet';
import {
  FormattedMessage
} from 'react-intl';
import {
  connect
} from 'react-redux';
import {
  compose
} from 'redux';
import {
  createStructuredSelector
} from 'reselect';
import {
  push
} from 'react-router-redux';
import { withRouter } from 'react-router-dom'
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  fetchPassiveSurveyList,
  deleteSurvey,
  toggleSurveyStatus
} from 'redux/actions/survey';
import {
  makeSelectPassiveSurveyList
} from 'redux/selectors/survey';
import reducer from 'redux/reducers/survey';
import saga from 'redux/saga/surveySaga';

import {
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import Header from "./Header";
import ActionButtons from "./ActionButtons";
import FontAwesome from 'react-fontawesome';

import SurveyItemActions from "components/SurveyItemActions/SurveyItemActions";

import {
  Link
} from 'react-router-dom';
import {
  Alert,
  Container,
  Table,
  Row,
  Col
} from 'reactstrap';

export class PassiveSurveyListPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    
    static isPrivate = true;

    /**
     * when initial state username is not null, submit the form to load repos
     */
    componentDidMount() {
      this.props.fetchPassiveSurveyListAction();
    }
  
    render() {
      return (
        <Container>
          <Header />
          <br />
          {this._renderSurveyList()}
        </Container>
      );
    }

    _renderSurveyList() {

      return (<Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Anket Adı</th>
                <th>Eklenme Tarihi</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {this._renderSurveyListBody()}
            </tbody>
          </Table>);
    }

    _renderSurveyListBody() {
      let surveyList = this.props.passiveSurveyList;
  
      if (surveyList.size == 0 || surveyList.length == 0) {
        return null;
      }
  
      return surveyList.map((survey, index) => {
        let surveyDate = new Date(survey.get('createDate'));
        let surveyId = survey.get('surveyId');
        let surveyStatus = survey.get("status");
        let choiceOwnerSize = survey.get("choiceOwnerSize");
        let hasChoiceOwners = !(choiceOwnerSize == 0 || choiceOwnerSize == null);

        return <tr key={index}>
                <th scope="row">{index+1}</th>
                <td style={{width : 320}}>{survey.get('name')}</td>
                <td>{surveyDate.toLocaleDateString() + " " + this._formatHour(surveyDate)}</td>
                <td>
                  <SurveyItemActions  surveyId={surveyId} 
                                      editEnabled={!hasChoiceOwners}
                                      toggleEnabled={true}
                                      toggleType={"continue"}
                                      deleteEnabled={!hasChoiceOwners} 
                                      editSurveyClicked={() => this.props.locateToEditSurveyAction(surveyId)}
                                      onConfirmDeleteClicked={() => this._deleteSurvey(surveyId)}
                                      toggleSurveyStatusClicked={() => this._toggleSurveyStatus(surveyId, surveyStatus)} 
                                      copySurveyClicked={() => this.props.locateToCopySurveyAction(surveyId)} />
                </td>
              </tr>
      });
    }

    _deleteSurvey(surveyId) {
      this.props.deleteSurveyAction(surveyId);
    }

    _toggleSurveyStatus(surveyId, surveyStatus) {
      this.props.toggleSurveyStatusAction(surveyId, surveyStatus);
    }
  
    _formatHour(date) {
      const hourPart = date.getHours() <= 9 ? "0" + date.getHours() : date.getHours();
      const minutePart = date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes();
      return hourPart + ":" + minutePart;
    }
  }

  export function mapDispatchToProps(dispatch) {
    return {
      locateToEditSurveyAction : (surveyId) => dispatch(push(`/survey/edit/${surveyId}/passive`)),
      locateToCopySurveyAction : (surveyId) => dispatch(push(`/survey/copy/${surveyId}/passive`)),
      fetchPassiveSurveyListAction : () => dispatch(fetchPassiveSurveyList()),
      deleteSurveyAction : (surveyId) => dispatch(deleteSurvey(surveyId)),
      toggleSurveyStatusAction : (surveyId, surveyStatus) => dispatch(toggleSurveyStatus(surveyId, surveyStatus))
    };
  }
  
  const mapStateToProps = createStructuredSelector({
    passiveSurveyList : makeSelectPassiveSurveyList()
  });
  
  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
  const withReducer = injectReducer({ key: 'home', reducer });
  const withSaga = injectSaga({ key: 'surveyList', saga });
  
  export default withRouter(compose(
    withReducer,
    withSaga,
    withConnect,
  )(PassiveSurveyListPage));