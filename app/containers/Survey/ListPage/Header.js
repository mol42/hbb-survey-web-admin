import React, { Children } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

import ActionButtons from "./ActionButtons";

const Container = styled.div`
  border-bottom : 1px solid #f0f0f0;
`;

const Wrapper = styled.div`
  padding: 10px;
  font-size: 32px;
  width: 80%;
  display: inline-block;
`;

const ActionButtonsContainer = styled.div`
  float: right;
  position : relative;
  top : 10px;
`;

function Header(props) {

    return (
      <Container>
        <Wrapper>
          Anket Listesi
        </Wrapper>
        <ActionButtonsContainer>
          <ActionButtons />
        </ActionButtonsContainer>
      </Container>
    );
}
  
export default Header;