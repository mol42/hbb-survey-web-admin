import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import Select from "react-select";
// imported components

const RELATION_ACTIONS = [
    {
        value : -1,
        label : "İşlem Seçiniz"
    },
    {
        value : 1,
        label : "Göster"
    },
    {
        value : 2,
        label : "Gizle"
    }
];

class RelationEntry extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
    render() {
        let {relation} = this.props;
        let selectedQuestionId = relation.get('selectedQuestionUid');
        let selectedAnswerId = relation.get('selectedAnswerUid');
        let actionType = relation.get('actionType');
        let targetQuestionId = relation.get('targetQuestionUid');
        let completed = relation.get('completed');

        let questions = this.questions = this._createQuestionsArray();
        let targetQuestions = this.targetQuestions = this._createQuestionsArray(selectedQuestionId);
        let answers = this._createAnswersArray();
        
        return (<Container>
            <Row>
                <Col>
                    Soru :
                    <Select
                        name="form-field-name"
                        value={selectedQuestionId} 
                        options={questions}
                        onChange={this._onQuestionChanged}
                        />
                </Col>
                <Col>
                    Cevap :
                    <Select
                        name="form-field-name"
                        value={selectedAnswerId}
                        onChange={this._onAnswerChanged}
                        options={answers}
                        />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    İşlem :
                    <Select
                        name="form-field-name"
                        value={actionType} 
                        options={RELATION_ACTIONS}
                        onChange={this._onRelationChanged}
                        />
                </Col>
                <Col>
                    Hedef Soru
                    <Select
                        name="form-field-name"
                        value={targetQuestionId} 
                        options={targetQuestions}
                        onChange={this._onTargetQuestionChanged}
                        />                
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    {completed ? 
                        <Button className={"pull-right"} color="danger" onClick={this.onDeleteRelation}>Sil</Button> 
                        :  
                        <Button className={"pull-right"} color="primary" onClick={this.onSaveRelation}>Kaydet</Button>}                    
                </Col>
            </Row>
        </Container>);
    }

    _createQuestionsArray(selectedTargetQuestionUid = -1) {
        let {surveyQuestions} = this.props;
        let questionsArray = [{
            value : "-1",
            label : "Soru Seçiniz"
        }];

        surveyQuestions.forEach((surveyQuestion, index) => {
            // Eğer sunucudan geliyorsa questionId doludur, ilk defa yaratılıyorsa
            // uid değişkeni UI tarafından set edilmiştir.
            let questionUid = surveyQuestion.get("uid");
            if (selectedTargetQuestionUid != questionUid) {

                let questionText = surveyQuestion.get('text');

                questionsArray.push({
                    value : questionUid,
                    label : questionText,
                    id : questionUid
                });
            }
        });

        return questionsArray;
    }

    _createAnswersArray() {
        let {relation} = this.props;
        let selectedQuestionUid = relation.get('selectedQuestionUid');

        let {surveyQuestions} = this.props;

        let answerArray = [{
            value : "-1",
            label : "Cevap Seçiniz"
        }];

        if (selectedQuestionUid && selectedQuestionUid != "-1") {
            
            let selectedQuestion = surveyQuestions.filter((surveyQuestion) => {
                let uid = surveyQuestion.get("uid");
                return uid == selectedQuestionUid;
            }).get(0);
            
            if (selectedQuestion.get('actionType') != 1) {
                selectedQuestion.get('answers').forEach((answer) => {
                    // Eğer sunucudan geliyorsa answerId doludur, ilk defa yaratılıyorsa
                    // uid değişkeni UI tarafından set edilmiştir.
                    let answerUid = answer.get("uid");
                    answerArray.push({
                        value : answerUid,
                        label : answer.get('text'),
                        id :   answerUid
                    });
                });
            }
        }

        return answerArray;
    }

    _onQuestionChanged = (selectedOption) => {
        this.props.onRelationUpdated({
            selectedQuestionUid : selectedOption.value
        }, this.props.index);
    }

    _onAnswerChanged = (selectedOption) => {
        this.props.onRelationUpdated({
            selectedAnswerUid : selectedOption.value
        }, this.props.index);
    }

    _onRelationChanged = (selectedOption) => {
        this.props.onRelationUpdated({
            actionType : selectedOption.value
        }, this.props.index);
    } 

    _onTargetQuestionChanged = (selectedOption) => {
        this.props.onRelationUpdated({
            targetQuestionUid : selectedOption.value 
        }, this.props.index);
    } 

    onDeleteRelation = () => {
        this.props.onDeleteRelationClicked(this.props.index);
    }

    onSaveRelation = () => {
        this.props.onSaveRelationClicked(this.props.index);
    }
    
    _relationToJS() {
        return this.props.relation.toJS();
    }
}

export default RelationEntry;


