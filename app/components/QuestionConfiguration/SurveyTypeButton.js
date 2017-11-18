import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
// imported components

class SurveyTypeButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
    render() {
        let {title, selected} = this.props;
        if (selected) {
            return <Button color="info" block onClick={this.props.onClick}>{title}</Button>
        } else {
            return <Button color="secondary" block onClick={this.props.onClick}>{title}</Button>
        }
    }
}

export default SurveyTypeButton;
