import React from 'react';
import styled from 'styled-components';

import { useThemes, useApp, apiApp, ReducerEffect } from '../../store';
import { ChannelsInThemes, ChannelSaved } from '../../store/modelThemes';
// import components
import ChannelBox from './ChannelBox';

interface Props {};

const ListChannels: React.SFC<Props> = props => {

  function showChannel(
    image: string,
    author: string,
    subCount: number,
    description: string,
    authorId: string
    ): void {
    setIsSearchModalDisplayed(true);
    setShowChannel(true);
    setSelectedChannel(authorId);
    fetchChannelVideo(
      authorId,
      1,
      image,
      author,
      subCount,
      description
    );
  }

  const setIsSearchModalDisplayed: ReducerEffect = apiApp.getState().reducers.setIsSearchModalDisplayed;
  const fetchChannelVideo: ReducerEffect = apiApp.getState().effects.fetchChannelVideo;
  const setShowChannel: ReducerEffect = apiApp.getState().reducers.setShowChannel;
  const setSelectedChannel: ReducerEffect = apiApp.getState().reducers.setSelectedChannel;

  const channels: ChannelsInThemes = useThemes(themesState => themesState.state.channels);
  const selectedTheme: string = useApp(appState => appState.state.selectedTheme);

  return (
    <Container>
      {channels[selectedTheme].map((channel: ChannelSaved) => {
        const {
          image,
          author,
          subCount,
          description,
          authorId
        } = channel;

      return (
        <WrapperChannel
          key={authorId}
          onClick={() => showChannel(image, author, subCount, description, authorId)}
        >
          <ChannelBox
            image={image}
            author={author}
            subCount={subCount}
            description={description}
          />
        </WrapperChannel>
      );
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 90px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const WrapperChannel = styled.div`
  margin: 0 20px;
  cursor: pointer;
`;

export default ListChannels;