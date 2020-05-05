import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { apiApp, useApp, ReducerEffect } from '../../store';
import { Channel } from '../../store/apiType';
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
      if (selectedChannel !== '' && channelInfos.author !== '') {
        launchSearchOnChannel(searchValue);
      } else {
        setIsSearchModalDisplayed(true);
        launchSearch(searchValue);
      }
    }
  }

  const selectedChannel: string = useApp(appState => appState.state.selectedChannel);
  const channelInfos: Channel = useApp(appState => appState.state.channelInfos);
  const launchSearch: ReducerEffect = apiApp.getState().effects.launchSearch;
  const launchSearchOnChannel: ReducerEffect = apiApp.getState().effects.launchSearchOnChannel;
  const setIsSearchModalDisplayed: ReducerEffect = apiApp.getState().reducers.setIsSearchModalDisplayed;
  const [searchValue, setSearchValue] = useState<string>("");
  const { t } = useTranslation();

  return (
    <Container
      onKeyDown={handleKeyEnter}
      channel={selectedChannel !== '' && channelInfos.author && true || false }
    >
      {/* {selectedChannel !== '' && channelInfos.author && <WrapperChannel>{`${channelInfos.author}: `}</WrapperChannel>} */}
      <WrapperChannel
        display={selectedChannel !== '' && channelInfos.author && true || false}
      >
        {`${channelInfos?.author || ''}`}
      </WrapperChannel>
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
        height={50}
        backgroundColor="#FAFAFA"
      />
    </Container>
  );
}

const Container = styled.div<{channel?: boolean}>`
  height: 50px;
  border: solid 1px #9E9E9E;
  border-radius: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({channel}) => channel ? '0' : '0 0 0 20px'};
  margin-right: 15px;
`;

const WrapperChannel = styled.span<{display: boolean}>`
  color: ${({display}) => display ? 'black' :  '#FAFAFA'};
  font-size: 15px;
  display: flex;
  align-items: center;
  height: ${({display}) => display ? '50px' :  '0'};
  width: ${({display}) => display ? '150px' :  '0'};
  padding-left: ${({display}) => display ? '20px' :  '0'};
  background-color: ${({display}) => display ? '#FAFAFA' :  'transparent'};
  border-right: ${({display}) => display ? 'solid 1px lightgray' :  'none'};
  border-top-left-radius: ${({display}) => display ? '25px' :  '0'};
  border-bottom-left-radius: ${({display}) => display ? '25px' :  '0'};
  margin-right: ${({display}) => display ? '10px' :  '0'};
  transition: all 0.2s ease-in;
  transition-property: width, color;
`;

export default InputSearch;