import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { useThemes } from '../../store';
import { useApp } from '../../store';
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
  const themes = useThemes(themesState => themesState.state.themes);
  const deleteTheme = useThemes(themesState => themesState.effects.deleteTheme);
  const selectedTheme = useApp(appState => appState.state.selectedTheme);
  const setSelectedTheme = useApp(appState => appState.reducers.setSelectedTheme);
  const setIsDeleteThemeDisplayed = useApp(appState => appState.reducers.setIsDeleteThemeDisplayed);
  const setDisplayModalAlert = useApp(appState => appState.reducers.setDisplayModalAlert);

  useEffect(() => {
    const opt = Object.keys(themes).reduce((acc, e) => {
      const { id, name } = themes[e];
      acc[id] = name;
      return acc;
    }, {});
    setOptions(opt);
    setEdit(false);
  }, [themes]);

  const [ edit, setEdit ] = useState<boolean>(false);
  const [ options, setOptions ] = useState<any>({});

  return (
    <Container>
      <Row>
        <SmallTitle>{t('molecules.ThemesManager.title')}</SmallTitle>
        {selectedTheme !== "0" && (
          <ButtonText
            onHandleClick={handleDeleteTheme}
            height={20}
          >
            {t('molecules.ThemesManager.delete')}
          </ButtonText>
        )}
      </Row>
      <Row>
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
      </Row>
    </Container>
  );
}

const Container = styled.div`
  width: 240px;
  height: 60px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #F5F5F5;
  border-right: solid 1px lightgrey;
  border-bottom: solid 1px lightgrey;
  border-radius: 0 10px 10px 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WrapperButton = styled.div<{edit: boolean}>`
  transform: ${({edit}) => edit ? 'rotate(-45deg)': 'rotate(0)' };
  transition: all .2s ease-out;
`;

export default ThemesManager;

