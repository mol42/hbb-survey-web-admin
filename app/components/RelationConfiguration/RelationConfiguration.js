import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import Select from "react-select";
// imported components

import RelationEntry from "./RelationEntry";

class RelationConfiguration extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
    render() {
        let {surveyRelations} = this.props;

        if (surveyRelations.size == 0) {
            return this._renderEmptyList();
        } else {
            return this._renderRelations();
        }
    }

    _renderEmptyList() {
        return (<Container>
            <Alert color="warning">Cevap/Aksiyon ekleyiniz.</Alert>
            <hr />
            <Row>
                <Col>
                    <Button color="warning" onClick={() => this.props.onNewRelationAdded()}>Cevap/Aksiyon Ekle</Button>
                </Col>
            </Row>
        </Container>)
    }

    _renderRelations() {
        return (<Container>
            <ListGroup>
                {this._renderRelationList()}
            </ListGroup>
            <hr />
            <Row>
                <Col>
                    <Button color="warning" onClick={() => this.props.onNewRelationAdded()}>Cevap/Aksiyonu Ekle</Button>
                </Col>
            </Row>
        </Container>)
    }

    _renderRelationList() {
        return this.props.surveyRelations.map((relation, index) => {
            return (<ListGroupItem key={index}>
                        <RelationEntry 
                            relation={relation} 
                            index={index} 
                            surveyQuestions={this.props.surveyQuestions} 
                            onSaveRelationClicked={(index) => {
                                this.props.onSaveRelationClicked(index);
                            }}
                            onDeleteRelationClicked={(index) => {
                                this.props.onDeleteRelationClicked(index);
                            }}
                            onRelationUpdated={(newRelation, index) => {
                                this.props.onRelationUpdated(newRelation, index);
                            }} />
                    </ListGroupItem>)
        });
    }
}

export default RelationConfiguration;
