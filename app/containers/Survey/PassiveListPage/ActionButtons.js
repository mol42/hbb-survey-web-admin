import React, { Children } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const AddButtonWrapper = styled.div`
  padding : 5px 10px 5px 10px;
  border: 1px solid #f5f5f5;
  background-color: white;
  border-radius : 5px;
  width: 140px;
  cursor: pointer;
`;

const AddButton = styled.div`
  color : green;
  justify-content : center;
  align-items : center;
`;

const AddButtonText = styled.span`
  display: inline-block; 
  position: relative;
  top: -5px;
  left: 10px;
`;

function ActionButtons(props) {

    return (
        <AddButtonWrapper>
            <AddButton>
                <FontAwesome name='plus-circle' size='2x'/>
                <AddButtonText><Link to="/survey/create">Anket Ekle</Link></AddButtonText>
            </AddButton>
        </AddButtonWrapper>
    );
}
  
export default ActionButtons;