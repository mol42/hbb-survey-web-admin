import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

const editButtonStyle = {
    position: "absolute", right : "0", top: "0"
};

class SurveyReportItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let item = this.props.item;
    let surveyId = item.get('surveyId');
    return (
      <ListGroupItem>
        <Row>
          <Col xs="1">
            <FontAwesome name="file-text" style={{color: 'blue'}} />
          </Col>
          <Col xs="9">
          {surveyId} {item.get('name')}
          </Col>
          <Col xs="2">
            <a href="javascript:;" onClick={() => {}} style={editButtonStyle}><FontAwesome name="table" size="lg" /></a>          
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

export default SurveyReportItem;
