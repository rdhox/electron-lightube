import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { useApp, apiApp, ReducerEffect } from '../../store';
import { Video, Playlist } from '../../store/apiType';
// import components
import ListVideos from '../molecules/ListVideos';
import Player from '../molecules/Player';
import VideoInfos from '../molecules/VideoInfos';
import Comments from '../molecules/Comments';

interface Props {};

const VideoPage: React.SFC<Props> = props => {

  const { idVideo } = useParams();
  const [ video, setVideo ] = useState<string>(idVideo);

  const resetSearch: ReducerEffect = apiApp.getState().reducers.resetSearch;
  const fetchVideo: ReducerEffect = apiApp.getState().effects.fetchVideo;
  const setSelectedVideo: ReducerEffect = apiApp.getState().reducers.setSelectedVideo;
  const setCommentsCollection: ReducerEffect = apiApp.getState().reducers.setCommentsCollection;
  const setPlaylistSelected: ReducerEffect = apiApp.getState().reducers.setPlaylistSelected;

  const selectedVideo: Video = useApp(appState => appState.state.selectedVideo);
  const playlistSelected: Playlist = useApp(appState => appState.state.playlistSelected);
  const loading: boolean = useApp(appState => appState.state.loading);

  useEffect(() => {
    if(idVideo !== video) {
      setSelectedVideo({});
      setCommentsCollection({});
      setVideo(idVideo);
    } else if (idVideo === video){
      resetSearch();
      fetchVideo(video);
    }
  }, [resetSearch, fetchVideo, setSelectedVideo, setCommentsCollection, idVideo, video]);

  // If click on video not on playlist list, we erase the playlist
  useEffect(() => {
    if(Object.keys(playlistSelected).length > 0) {
      if(!Object.keys(playlistSelected.videos).some(i => playlistSelected.videos[i].videoId === idVideo)){
        setPlaylistSelected({});
      }
    }
  }, [idVideo, playlistSelected, setPlaylistSelected]);


  let image = '';
  if(selectedVideo.authorThumbnails) {
    image = selectedVideo.authorThumbnails[4].url;
  }

  return (
    <Container>
      <Column width={70}>
          <WrapperVideo>
            <Player idVideo={video} />
          </WrapperVideo>
          <VideoInfos
            title={selectedVideo.title}
            descriptionHtml={selectedVideo.descriptionHtml}
            subCountText={selectedVideo.subCountText}
            viewCount={selectedVideo.viewCount}
            published={selectedVideo.published}
            authorIcon={image}
            author={selectedVideo.author}
          />
          <Comments video={idVideo} />
      </Column>
      <Column width={30}>
        <ListVideos
          videos={Object.keys(playlistSelected).length > 0 ? playlistSelected.videos : selectedVideo.recommendedVideos}
          loading={loading}
        />
      </Column>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Column = styled.div<{width?: number}>`
  width: ${({width}) => width? `${width}%` : 'auto'};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const WrapperVideo = styled.div`
  width: 100%;
  padding-top: 5px;
`;

export default VideoPage;