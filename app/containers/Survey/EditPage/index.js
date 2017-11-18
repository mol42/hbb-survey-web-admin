import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route
} from 'react-router-dom';
import {
  Helmet
} from 'react-helmet';
import {
  FormattedMessage
} from 'react-intl';
import {
  connect
} from 'react-redux';
import {
  compose
} from 'redux';
import {
  createStructuredSelector
} from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  updateSurvey,
  saveSurvey,
  setSurveyActiveTab,
  setSurveyName,
  addSurveyQuestion,
  updateSurveyItem,
  addNewSurveyRelation,
  addNewAnswer,
  deleteAnswer,
  updateAnswer,
  updateRelation,
  saveRelation,
  deleteRelation,
  resetSurvey,
  setSelectedSurvey
} from 'redux/actions/survey';
import {
  makeSelectSurveyActiveTab,
  makeSelectSurvey,
  makeSelectSurveyItems,
  makeSelectSurveyStates
} from 'redux/selectors/survey';
import reducer from 'redux/reducers/survey';
import saga from 'redux/saga/surveySaga';
import classnames from 'classnames';

import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Alert
} from 'reactstrap';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';

import QuestionConfiguration from "components/QuestionConfiguration/QuestionConfiguration";
import RelationConfiguration from "components/RelationConfiguration/RelationConfiguration";

const StyledInput = styled.input`
  padding: 5px;
  width: 100%;
`;

