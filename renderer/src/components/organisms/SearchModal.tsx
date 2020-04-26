import React from 'react';
import styled from 'styled-components';

import { useApp } from '../../store';
import { Channel, VideoDetails } from '../../store/modelApp';
// import components
import VideosDisplay from '../molecules/VideosDisplay';
import ChannelBar from '../molecules/ChannelBar';

interface Props {};

const SearchModal: React.SFC<Props> = props => {

  const videosToDisplay: VideoDetails[] = useApp(appState => appState.state.videosToDisplay);
  const channelInfos: Channel = useApp(appState => appState.state.channelInfos);

  return (
    <Container>
      <ChannelBar />
      <VideosDisplay
        videosSearch={videosToDisplay}
        videosChannel={channelInfos}
      />
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
`;

export default SearchModal;