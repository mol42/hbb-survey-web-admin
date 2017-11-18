import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import HeaderContainer from "./HeaderContainer";

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <HeaderContainer />
      </div>
    );
  }
}

export default Header;
