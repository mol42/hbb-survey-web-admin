import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
// imported components

const editButtonStyle = {
    position: "absolute", right : "28px", top: "-10px"
};

const deleteButtonStyle = {
    position: "absolute", right : "0", top: "-10px"
};

class SurveyItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let item = this.props.item;
    let surveyId = item.get('surveyId');
    return (
      <ListGroupItem>
        <Col xs="1">
          <FontAwesome name="file-text" style={{color: 'blue'}} />
        </Col>
        <Col xs="9">
        {surveyId} {item.get('name')}
        </Col>
        <Col xs="2">
          <a href="javascript:;" onClick={() => this.props.onDeleteSurvey(surveyId)} style={deleteButtonStyle}><FontAwesome name="trash" size="lg" style={{color : "red"}} /></a>
          <Link to={`/survey/edit/${surveyId}`} style={editButtonStyle}><FontAwesome name="pencil-square" size="lg" /></Link>          
        </Col>
      </ListGroupItem>
    );
  }
}

export default SurveyItem;
