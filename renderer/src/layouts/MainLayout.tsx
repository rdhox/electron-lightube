import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { apiSettings, apiThemes, ReducerEffect } from '../store';
import { SettingsState } from '../store/modelSettings'
import { ThemesState } from '../store/modelThemes';
// import components
import Header from '../components/organisms/Header';
import ModalLayout from './ModalLayout';
import Main from '../components/organisms/Main';

const { myIpcRenderer } = window;
 
const MainLayout : React.SFC = () => {

  const [ initialized, setInitialized ] = useState<boolean>(false);

  useEffect(() => {

    const initializedSettings: ReducerEffect = apiSettings.getState().reducers.initialize;
    const initializedThemes: ReducerEffect = apiThemes.getState().reducers.initialize;

    const unsubInitialData = myIpcRenderer.on('APP_INITIAL_STATE', data => {
      initializedSettings(data.initialSettings);
      initializedThemes(data.initialThemes);
      setInitialized(true);
    });

    const unsubSaveSettings = apiSettings.subscribe(
      (state: SettingsState) => {
        if (initialized)
          myIpcRenderer.send('APP_SAVE_SETTINGS', state);
      },
      settingsState => settingsState.state
    );
    const unsubSaveThemes = apiThemes.subscribe(
      (state: ThemesState) => {
        if (initialized)
          myIpcRenderer.send('APP_SAVE_THEMES', state);
      },
      themesState => themesState.state
    );

    return () => {
      unsubInitialData();
      unsubSaveSettings();
      unsubSaveThemes();
    }
  }, [initialized]);

  return (
    <Container>
      <Header />
      <Main />
      <ModalLayout />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;
 
export default MainLayout;