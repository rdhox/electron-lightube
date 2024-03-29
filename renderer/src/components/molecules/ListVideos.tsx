import React from 'react';
import styled from 'styled-components';

import { VideoPlaylist, RecommendedVideo } from '../../store/apiType';
import { useApp } from '../../store';
import { SeeLaterVideo } from '../../store/modelThemes';
//import components
import VideoBox from './VideoBox';
import Spinner from '../atoms/Spinner';

interface Props {
  videos:  Array<RecommendedVideo | VideoPlaylist | SeeLaterVideo>;
  loading?: boolean
};

const ListVideos: React.SFC<Props> = props => {

  const {
    videos = [],
    loading = false
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
        viewCountText
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
            viewCount={viewCountText}
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

export default ListVideos;