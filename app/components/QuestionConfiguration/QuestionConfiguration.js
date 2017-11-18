import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import Switch, { Case, Default } from 'react-switch-case';
import Toggle from 'react-toggle';
// imported components

import SurveyTypeButton from "./SurveyTypeButton";
import SurveyAnswerList from "./SurveyAnswerList";

const StyledInput = styled.input`
    padding: 5px;
    width: 100%;
`;

const QUESTION_TYPES = {
    SINGLE_ANSWER : 1,
    MULTI_SINGLE : 2,
    MULTI_MULTI : 3
}

class QuestionConfiguration extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
    render() {
        let activeTab = this.props.surveyItem.get('activeTab');

        if (activeTab == 2) {
            return this._renderAnswerConfigurationTab();
        } else if (activeTab == 3) {
            return this._renderResultTab();
        } else {
            return this._renderQuestionConfigurationTab();
        }
    }

    _renderQuestionConfigurationTab() {
        let question = this.props.surveyItem.get('text');
        let type = this.props.surveyItem.get('type');

        return (<Container style={{backgroundColor : '#f5f5f5'}}>
            <Row>
                <Col xs="3" style={{padding: '5px'}}>Soru :</Col>
                <Col xs="9" style={{padding: '5px'}}>
                    <StyledInput type="input" value={question} onChange={(event) => this._updateQuestion(event) } placeholder={"Soru adını giriniz"}/>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col xs="3" style={{padding: '5px'}}>Cevap Tipi :</Col>
                <Col xs="9" style={{padding: '5px'}}>
                    <SurveyTypeButton title={"Tek Cevap"} selected={type == QUESTION_TYPES.SINGLE_ANSWER} onClick={() => this._handleTypeSelected(QUESTION_TYPES.SINGLE_ANSWER)} />
                    <SurveyTypeButton title={"Çoklu Cevap / Tek Seçim"} selected={type == QUESTION_TYPES.MULTI_SINGLE} onClick={() => this._handleTypeSelected(QUESTION_TYPES.MULTI_SINGLE)} />
                    <SurveyTypeButton title={"Çoklu Cevap / Çoklu Seçim"} selected={type == QUESTION_TYPES.MULTI_MULTI} onClick={() => this._handleTypeSelected(QUESTION_TYPES.MULTI_MULTI)} />
                </Col> 
            </Row>
            <hr />
            <Row>
                <Col>
                    <Button className={"pull-right"} color="primary" onClick={() => this._setActiveTab(2)}>Sonraki</Button>
                </Col>
            </Row>
        </Container>);
    }

    _renderAnswerConfigurationTab() {
        let question = this.props.surveyItem.get('text');
        let type = this.props.surveyItem.get('type');
        let visible = this.props.surveyItem.get('visible');
        let mandatory = this.props.surveyItem.get('mandatory');

        return (<Container style={{backgroundColor : '#f5f5f5'}}>
                <Row>
                    <Col> Soru : {question}</Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                    {this._renderAnswerList()}
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col xs="3"> Göster/Gizle :</Col>
                    <Col xs="9"><Toggle icons={false} defaultChecked={visible} onChange={this._onVisibilityToggleChanged} /></Col>
                </Row>
                <hr />
                <Row>
                    <Col xs="3"> Zorunlu mu ? :</Col>
                    <Col xs="9"><Toggle icons={false} defaultChecked={mandatory} onChange={this._onMandatoryFlagChanged} /></Col>
                </Row>
                <hr />                
                <Row>
                    <Col>
                        <Button className={"pull-right"} style={{marginLeft: "10px"}} color="success" onClick={() => this._setActiveTab(3)}>Tamamla</Button>
                        <Button className={"pull-right"} color="warning" onClick={() => this._setActiveTab(1)}>Geri</Button>
                    </Col>
                </Row>
            </Container>)
    }

    _renderResultTab() {
        let question = this.props.surveyItem.get('text');
        let type = this.props.surveyItem.get('type');
        let visible = this.props.surveyItem.get('visible');
        let mandatory = this.props.surveyItem.get('mandatory');

        return (<Container style={{backgroundColor : '#f5f5f5'}}>
                <Row>
                    <Col> Soru : {question}</Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        {this._renderAnswerList(true)}
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col xs="3"> Göster/Gizle :</Col>
                    <Col xs="9"><Toggle icons={false} defaultChecked={visible} disabled={true} /></Col>
                </Row>                
                <hr />
                <Row>
                    <Col xs="3"> Zorunlu mu ? :</Col>
                    <Col xs="9"><Toggle icons={false} defaultChecked={mandatory} disabled={true} /></Col>
                </Row>                
                <hr />                
                <Row>
                    <Col>
                        <Button onClick={() => this._setActiveTab(2)}>Geri</Button>
                    </Col>
                </Row>
            </Container>)
    }

    _renderAnswerList(disabled = false) {
        let question = this.props.surveyItem.get('text');
        let type = this.props.surveyItem.get('type');
        let visible = this.props.surveyItem.get('visible');

        if (type == QUESTION_TYPES.SINGLE_ANSWER) {
            return this._renderUserAnswerType();
        }

        let {surveyItem} = this.props;

        return <SurveyAnswerList 
                    disabled={disabled}
                    surveyItem={this.props.surveyItem}
                    onAddNewAnswerClicked={() => this.props.onAddNewAnswerClicked(surveyItem)}
                    onDeleteAnswerClicked={(answer, index) => this.props.onDeleteAnswerClicked(surveyItem, answer, index)} 
                    onAnswerChange={(answer, index, value) => this.props.onAnswerChange(surveyItem, answer, index, value)} />;
    }

    _renderUserAnswerType() {
        return <span>Cevap kullanıcı tarafından verilecektir.</span>
    }

    _setActiveTab(selectedTab) {
        let tmpQuestion = this.props.surveyItem.toJS();
        tmpQuestion.activeTab = selectedTab;
        this._informParent(tmpQuestion);
    }

    // TODO(tayfun): propagate this to parent...
    _updateQuestion(event) {
        let tmpQuestion = this.props.surveyItem.toJS();
        tmpQuestion.text = event.target.value;
        this._informParent(tmpQuestion);
    }

    _handleTypeSelected(type) {
        let tmpQuestion = this.props.surveyItem.toJS();
        tmpQuestion.type = type;       
        this._informParent(tmpQuestion);
    }

    _onVisibilityToggleChanged = (event) => {
        let tmpQuestion = this.props.surveyItem.toJS();
        tmpQuestion.visible = event.target.checked;
        this._informParent(tmpQuestion);
    }

    _onMandatoryFlagChanged = (event) => {
        let tmpQuestion = this.props.surveyItem.toJS();
        tmpQuestion.mandatory = event.target.checked;
        this._informParent(tmpQuestion);
    }

    _informParent(tmpQuestion) {
        this.props.onQuestionChange(tmpQuestion);
    }
}

export default QuestionConfiguration;
