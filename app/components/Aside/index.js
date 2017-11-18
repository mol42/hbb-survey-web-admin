import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
// imported components
import HeaderLink from './HeaderLink';
import LogoutLink from './LogoutLink';
import messages from './messages';


class Aside extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem>
            <HeaderLink to="/home">
              <FormattedMessage {...messages.home} />
            </HeaderLink>
          </ListGroupItem>
          <ListGroupItem>
            <HeaderLink to="/survey/active">
              <FormattedMessage {...messages.surveyManagement} />
            </HeaderLink>
          </ListGroupItem>
          <ListGroupItem>
            <HeaderLink to="/survey/passive">
              <FormattedMessage {...messages.passiveSurveys} />
            </HeaderLink>
          </ListGroupItem>          
          <ListGroupItem>
            <HeaderLink to="/reports">
              <FormattedMessage {...messages.reportScreenLink} />
            </HeaderLink>
          </ListGroupItem>
          <ListGroupItem>
            <HeaderLink to="/user/list">
              <FormattedMessage {...messages.userListLink} />
            </HeaderLink>
          </ListGroupItem>          
          <ListGroupItem>
              <LogoutLink to="/logout">
                <FormattedMessage {...messages.logoutButton} />
              </LogoutLink>
          </ListGroupItem>                    
        </ListGroup>          
      </div>
    );
  }


}

export default Aside;
