import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { useApp, apiApp, apiThemes, ReducerEffect, StateRef } from '../../store';
import { Themes } from '../../store/modelThemes';
// import components
import Select from '../atoms/Select';
import InputTheme from './InputTheme';
import SmallTitle from '../atoms/SmallTitle';
import ButtonIcon from '../atoms/ButtonIcon';
import ButtonText from '../atoms/ButtonText';

interface Props {};

const ThemesManager: React.SFC<Props> = props => {

  function onHandleSelectTheme(id: string): void {
    setSelectedTheme(id);
  }

  function switchEdit(): void {
    setEdit(edit => !edit);
  }

  function handleDeleteTheme(): void {
    setDisplayModalAlert({
      title: t('molecules.ThemesManager.modal.title'),
      text: t('molecules.ThemesManager.modal.text'),
      yes: t('molecules.ThemesManager.modal.yes'),
      no: t('molecules.ThemesManager.modal.no'),
      actionYes: () => {
        deleteTheme(selectedTheme);
        setIsDeleteThemeDisplayed(false);
        setDisplayModalAlert({});
      },
      actionNo: () => {
        setIsDeleteThemeDisplayed(false);
        setDisplayModalAlert({});
      }
    });
    setIsDeleteThemeDisplayed(true);
  }

  const { t } = useTranslation();

  const themesRef: StateRef<Themes> = useRef(apiThemes.getState().state.themes);

  const deleteTheme: ReducerEffect = apiThemes.getState().effects.deleteTheme;
  const selectedTheme: string = useApp(appState => appState.state.selectedTheme);
  const setSelectedTheme: ReducerEffect = apiApp.getState().reducers.setSelectedTheme;
  const setIsDeleteThemeDisplayed: ReducerEffect = apiApp.getState().reducers.setIsDeleteThemeDisplayed;
  const setDisplayModalAlert: ReducerEffect = apiApp.getState().reducers.setDisplayModalAlert;

  useEffect(() => {

    function updateOptions(themes) {
      const opt = Object.keys(themes).reduce((acc, e) => {
        const { id, name } = themes[e];
        acc[id] = name;
        return acc;
      }, {});
      setOptions(opt);
      setEdit(false);
    }

    const unsubThemes = apiThemes.subscribe(
      (themes: Themes) => {
        updateOptions(themes);
        themesRef.current = themes;
      },
      themesState => themesState.state.themes
    );

    updateOptions(themesRef.current);

    return () => {
      unsubThemes();
    }

  }, []);

  const [ edit, setEdit ] = useState<boolean>(false);
  const [ options, setOptions ] = useState<any>({});

  return (
    <Container>
      {
        !edit ? 
          <Select
            options={options}
            defaultValue={selectedTheme}
            onHandleChange={onHandleSelectTheme}
          />
        :
          <InputTheme />
      }
      <WrapperButton edit={edit}>
        <ButtonIcon
          icon={'add'}
          handleClick={switchEdit}
          widthIcon={35}
          heightIcon={35}
          width={35}
          height={40}
        />
      </WrapperButton>
      {selectedTheme !== "0" && (
        <ButtonText
          onHandleClick={handleDeleteTheme}
          height={20}
        >
          {t('molecules.ThemesManager.delete')}
        </ButtonText>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 350px;
  padding: 5px;
  margin: 0 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const WrapperButton = styled.div<{edit: boolean}>`
  transform: ${({edit}) => edit ? 'rotate(-45deg)': 'rotate(0)' };
  transition: all .2s ease-out;
`;

export default ThemesManager;

