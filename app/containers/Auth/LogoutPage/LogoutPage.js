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
import { push } from 'react-router-redux';

import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
    Row,
    Col,
    Alert,
    FormGroup,
    Form,
    Label,
    Input
  } from 'reactstrap';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  makeSelectLoginForm,
  makeSelectLoginUser
} from "redux/selectors/auth"

import { doLogin, doLogout } from "redux/actions/auth";

import reducer from 'redux/reducers/auth';
import saga from 'redux/saga/loginSaga';

export class LogoutPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {

  }

  componentWillReceiveProps(props) {
    this.props.doLocateToHome();
  }

  render() {

    return (
      <Container style={{paddingBottom : "100px"}}>
        <Helmet>
          <title>Çıkış</title>
        </Helmet>
        <Row>
            <Col xs="2"></Col>
            <Col xs="8">
                <Alert color="warning">Çıkış yapmak istediğinize emin misiniz ?</Alert>
                <FormGroup>
                    <Button color="primary" onClick={this.props.doLocateToHome}>Ana Sayfa</Button>
                    <Button color="danger" onClick={this.props.doLogoutAction} style={{marginLeft : "50px"}}>Çıkış Yap</Button>
                </FormGroup>
            </Col>
            <Col xs="2"></Col>
        </Row>
      </Container>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    doLogoutAction : () => dispatch(doLogout()),
    doLocateToHome : () => dispatch(push('/home'))
  };
}

const mapStateToProps = createStructuredSelector({
  user : makeSelectLoginUser()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'loginSaga', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LogoutPage);
