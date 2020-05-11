import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from "react-router-dom";
// import components
import VideoPage from './VideoPage';
import HomePage from './HomePage';

interface Props {};

const Main: React.SFC = props => {

  return (
    <Container>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/video/:idVideo" component={VideoPage} />
      </Switch>
    </Container>
  );
}

const Container = styled.main`
  min-height:400px;
  padding: 8px 0px;
  overflow-x: hidden;
`;

export default Main;