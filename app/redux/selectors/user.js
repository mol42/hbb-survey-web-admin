/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectUser = (state) => state.get('user');

const makeSelectUserList = () => createSelector(
    selectUser,
    (userState) => userState.get('userList')
);

const makeSelectUserFlags = () => createSelector(
    selectUser,
    (userState) => userState.get('userFlags')
);

export {
    makeSelectUserList,
    makeSelectUserFlags
};
