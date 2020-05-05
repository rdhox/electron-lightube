import React from 'react';
import styled from 'styled-components';

import { apiApp, ReducerEffect } from '../../store';
// import components
import VideosDisplay from '../molecules/VideosDisplay';
import ChannelBar from '../molecules/ChannelBar';
import ButtonIcon from '../atoms/ButtonIcon';

interface Props {};

const SearchModal: React.SFC<Props> = props => {

  function closeModal():void {
    resetSearch();
  }
  const resetSearch: ReducerEffect = apiApp.getState().reducers.resetSearch;

  return (
    <Container>
      <Row>
        <ButtonRotate>
          <ButtonIcon
            icon="add"
            handleClick={closeModal}
            widthIcon={35}
            heightIcon={35}
            width={35}
            height={40}
          />
        </ButtonRotate>
      </Row>
      <ChannelBar />
      <VideosDisplay />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  margin-top: 0px;
  width: 720px;
  min-height: 100px;
  background-color: white;
  border-bottom-left-radius: 10px;
  overflow: hidden;
`;

const Row = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
`;

const ButtonRotate = styled.div`
  transform: rotate(45deg);
`;

export default SearchModal;