/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { fetchSurveyList } from 'redux/actions/survey';
import { makeSelectSurveyList } from "redux/selectors/survey";
import saga from 'redux/saga/surveySaga';
import reducer from "redux/reducers/global";
// components
import SurveyReportItem from "components/SurveyItem/SurveyReportItem";
import Header from './Header';
import { Alert, Container, Table, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

export class ReportPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.fetchSurveyListAction();
  }

  render() {
    return (
        <article>
          <Container>
            <Header />
            <br />
            <ListGroup>
                {this._renderSurveyList()}
            </ListGroup>
          </Container>
        </article>
    );
  }

  _renderSurveyList() {
    //TODO(tayfun): mock data update with redux version later.
    let surveyList = this.props.surveyList.get('list');

    return surveyList.map((item, index) => {
      return <SurveyReportItem key={index} item={item} />
    });
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchSurveyListAction : () => dispatch(fetchSurveyList())
  };
}

const mapStateToProps = createStructuredSelector({
  surveyList : makeSelectSurveyList()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'reportPage', reducer});
const withSaga = injectSaga({ key: 'reportPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReportPage);
