import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
// imported components

class SurveyAnswerList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
    render() {
        let disabled = this.props.disabled;
        
        return (<ListGroup>
            {this._renderAnswers()}
            {
                disabled ? 
                null :
                <ListGroupItem style={{marginTop : '5px', backgroundColor : '#f5f5f5'}}>
                        <Button onClick={() => this._addNewAnswer()}>Cevap Ekle</Button>
                </ListGroupItem>
            }
        </ListGroup>)
    }

    _renderAnswers() {
        let disabled = this.props.disabled;
        let answers = this.props.surveyItem.get('answers');

        return answers.map((answer, index) => {
            let answerText = answer.get('text');

            return (<ListGroupItem key={index} style={{backgroundColor : '#f5f5f5'}}>
                    <input type="text" value={answerText} onChange={(event) => this._handleTextChange(answer, index, event)} style={{ width: "80%", marginRight: "15px"}} />
                    {
                        disabled ? 
                        null : 
                        <Button color="danger" onClick={() => this._deleteAnswer(answer, index)}>Cevap Sil</Button>
                    }
            </ListGroupItem>)
        });
    }

    _addNewAnswer() {
        this.props.onAddNewAnswerClicked();
    }

    _deleteAnswer(answer, index) {
        this.props.onDeleteAnswerClicked(answer, index);
    }

    _handleTextChange(answer, index, event) {
        this.props.onAnswerChange(answer, index, event.target.value);
    }
}

export default SurveyAnswerList;
