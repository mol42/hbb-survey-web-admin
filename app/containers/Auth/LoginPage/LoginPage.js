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
} from "redux/selectors/auth";

import { doLogin, informAppInitialized } from "redux/actions/auth";

import reducer from 'redux/reducers/auth';
import saga from 'redux/saga/loginSaga';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  state = {
    username : "",
    password : ""
  }

  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.informAppInitializedAction();
  }

  componentWillReceiveProps(props) {
    this.props.doLocateToHome();
  }

  render() {

    return (
      <Container style={{paddingBottom : "100px"}}>
        <Helmet>
          <title>Giriş Yapınız</title>
        </Helmet>
        <Row>
            <Col xs="2"></Col>
            <Col xs="8">
                <Alert color="warning">Lütfen giriş yapınız</Alert>
                <FormGroup>
                    <Label for="exampleEmail">Kullanıcı Adı / Email</Label>
                    <Input type="email" name="email" placeholder="Kullanıcı Adı veya Emailinizi giriniz" value={this.state.email} onChange={(evt) => this.setState({username : evt.nativeEvent.target.value})} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Şifre</Label>
                    <Input type="password" name="password" placeholder="Şifrenizi giriniz" value={this.state.password} onChange={(evt) => this.setState({password : evt.nativeEvent.target.value})} />
                </FormGroup>
                <FormGroup>
                    <Button color="primary" className="pull-right" onClick={() => this.props.doLoginAction(this.state)}>Giriş Yap</Button>
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
    informAppInitializedAction : () => dispatch(informAppInitialized()),
    doLoginAction : (userData) => dispatch(doLogin(userData)),
    doLocateToHome : () => dispatch(push('/home'))
  };
}

const mapStateToProps = createStructuredSelector({
  loginForm : makeSelectLoginForm(),
  user : makeSelectLoginUser()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'loginSaga', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
