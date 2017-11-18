import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from 'redux/reducers/survey';
import saga from 'redux/saga/dummySaga';

import { ListGroup, ListGroupItem } from 'reactstrap';
import ActionButtons from "./ActionButtons";

import SurveyListPage from "../ListPage";
import PassiveSurveyListPage from "../PassiveListPage";
import SurveyEditPage from "../EditPage";
import SurveyCreatePage from "../CreatePage"

export class SurveyMainPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    
    render() {
      return (
        <div>
          <Switch>
            <Route path="/survey/:action/:id/:from" component={SurveyEditPage} />
            <Route path="/survey/:action/:id/:from" component={SurveyEditPage} />
            <Route path="/survey/active" component={SurveyListPage} />
            <Route path="/survey/passive" component={PassiveSurveyListPage} />
            <Route path="/survey/create" component={SurveyCreatePage} />
          </Switch>
        </div>
      );
    }
  }

  export function mapDispatchToProps(dispatch) {
    return {

    };
  }
  
  const mapStateToProps = createStructuredSelector({

  });
  
  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
  const withReducer = injectReducer({ key: 'survey', reducer });
  const withSaga = injectSaga({ key: 'surveyMain', saga });
  
  export default withRouter(compose(
    withReducer,
    withSaga,
    withConnect,
  )(SurveyMainPage));