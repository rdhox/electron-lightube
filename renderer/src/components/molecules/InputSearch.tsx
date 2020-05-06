import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { apiApp, useApp, ReducerEffect } from '../../store';
import { Channel } from '../../store/apiType';
// import components
import Input from '../atoms/Input';
import ButtonIcon from '../atoms/ButtonIcon';
import FiltersMenu from './FiltersMenu';

interface Props {}

const InputSearch: React.SFC<Props> = props => {

  function handleDisplayFilters(): void {
    setIsFiltersOn(!isFiltersOn);
  }

  function handleKeyEnter(e: React.KeyboardEvent){
    if(e.key === 'Enter'){
      startSearch();
    }
  }

  function startSearch(): void {
    if(searchValue !== '') {
      if (selectedChannel !== '' && channelInfos.author !== '') {
        launchSearchOnChannel(searchValue);
      } else {
        setIsSearchModalDisplayed(true);
        setIsFiltersOn(false);
        launchSearch(searchValue);
      }
    }
  }

  const selectedChannel: string = useApp(appState => appState.state.selectedChannel);
  const channelInfos: Channel = useApp(appState => appState.state.channelInfos);
  const isFiltersOn: boolean = useApp(appState => appState.state.isFiltersOn);

  const launchSearch: ReducerEffect = apiApp.getState().effects.launchSearch;
  const launchSearchOnChannel: ReducerEffect = apiApp.getState().effects.launchSearchOnChannel;
  const setIsSearchModalDisplayed: ReducerEffect = apiApp.getState().reducers.setIsSearchModalDisplayed;
  const setIsFiltersOn: ReducerEffect = apiApp.getState().reducers.setIsFiltersOn;

  const [searchValue, setSearchValue] = useState<string>("");

  const { t } = useTranslation();

  let channelOn = false;
  if(selectedChannel !== '' && typeof channelInfos?.author !== 'undefined')
    channelOn = true;

  return (
    <Container>
      <Row
        onKeyDown={handleKeyEnter}
        channel={channelOn}
      >
        <WrapperChannel
          channel={channelOn}
        >
          {channelInfos?.author || ''}
        </WrapperChannel>
        <Input
          value={searchValue}
          onHandleChange={setSearchValue}
          placeholder={t('molecules.InputSearch.search')}
          length='400px'
        />
        {!channelOn && (
          <>
            <Separator />
            <ButtonIcon
              handleClick={handleDisplayFilters}
              icon="filter"
              widthIcon={35}
              heightIcon={35}
              width={70}
              height={50}
              backgroundColor={isFiltersOn ? "#BBDEFB" : "#FAFAFA"}
            />
            <Separator />
          </>
        )}
        <ButtonIcon
          halfround
          handleClick={startSearch}
          icon="search"
          widthIcon={35}
          heightIcon={35}
          width={70}
          height={50}
          backgroundColor="#FAFAFA"
        />
       </Row>
       {isFiltersOn && <FiltersMenu />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div<{channel?: boolean}>`
  height: 50px;
  border: solid 1px #9E9E9E;
  border-radius: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({channel}) => channel ? '0' : '0 0 0 20px'};
  margin-right: 15px;
`;

const Separator = styled.div`
  width: 1px;
  height: 50px;
  background-color: lightgray;
`;

const WrapperChannel = styled.span<{channel: boolean}>`
  color: ${({channel}) => channel ? 'black' :  '#FAFAFA'};
  font-size: 15px;
  display: flex;
  align-items: center;
  height: ${({channel}) => channel ? '50px' :  '0'};
  width: ${({channel}) => channel ? '150px' :  '0'};
  padding-left: ${({channel}) => channel ? '20px' :  '0'};
  background-color: ${({channel}) => channel ? '#FAFAFA' :  'transparent'};
  border-right: ${({channel}) => channel ? 'solid 1px lightgray' :  'none'};
  border-top-left-radius: ${({channel}) => channel ? '25px' :  '0'};
  border-bottom-left-radius: ${({channel}) => channel ? '25px' :  '0'};
  margin-right: ${({channel}) => channel ? '10px' :  '0'};
  transition: all 0.2s ease-in;
  transition-property: width, color;
`;

export default InputSearch;