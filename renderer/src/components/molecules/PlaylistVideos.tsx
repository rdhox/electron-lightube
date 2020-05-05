import React from 'react';
import styled from 'styled-components';

import { VideoPlaylist } from '../../store/apiType';
import { useApp } from '../../store';
//import components
import VideoBox from './VideoBox';
import Spinner from '../atoms/Spinner';

interface Props {
  videos?: VideoPlaylist[];
  loading: boolean
};

const PlaylistVideos: React.SFC<Props> = props => {

  const {
    videos = [],
    loading
  } = props

  const selectedVideo = useApp(appState => appState.state.selectedVideo);

  if (loading && videos.length < 1) {
    return <Spinner />
  }

  return (
    <Container>
    {videos.map((video, i) => {
      const {
        title,
        videoId,
        author,
        authorId,
        videoThumbnails,
        lengthSeconds,
      } = video;

      return (
          <VideoBox
            key={`${videoId}-${i}`}
            videoId={videoId}
            title={title}
            author={author}
            authorId={authorId}
            thumbnail={videoThumbnails[4].url}
            length={lengthSeconds}
            index={i}
            onChannel={false}
            light
            selected={selectedVideo.videoId === videoId}
          />
      );
    })}
  </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export default PlaylistVideos;