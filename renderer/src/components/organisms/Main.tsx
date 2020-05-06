import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Route, Switch } from "react-router-dom";

import { apiApp, ReducerEffect, StateRef } from '../../store';
// import components
import VideoPage from './VideoPage';
import ButtonIcon from '../atoms/ButtonIcon';

interface Props {};

const Main: React.SFC = props => {

  function handleSeeLateModal():void {
    setIsWatchLaterModalDisplayed(!isSeeLaterModalDisplayedRef.current);
  }

  const isSeeLaterModalDisplayedRef: StateRef<boolean> = useRef(apiApp.getState().state.isWatchLaterModalDisplayed);
  const setIsWatchLaterModalDisplayed: ReducerEffect = apiApp.getState().reducers.setIsWatchLaterModalDisplayed;

  useEffect(() => {
    const unsubSeeLater = apiApp.subscribe(
      (isWatchLaterModalDisplayed: boolean) => isSeeLaterModalDisplayedRef.current = isWatchLaterModalDisplayed,
      appState => appState.state.isWatchLaterModalDisplayed
    );
    return () => {
      unsubSeeLater();
    }
  }, []);

  return (
    <Container>
      <Switch>
        <Route exact path="/" render={() => <div>Hello</div>} />
        <Route path="/video/:idVideo" component={VideoPage} />
      </Switch>
      <SeeLaterButton>
        <ButtonIcon
          round
          icon="time"
          handleClick={handleSeeLateModal}
          backgroundColor="transparent"
          width={70}
          height={70}
          widthIcon={60}
          heightIcon={60}
        />
      </SeeLaterButton>
    </Container>
  );
}

const Container = styled.main`
  min-height:400px;
  padding: 8px 0px;
  overflow-x: hidden;
`;
 
const SeeLaterButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  box-shadow: 0px 2px 2px 0px rgba(100,100,100,1);
  background-color: white;
  z-index: 999;
`;

export default Main;