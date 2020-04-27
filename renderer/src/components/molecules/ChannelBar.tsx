import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { apiApp, ReducerEffect } from '../../store';
// import components
import ButtonIcon from '../atoms/ButtonIcon';
import ChannelBox from './ChannelBox';

interface Props {};

const ChannelBar: React.SFC<Props> = props => {

  function back() {
    setShowChannel(false);
    setChannelInfos({});
  }

  const [ display, setDisplay ] = useState<boolean>(false);

  const setShowChannel: ReducerEffect = apiApp.getState().reducers.setShowChannel;
  const setChannelInfos: ReducerEffect = apiApp.getState().reducers.setChannelInfos;

  useEffect(() => {
    const unsubShowChannel = apiApp.subscribe(
      (showChannel: boolean) => setDisplay(showChannel),
      appState => appState.state.showChannel
    );

    return () => {
      unsubShowChannel();
    }
  }, []);

  if(display) {

    return (
      <Container>
        <ButtonIcon
          icon="arrowBack"
          widthIcon={20}
          heightIcon={20}
          width={30}
          height={30}
          handleClick={back}
        />
        <ChannelBox />
        <div style={{ marginLeft: "auto"}}>
          <ButtonIcon
            icon="subscribe"
            widthIcon={30}
            heightIcon={30}
            width={40}
            height={40}
            handleClick={() => {}}
          />
        </div>
      </Container>
    );
  }

  return null;
}

const apparition = keyframes`
  0% {
    left: -700px;
  }
  100% {
    left: 0px;
  }
`;

const Container = styled.div`
  position: relative;
  left: -700px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 3px 20px;
  width: 100%;
  height: 75px;
  animation-name: ${apparition};
  animation-timing-function: ease-out;
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-fill-mode: forwards;
`;



export default ChannelBar;