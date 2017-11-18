/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router'
import Route from "./AuthRoute";

import HomePage from 'containers/HomePage/Loadable';
import SurveyMainPage from 'containers/Survey/MainPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/Auth/LoginPage/Loadable';
import LogoutPage from 'containers/Auth/LogoutPage/Loadable';
import ReportPage from "containers/ReportPage/Loadable";
import UserMainPage from "containers/User/MainPage/Loadable";


import Header from 'components/Header';
import Aside from 'components/Aside';

import { Container, Row, Col } from 'reactstrap';

import { makeSelectLoginUser } from "redux/selectors/global";

export default function App(store) {
  let isLoggedIn = store.store.getState().getIn(['login', 'user', 'id']) > 0;

  return (
    <Container>
      <Header />
      <Row style={{paddingTop: '30px'}}>
        {isLoggedIn ? <Col xs="3"><Aside /></Col> : <Col xs="2"></Col>}
        <Col xs={isLoggedIn ? "9" : "8"}>
            <Switch>
                <Route exact path="/" component={HomePage} store={store} />
                <Route exact path="/home" component={HomePage} store={store} />
                <Route exact path="/survey/*" component={SurveyMainPage} store={store} />
                <Route exact path="/login" component={ LoginPage } store={store} />
                <Route exact path="/reports" component={ReportPage} store={store} />
                <Route exact path="/user/*" component={UserMainPage} store={store} />
                <Route exact path="/logout" component={LogoutPage} store={store} />
            </Switch>
        </Col>
      </Row>      
    </Container>
  )
}
