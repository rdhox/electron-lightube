import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.png';

import { apiApp, ReducerEffect, useApp } from '../../store';
// import components
import InputSearch from '../molecules/InputSearch';
import ButtonIcon from '../atoms/ButtonIcon';
import ThemesManager from '../molecules/ThemesManager';
import ListChannels from '../molecules/ListChannels';


export interface Props {}
 
const Header: React.SFC <Props> = () => {

  function handleSeeLaterModal():void {
    setIsWatchLaterModalDisplayed(!isWatchLaterModalDisplayed);
  }
  
  function clickSettings() {
    setIsSettingsModalDisplayed(!isSettingsModalDisplayed);
  }

  function goHome() {
    history.push('/')
  }

  const history = useHistory();

  const setIsSettingsModalDisplayed: ReducerEffect<[boolean]> = apiApp.getState().reducers.setIsSettingsModalDisplayed;
  const setIsWatchLaterModalDisplayed: ReducerEffect<[boolean]> = apiApp.getState().reducers.setIsWatchLaterModalDisplayed;
  const isSettingsModalDisplayed: boolean = useApp(appState => appState.state.isSettingsModalDisplayed);
  const isWatchLaterModalDisplayed: boolean = useApp(appState => appState.state.isWatchLaterModalDisplayed);

  return (
    <Container>
      <Row align="space-between" >
        <Row align="flex-start">
          <Logo src={logoImg} onClick={goHome} />
          <ButtonIcon
            round
            icon="gear"
            handleClick={clickSettings}
            backgroundColor={ isSettingsModalDisplayed ? "#BBDEFB" : "transparent"}
            width={50}
            height={50}
            widthIcon={40}
            heightIcon={40}
          />
          <ButtonIcon
            round
            icon="time"
            handleClick={handleSeeLaterModal}
            backgroundColor={ isWatchLaterModalDisplayed ? "#BBDEFB" : "transparent"}
            width={50}
            height={50}
            widthIcon={40}
            heightIcon={40}
          />
          <ThemesManager />
        </Row>
        <InputSearch />
      </Row>
      <Row align="space-between" style={{ paddingTop: "10px" }}>
        <ListChannels />
      </Row>
    </Container>
  );
}

const Container = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 2px 0px rgba(240,240,240,1);
  padding-top: 10px;
`;
const Row = styled.div<{align: string}>`
  width: 100%;
  display: flex;
  justify-content: ${({align}) => align};
  align-items: center;
`;

const Logo = styled.img`
  width: auto;
  height: 50px;
  margin:  0 15px 0 10px;
  cursor: pointer;
`

 
export default Header;