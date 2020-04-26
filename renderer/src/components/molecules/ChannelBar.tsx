import React from 'react';
import styled from 'styled-components';

import { useApp, ReducerEffect } from '../../store';
// import components
import ButtonIcon from '../atoms/ButtonIcon';
import ChannelBox from './ChannelBox';

interface Props {};

const ChannelBar: React.SFC<Props> = props => {

  function back() {
    setShowChannel(false);
  }

  const showChannel: boolean = useApp(appState => appState.state.showChannel);
  const setShowChannel: ReducerEffect = useApp(appState => appState.reducers.setShowChannel);

  if(showChannel) {

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

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 3px 20px;
  width: 100%;
  height: 75px;
`;



export default ChannelBar;