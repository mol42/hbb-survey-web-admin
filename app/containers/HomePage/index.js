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
import { fetchSummary } from 'redux/actions/global';
import { makeSelectSummary } from "redux/selectors/global";
import { fetchSurveyList } from 'redux/actions/survey';
import { makeSelectSurveyList } from "redux/selectors/survey";
import saga from 'redux/saga/surveySaga';
import reducer from "redux/reducers/global";
// components
import messages from './messages';
import HomePageContainer from "./HomePageContainer";

import { Alert, Container, Table, Row, Col } from 'reactstrap';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static isPrivate = true;

  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.fetchSummaryAction();
    this.props.fetchSurveyListAction();
  }

  render() {
    let {summary} = this.props;

    return (
      <article>
        <Helmet>
          <title>Ana Sayfa</title>
        </Helmet>
        <HomePageContainer>
          <Container>
            <div style={{padding: "5px", backgroundColor : "#fff3cd"}}><b>Sistem Özeti</b></div>
            <Row style={{paddingLeft: "5px"}}>
              <Col xs="2">Anket Adedi :</Col><Col>{summary.activeSurveyCount}</Col>
            </Row>
            <Row style={{paddingLeft: "5px"}}>
              <Col xs="2">Cevap Adedi :</Col><Col>{summary.answerCount}</Col>
            </Row>
          </Container>
          <br />
          <Container>
            <div style={{padding: "5px", backgroundColor : "#fff3cd"}}><b>Son Eklenen Anketler</b></div>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Anket Adı</th>
                  <th>Düzenleyen</th>
                  <th>Eklenme Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {this._renderLast10Survey()}
              </tbody>
            </Table>
          </Container>
        </HomePageContainer>
      </article>
    );
  }

  _renderLast10Survey() {
    let surveyList = this.props.surveyList.get('list');

    if (surveyList.size == 0 || surveyList.length == 0) {
      return null;
    }

    return surveyList.slice(0, 10).map((item, index) => {
      let itemDate = new Date(item.get('createDate'));

      if(!item.get("user")) {
        return null;
      }
      return <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{item.get('name')}</td>
              <td>{item.get('user').get('username')}</td>
              <td>{itemDate.toLocaleDateString() + " " + this._formatHour(itemDate)}</td>
            </tr>
    });
  }

  _formatHour(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hourPart = hours < 9 ? "0" + hours : hours;
    const minutePart = minutes < 9 ? "0" + minutes : minutes;
    return hourPart + ":" + minutePart;
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchSummaryAction : () => dispatch(fetchSummary()),
    fetchSurveyListAction : () => dispatch(fetchSurveyList())
  };
}

const mapStateToProps = createStructuredSelector({
  summary : makeSelectSummary(),
  surveyList : makeSelectSurveyList()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer});
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
