import React from 'react';
import styled from 'styled-components';

import { RecommendedVideo } from '../../store/apiType';
// import components
import VideoBox from './VideoBox';
import Spinner from '../atoms/Spinner';

interface Props {
  videos?: RecommendedVideo[];
  loading: boolean
};

const Suggestions: React.SFC<Props> = props => {
  const {
    videos = [],
    loading
  } = props

  if (loading && videos.length < 1) {
    return <Spinner />
  }

  return (
    <Container>
      {videos.map((video, i) => {
        const {
          videoId,
          title,
          videoThumbnails,
          author,
          authorId,
          lengthSeconds,
          viewCountText,
        } = video;
        return (
          <VideoBox
            key={`${videoId}-${i}`}
            videoId={videoId}
            title={title}
            author={author}
            authorId={authorId}
            thumbnail={videoThumbnails[4].url}
            viewCount={viewCountText}
            length={lengthSeconds}
            index={i}
            onChannel={false}
            light
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

export default Suggestions;