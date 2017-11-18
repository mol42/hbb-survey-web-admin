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
import saga from 'redux/saga/userSaga';

import UserListPage from "../ListPage";
import UserCreatePage from "../CreatePage";

export class UserMainPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    
    render() {
      return (
        <div>
          <Switch>
            <Route path="/user/list" component={UserListPage} />
            <Route path="/user/create" component={UserCreatePage} />
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
  
  const withReducer = injectReducer({ key: 'user', reducer });
  const withSaga = injectSaga({ key: 'userMain', saga });
  
  export default withRouter(compose(
    withReducer,
    withSaga,
    withConnect,
  )(UserMainPage));