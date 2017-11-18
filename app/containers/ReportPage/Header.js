import React, { Children } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

const Container = styled.div`
  border-bottom : 1px solid #f0f0f0;
`;

const Wrapper = styled.div`
  padding: 10px;
  font-size: 32px;
  width: 80%;
  display: inline-block;
`;

function Header(props) {

    return (
      <Container>
        <Wrapper>
          Anket Raporları
        </Wrapper>
      </Container>
    );
}
  
export default Header;