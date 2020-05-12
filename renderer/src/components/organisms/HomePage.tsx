import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useApp, apiApp, apiThemes, ReducerEffect, apiSettings } from '../../store';
import { ChannelsInThemes } from '../../store/modelThemes';
import { VideoDetails } from '../../store/apiType';
import { apiInstance } from '../../services/apiService';
// import components
import VideoBoxHomePage from '../molecules/VideoBoxHomePage';
import Spinner from '../atoms/Spinner';

interface Props {};

const HomePage: React.SFC<Props> = () => {

  const videos: VideoDetails[] = useApp(appState => appState.state.homepageVideos);
  const loading: boolean = useApp(appState => appState.state.loading);
  const fetchVideosForHomepage: ReducerEffect = apiApp.getState().effects.fetchVideosForHomepage;

  const [ firstTimeLoading, setFirstTimeLoading ] = useState<boolean>(true);

  useEffect(() => {

    function fetchVideos() {
      if(firstTimeLoading) {
        setTimeout(() => {
          setFirstTimeLoading(false);
          fetchVideos();
        }, 250);
      } else {
        if(apiInstance.getUrl() === '') {
          const urlApi = apiSettings.getState().state.apiUrl;
          apiInstance.setUrl(urlApi);
        }
        fetchVideosForHomepage();
      }
    }

    const unsubChannels = apiThemes.subscribe(
      (channels: ChannelsInThemes) => {
        fetchVideos();
      },
      appThemes => appThemes.state.channels
    );

    fetchVideos();
    return () => {
      unsubChannels();
    }
  }, [fetchVideosForHomepage, firstTimeLoading]);

  return (
    <Container>
      {videos.length < 1 && loading && <Spinner />}
      {videos.length > 0 && videos.map((video, i) => {
        if (video.type === 'video') {
          const {
            videoId,
            title,
            author,
            authorId,
            videoThumbnails,
            viewCount,
            published,
            publishedText,
            lengthSeconds,
            description
          } = video;

          return (
            <VideoBoxHomePage
              key={`${i}-${published}`}
              videoId={videoId}
              title={title}
              author={author}
              authorId={authorId}
              thumbnail={videoThumbnails[4].url}
              viewCount={viewCount}
              publishedText={publishedText}
              length={lengthSeconds}
              description={description}
            />
          );
        }
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

export default HomePage;
