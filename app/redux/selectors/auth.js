/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectLogin = (state) => state.get('login');

const makeSelectLoginForm = () => createSelector(
    selectLogin,
    (loginState) => loginState.get('loginForm')
);

const makeSelectLoginUser = () => createSelector(
    selectLogin,
    (loginState) => loginState.get('user')
);

const makeSelectToken = () => createSelector(
    selectLogin,
    (loginState) => loginState.get('token')
);

export {
    makeSelectLoginForm,
    makeSelectLoginUser,
    makeSelectToken
};
