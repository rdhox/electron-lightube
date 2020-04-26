import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { useThemes, ReducerEffect } from '../../store';
// import components
import Input from '../atoms/Input';
import ButtonIcon from '../atoms/ButtonIcon';

interface Props {};

const InputTheme: React.SFC<Props> = props => {

  function onClick(): void {
    if(newTheme !== '')
      addTheme(newTheme);
  }

  const [ newTheme, setNewTheme ] = useState<string>('');

  const { t } = useTranslation();
  const addTheme: ReducerEffect = useThemes(appThemes => appThemes.effects.addTheme);

  return (
    <Container>
      <Input 
        value={newTheme}
        onHandleChange={setNewTheme}
        placeholder={t('molecules.ThemesManager.placeholder')}
        length='165px'
        fontSize={18}
        height={28}
      />
      <ButtonIcon 
        round
        handleClick={onClick}
        icon="tick"
        widthIcon={35}
        heightIcon={35}
        width={35}
        height={35}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 200px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default InputTheme;