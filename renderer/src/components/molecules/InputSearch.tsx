import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { apiApp, ReducerEffect } from '../../store';
// import components
import Input from '../atoms/Input';
import ButtonIcon from '../atoms/ButtonIcon';

interface Props {}

const InputSearch: React.SFC<Props> = props => {

  function handleKeyEnter(e){
    if(e.key === 'Enter'){
      startSearch();
    }
  }

  function startSearch() {
    if(searchValue !== '') {
      setIsSearchModalDisplayed(true);
      launchSearch(searchValue);
    }
  }

  const launchSearch: ReducerEffect = apiApp.getState().effects.launchSearch;
  const setIsSearchModalDisplayed: ReducerEffect = apiApp.getState().reducers.setIsSearchModalDisplayed;
  const [searchValue, setSearchValue] = useState<string>("");
  const { t } = useTranslation();

  return (
    <Container
      onKeyDown={handleKeyEnter}
    >
      <Input
        value={searchValue}
        onHandleChange={setSearchValue}
        placeholder={t('molecules.InputSearch.search')}
        length='400px'
      />
      <ButtonIcon
        halfround
        handleClick={startSearch}
        icon="search"
        widthIcon={35}
        heightIcon={35}
        width={70}
        height={52}
        backgroundColor="lightgrey"
      />
    </Container>
  );
}

const Container = styled.div`
  width: 500px;
  height: 50px;
  border: solid 1px lightgray;
  border-radius: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 20px;
`;

export default InputSearch;