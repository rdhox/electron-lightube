import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.png';

import { apiApp, ReducerEffect, StateRef } from '../../store';
// import components
import InputSearch from '../molecules/InputSearch';
import ButtonIcon from '../atoms/ButtonIcon';
import ThemesManager from '../molecules/ThemesManager';
import ListChannels from '../molecules/ListChannels';


export interface Props {}
 
const Header: React.SFC <Props> = () => {

  function handleSeeLateModal():void {
    setIsWatchLaterModalDisplayed(!isSeeLaterModalDisplayedRef.current);
  }
  
  function clickSettings() {
    setIsSettingsModalDisplayed(!isSettingsModalDisplayedRef.current);
  }

  function goHome() {
    history.push('/')
  }

  const history = useHistory();

  const setIsSettingsModalDisplayed: ReducerEffect = apiApp.getState().reducers.setIsSettingsModalDisplayed;
  const setIsWatchLaterModalDisplayed: ReducerEffect = apiApp.getState().reducers.setIsWatchLaterModalDisplayed;
  const isSettingsModalDisplayedRef: StateRef<boolean> = useRef(apiApp.getState().state.isSettingsModalDisplayed);
  const isSeeLaterModalDisplayedRef: StateRef<boolean> = useRef(apiApp.getState().state.isWatchLaterModalDisplayed);

  useEffect(() => {
    const unsubSettingsTrigger =  apiApp.subscribe(
      (isSettingsModalDisplayed: boolean) => isSettingsModalDisplayedRef.current = isSettingsModalDisplayed,
      appState => appState.state.isSettingsModalDisplayed
    );
    const unsubSeeLater = apiApp.subscribe(
      (isWatchLaterModalDisplayed: boolean) => isSeeLaterModalDisplayedRef.current = isWatchLaterModalDisplayed,
      appState => appState.state.isWatchLaterModalDisplayed
    );
    return () => {
      unsubSettingsTrigger();
      unsubSeeLater();
    }
  }, []);

  return (
    <Container>
      <Row align="space-between" >
        <Row align="flex-start">
          <Logo src={logoImg} onClick={goHome} />
          <ButtonIcon
            icon="gear"
            handleClick={clickSettings}
            backgroundColor="transparent"
            width={50}
            height={50}
            widthIcon={40}
            heightIcon={40}
          />
          <ButtonIcon
            round
            icon="time"
            handleClick={handleSeeLateModal}
            backgroundColor="transparent"
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
  height: 60px;
  margin:  0 15px 0 10px;
  cursor: pointer;
`

 
export default Header;