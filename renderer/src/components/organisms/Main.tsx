import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from "react-router-dom";
// import components
import VideoPage from './VideoPage';

interface Props {};

const Main: React.SFC = props => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" render={() => <div>Hello</div>} />
        <Route path="/video/:idVideo" component={VideoPage} />
      </Switch>
    </Container>
  );
}

const Container = styled.main`
  min-height:400px;
  border: solid 1px red;
  padding: 10px;
  overflow-x: hidden;
`;

export default Main;