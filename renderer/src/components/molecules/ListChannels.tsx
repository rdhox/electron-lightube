import React from 'react';
import styled from 'styled-components';

import { useThemes, useApp } from '../../store';
import { ChannelsInThemes, ChannelSaved } from '../../store/modelThemes';
// import components
import ChannelBox from './ChannelBox';

interface Props {};

const ListChannels: React.SFC<Props> = props => {

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
        <WrapperChannel key={authorId}>
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
`;

export default ListChannels;