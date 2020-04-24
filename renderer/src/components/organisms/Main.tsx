import React from 'react';
import styled from 'styled-components';
import { Route, Switch, useLocation } from "react-router-dom";
// import components
import VideosDisplay from './VideosDisplay';
import VideoPage from './VideoPage';

interface Props {};

const Main: React.SFC = props => {
  let location = useLocation();
  console.log(location);
  return (
    <Container>
      <Switch>
        <Route exact patch="/">
          <VideosDisplay />
        </Route>
        <Route patch="video/:idVideo">
          <VideoPage />
        </Route>
      </Switch>
    </Container>
  );
}

const Container = styled.main`
  min-height:400px;
  border: solid 1px red;
  padding: 10px;
`;

export default Main;