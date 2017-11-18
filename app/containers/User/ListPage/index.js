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
import { fetchUserList } from 'redux/actions/user';
import { makeSelectUserList } from "redux/selectors/user";
import saga from 'redux/saga/userSaga';
import reducer from "redux/reducers/user";
// components
import Header from './Header';
import { Alert, Container, Table, Row, Col } from 'reactstrap';

export class UserListPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static isPrivate = true;

  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.fetchUserListAction();
  }

  render() {

    return (
      <article>
        <Helmet>
          <title>Kullanıcı Listesi</title>
        </Helmet>
        <Container>
          <Header />
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Telefon</th>
                <th>Yetki</th>
              </tr>
            </thead>
            <tbody>
              {this._renderUserList()}
            </tbody>
          </Table>
        </Container>
      </article>
    );
  }

  _renderUserList() {
    let userList = this.props.userList;

    if (!userList || userList.size == 0) {
      return null;
    }

    return userList.map((user, index) => {

      return <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{user.get('name')}</td>
              <td>{user.get('surname')}</td>
              <td>{user.get('mobile')}</td>
              <td>{user.get('role').get("name")}</td>
            </tr>
    });
  }  
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchUserListAction : () => dispatch(fetchUserList())
  };
}

const mapStateToProps = createStructuredSelector({
  userList : makeSelectUserList()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'user', reducer});
const withSaga = injectSaga({ key: 'userList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserListPage);
