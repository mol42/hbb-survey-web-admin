/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
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

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  createUser
} from 'redux/actions/user';
import {
  makeSelectUserFlags
} from "redux/selectors/user";
import saga from 'redux/saga/userSaga';
import reducer from "redux/reducers/user";
// components
import {
  Alert,
  Container,
  Table,
  Row,
  Col,
  FormGroup,
  Form,
  Label,
  Input,
  Button
} from 'reactstrap';
import Select from "react-select";
import { push } from 'react-router-redux';

const USER_ROLES = [
  {
    value : -1,
    label : "Rol seçiniz"
  },
  {
    value : 1,
    label : "admin"
  }
];

export class UserCreatePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    name : "",
    surname : "",
    username : "",
    email : "",
    mobile : "",
    password : "",
    password2 : "",
    role : -1
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.userFlags.get("saveInProgress") && nextProps.userFlags.get("saveCompleted")) {
      this.props.locateToUserListAction();
    }
  }

  render() {
    let {name, surname, username, email, mobile, password, password2, role} = this.state;

    return (
      <article>
        <Helmet>
          <title>Kullanıcı Oluştur</title>
        </Helmet>
        <Row>
          <Col xs="9">
              <h2>Kullanıcı Oluştur</h2>
              <hr />
              <FormGroup>
                  <Label for="exampleEmail">İsim</Label>
                  <Input type="text" name="name" placeholder="İsim giriniz" value={name} onChange={this._onChangeTextListener("name")} />
              </FormGroup>
              <FormGroup>
                  <Label for="exampleEmail">Soyad</Label>
                  <Input type="text" name="surname" placeholder="Soyad giriniz" value={surname} onChange={this._onChangeTextListener("surname")} />
              </FormGroup>
              <FormGroup>
                  <Label for="exampleEmail">Sistem Adı</Label>
                  <Input type="text" name="systemName" placeholder="Sistem adını giriniz" value={username} onChange={this._onChangeTextListener("username")} />
              </FormGroup>
              <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="mail" name="email" placeholder="Emailini giriniz" value={email} onChange={this._onChangeTextListener("email")} />
              </FormGroup>
              <FormGroup>
                  <Label for="exampleEmail">Telefon</Label>
                  <Input type="tel" name="mobile" placeholder="Telefonunu giriniz" value={mobile} onChange={this._onChangeTextListener("mobile")} />
              </FormGroup>  
              <FormGroup>
                  <Label for="exampleEmail">Şifre</Label>
                  <Input type="password" name="password" placeholder="Şifre belirtiniz" value={password} onChange={this._onChangeTextListener("password")} />
              </FormGroup>  
              <FormGroup>
                  <Label for="exampleEmail">Şifre Tekrar</Label>
                  <Input type="password" name="password2" placeholder="Şifre belirtiniz" value={password2} onChange={this._onChangeTextListener("password2")} />
              </FormGroup>                          
              <FormGroup>
                  <Label for="exampleEmail">Rolü</Label>
                  <Select
                        name="form-field-name"
                        value={this.state.role}
                        onChange={this._onPermissionLevelChange}
                        options={USER_ROLES}
                        />
              </FormGroup>                                                      
              <FormGroup>
                  <Button color="primary" className="pull-right" onClick={this._createUser}>Kullanıcıyı Oluştur</Button>
              </FormGroup>
          </Col>
        </Row>
      </article>
    );
  }

  _onPermissionLevelChange = (option) => {
    this.setState({role : option.value});
  }

  _onChangeTextListener = (stateKey) => {
    return (event) => {
      let newState = {};
      newState[stateKey] = event.nativeEvent.target.value;
      this.setState(newState);
    }
  }

  _createUser = () => {
    let {password, password2, role} = this.state;
    if (password != password2) {
      alert("Girdiğiniz şifreler birbiri ile uyuşmuyor, lütfen şifreleri düzeltip tekrar deneyiniz");
      return;
    }
    if (role == -1) {
      alert("Lütfen bir rol seçiniz");
      return;
    }
    this.props.createUserAction(this.state);
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    createUserAction : (userInfo) => dispatch(createUser(userInfo)),
    locateToUserListAction : () => dispatch(push("/user/list"))
  };
}

const mapStateToProps = createStructuredSelector({
  userFlags : makeSelectUserFlags()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'user', reducer});
const withSaga = injectSaga({ key: 'userCreate', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserCreatePage);
