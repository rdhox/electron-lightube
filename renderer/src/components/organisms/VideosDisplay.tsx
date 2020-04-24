import React, {useEffect} from 'react';
import styled from 'styled-components';

import { useApp } from '../../store';
// import components
import VideoBox from '../molecules/VideoBox';

interface Props {};

const VideosDisplay: React.SFC = props => {

  const launchSearch = useApp(appState => appState.effects.launchSearch);
  const videosToDisplay = useApp(appState => appState.state.videosToDisplay);

  useEffect(() => {
    launchSearch("q=lomachenko");
  }, []);

  return (
    <Container>
      {videosToDisplay.map((video, i) => {
          const {
            videoId,
            title,
            author,
            authorUrl,
            videoThumbnails,
            viewCount,
            published,
            publishedText,
            lengthSeconds,
          } = video;
          return (
            <VideoBox
            key={`${i}-${published}`}
            videoId={videoId}
            title={title}
            author={author}
            authorUrl={authorUrl}
            thumbnail={videoThumbnails[4].url}
            viewCount={viewCount}
            publishedText={publishedText}
            length={lengthSeconds}
            />
          );
      })}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export default VideosDisplay;