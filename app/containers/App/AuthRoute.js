import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const isAuthenticated = ({store}) => {
  let reduxStore = store.getState();
  let user = reduxStore.getIn(['login', 'user']);
  return user && user.get('id') > 0;
}

const PRIVATE_ROOT = '/home';
const PUBLIC_ROOT = '/login';

const PATH_CONFIGURATION = {
    "/login" : {
      isPrivate : false
    },
    "/" : {
      isPrivate : true
    },  
    "/home" : {
        isPrivate : true
    },
    "/survey/*" : {
        isPrivate : true
    },
    "/reports" : {
      isPrivate : true
    },
    "/user/*" : {
      isPrivate : true
    },    
    "/logout" : {
      isPrivate : true
    }
}

const AuthRoute = ({component, store, ...props}) => {

  const {isPrivate} = PATH_CONFIGURATION[props.path];
    
  if (isAuthenticated(store)) {
    //User is Authenticated
    if (isPrivate === true) {
      //If the route is private the user may proceed.
      return <Route { ...props } component={ component } />;
    }
    else {
      //If the route is public, the user is redirected to the app's private root.
      return <Redirect to={ PRIVATE_ROOT } />;
    }
  }
  else {
    //User is not Authenticated
    if (isPrivate === true) {
      //If the route is private the user is redirected to the app's public root.
      return <Redirect to={ PUBLIC_ROOT } />;
    }
    else {
      //If the route is public, the user may proceed.
      return <Route { ...props } component={ component } />;
    }
  }
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};

export default AuthRoute;