export class SurveyEditPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    
    static isPrivate = true;

    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        editMode : true,
        activeTab: '1'
      };
    }

    componentDidMount() {
      this.state.editMode = this.props.match.params.action === "edit";
      this.props.setSelectedSurveyAction(this.props.match.params.id);
    }

    componentWillReceiveProps(props) {
      if (props.surveyStates.get('saveCompleted') || props.surveyStates.get('updateCompleted')) {
        this.locateInitiatorScreen();
      }
    }    

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }
  
    render() {
      if (!this.props.survey) {
        return null;
      }
      let {survey} = this.props;
      let surveyQuestions = survey.get('questions');
      let surveyName = survey.get('name');

      return (<Container>
          <Row>
            <Col xs="3">Anket Adı : </Col>
            <Col xs="9">
                <StyledInput type="text" placeholder="Anket adını giriniz" 
                    style={{width : "100%"}} 
                    value={surveyName} 
                    onChange={(event) => this.props.setSurveyNameAction(event.target.value) } />  
            </Col>
          </Row>
          <br />
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Soru/Cevap Ayarları
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Cevap/Aksiyon Ayarları
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              {this._renderSurveyItemListTab()}
            </TabPane>
            <TabPane tabId="2">
              {this._renderTriggerConfigurationTab()}
            </TabPane>
          </TabContent>
          <Row>
            <Col>
              <ListGroupItem style={{marginTop: '20px'}}>
                <Button disabled={surveyQuestions.size == 0} color="success" onClick={this._saveSurvey}>{this.state.editMode ? "Anketi Güncelle" : "Anketi Kaydet"}</Button>
              </ListGroupItem>
            </Col>
          </Row>
        </Container>)
    }

    _renderSurveyItemListTab() {
      let {survey} = this.props;
      let surveyQuestions = survey.get('questions');

      if (surveyQuestions.size == 0) {
        return this._renderEmptyItemList();
      }

      return (<div>
          <ListGroup>
            {this._renderSurveyItemList()}
            <ListGroupItem style={{marginTop: '20px'}}>
                <Button color="warning" onClick={() => this._onAddSurveyQuestionClicked()}>Soru Ekle</Button>
            </ListGroupItem>
          </ListGroup>
        </div>);
    }

    _renderEmptyItemList() {
      return (<ListGroupItem>
            <Container>
              <Alert color="warning">Anket oluşturmak için soru ekleyiniz</Alert>
              <hr />
              <Row><Col><Button color="warning" onClick={() => this._onAddSurveyQuestionClicked()}>Soru Ekle</Button></Col></Row>
            </Container>
          </ListGroupItem>);
    }

    _renderSurveyItemList() {
      let {survey} = this.props;
      let surveyQuestions = survey.get('questions');

      return surveyQuestions.map((item, index) => {
        return <ListGroupItem key={index} style={{marginBottom : '10px', backgroundColor : '#f5f5f5'}}>
                <QuestionConfiguration 
                    surveyItem={item} 
                    onQuestionChange={(newQuestion) => this.props.updateSurveyItemAction(index, newQuestion)}
                    onAddNewAnswerClicked={(surveyItem) => this.props.addNewAnswerAction(surveyItem)}
                    onDeleteAnswerClicked={(surveyItem, answer, index) => this.props.deleteAnswerAction(surveyItem, answer, index)}
                    onAnswerChange={(surveyItem, answer, index, value) => this.props.onAnswerChangeAction(surveyItem, answer, index, value)}
                    />
                </ListGroupItem>
      });
    }

    _renderTriggerConfigurationTab() {
      let {survey} = this.props;
      let surveyQuestions = survey.get('questions');
      let surveyRelations = survey.get('relations');

      return (<ListGroup>
                <ListGroupItem>
                  <RelationConfiguration 
                          surveyQuestions={surveyQuestions} 
                          surveyRelations={surveyRelations}
                          onNewRelationAdded={() => {
                            this.props.addNewSurveyRelationAction();
                          }}
                          onRelationUpdated={(newRelation, index) => {
                            this.props.updateRelationAction(newRelation, index);
                          }}
                          onBackClicked={() =>{ 
                            this.props.setSurveyActiveTabAction(1);
                          }} 
                          onSaveRelationClicked={(index) => {
                            this.props.saveRelationAction(index);
                          }}
                          onDeleteRelationClicked={(index) => {
                            this.props.deleteRelationAction(index);
                          }} />
                </ListGroupItem>
              </ListGroup>);
    }

    // TODO(tayfun) : move the state operations to redux in time...
    _onAddSurveyQuestionClicked() {
      this.props.addSurveyQuestionAction();
    }

    locateInitiatorScreen = () => {
      let {from} = this.props.match.params;
      if (from === "active") {
        this.props.doLocateSurveyListAction();
      } else if (from === "passive") {
        this.props.doLocatePassiveSurveyListAction();
      }
    }

    _saveSurvey = () => {
      let {action} = this.props.match.params;

      if (action === "edit") {
        this.props.updateSurveyAction();
      } else if(action === "copy") {
        // copy survey...
        this.props.saveSurveyAction();
      }
    }
  }

  export function mapDispatchToProps(dispatch) {
    return {
      updateSurveyItemAction : (index, newQuestion) => dispatch(updateSurveyItem(index, newQuestion)),
      setSurveyActiveTabAction : (tabIndex) => dispatch(setSurveyActiveTab(tabIndex)),
      setSurveyNameAction : (surveyName) => dispatch(setSurveyName(surveyName)),
      addSurveyQuestionAction : () => dispatch(addSurveyQuestion()),
      updateSurveyAction: () => dispatch(updateSurvey()),
      saveSurveyAction: () => dispatch(saveSurvey()),
      resetSurveyAction : () => dispatch(resetSurvey()),
      setSelectedSurveyAction : (surveyId) => dispatch(setSelectedSurvey(surveyId)),      
      // answer related actions
      addNewAnswerAction : (surveyItem) => dispatch(addNewAnswer(surveyItem)),
      deleteAnswerAction : (surveyItem, answer, index) => dispatch(deleteAnswer(surveyItem, answer, index)),
      onAnswerChangeAction : (surveyItem, answer, index, value) => dispatch(updateAnswer(surveyItem, answer, index, value)),
      // relation related actions
      addNewSurveyRelationAction : () => dispatch(addNewSurveyRelation()),
      updateRelationAction : (newRelation, index) => dispatch(updateRelation(newRelation, index)),
      saveRelationAction : (index) => dispatch(saveRelation(index)),
      deleteRelationAction : (index) => dispatch(deleteRelation(index)),
      //
      doLocateSurveyListAction : () => dispatch(push('/survey/active')),
      doLocatePassiveSurveyListAction : () => dispatch(push('/survey/passive'))
    };
}
  
const mapStateToProps = createStructuredSelector({
  survey : makeSelectSurvey(),
  surveyStates : makeSelectSurveyStates()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'survey', reducer });
const withSaga = injectSaga({ key: 'surveyCreate', saga });

export default withRouter(compose(
  withReducer,
  withSaga,
  withConnect,
)(SurveyEditPage));