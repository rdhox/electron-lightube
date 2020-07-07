import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { useApp, apiApp, useSettings, apiSettings, ReducerEffect } from '../../store';
import { Video, Playlist, IComments } from '../../store/apiType';
// import components
import ListVideos from '../molecules/ListVideos';
import ButtonIcon from '../atoms/ButtonIcon';
import Player from '../molecules/Player';
import VideoInfos from '../molecules/VideoInfos';
import Comments from '../molecules/Comments';

interface Props {};

const VideoPage: React.SFC<Props> = props => {

  function handleToggleRecommended() {
    setToggleRecommended(!toggleRecommended);
  }

  const { idVideo } = useParams();
  const [ video, setVideo ] = useState<string>(idVideo);

  const showRecommended: boolean = apiSettings.getState().state.showRecommended;
  const resetSearch: ReducerEffect<[]> = apiApp.getState().reducers.resetSearch;
  const fetchVideo: ReducerEffect<[string]> = apiApp.getState().effects.fetchVideo;
  const setSelectedVideo: ReducerEffect<[Video]> = apiApp.getState().reducers.setSelectedVideo;
  const setCommentsCollection: ReducerEffect<[IComments]> = apiApp.getState().reducers.setCommentsCollection;
  const setPlaylistSelected: ReducerEffect<[Playlist]> = apiApp.getState().reducers.setPlaylistSelected;
  const setIsWatchLaterModalDisplayed: ReducerEffect<[boolean]> = apiApp.getState().reducers.setIsWatchLaterModalDisplayed;

  const selectedVideo: Video = useApp(appState => appState.state.selectedVideo);
  const playlistSelected: Playlist = useApp(appState => appState.state.playlistSelected);
  const loading: boolean = useApp(appState => appState.state.loading);
  const showComments: boolean = useSettings(settingsState => settingsState.state.showComments);

  const [ toggleRecommended, setToggleRecommended ] = useState<boolean>(!showRecommended);

  useEffect(() => {
    if(idVideo !== video) {
      setSelectedVideo({} as Video);
      setCommentsCollection({} as IComments);
      setVideo(idVideo);
    } else if (idVideo === video){
      resetSearch();
      setIsWatchLaterModalDisplayed(false)
      fetchVideo(video);
    }
  }, [resetSearch, fetchVideo, setSelectedVideo, setCommentsCollection, idVideo, video, setIsWatchLaterModalDisplayed]);

  // If click on video not on playlist list, we erase the playlist
  useEffect(() => {
    if(Object.keys(playlistSelected).length > 0) {
      if(!Object.keys(playlistSelected.videos).some(i => playlistSelected.videos[i].videoId === idVideo)){
        setPlaylistSelected({} as Playlist);
      }
    }
  }, [idVideo, playlistSelected, setPlaylistSelected]);


  let image = '';
  if(selectedVideo.authorThumbnails) {
    image = selectedVideo.authorThumbnails[4].url;
  }

  return (
    <Container>
      <Column width={toggleRecommended && Object.keys(playlistSelected).length === 0 ? 100 : 70}>
          <Row>
            <RotateIcon toggled={toggleRecommended}>
              <ButtonIcon
                icon="arrowBack"
                handleClick={handleToggleRecommended}
                backgroundColor="transparent"
                width={20}
                height={20}
                widthIcon={15}
                heightIcon={15}
              />
            </RotateIcon>
          </Row>
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
          {showComments && <Comments video={idVideo} />}
      </Column>
      <Column width={toggleRecommended && Object.keys(playlistSelected).length === 0 ? '0px' : 30}>
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

const Column = styled.div<{width?: (number | string)}>`
  width: ${({width}) => {
    if(typeof width === 'string') {
      return width;
    } else if (typeof width === 'number') {
      return `${width}%`;
    }
    return '100%';
  }};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  transition: width 0.2s ease-out;
  overflow: hidden;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const WrapperVideo = styled.div`
  width: 100%;
  padding-top: 5px;
`;

const RotateIcon = styled.div<{toggled: boolean}>`
  transform: ${({toggled}) => toggled ? 'rotate(0deg)' : 'rotate(180deg)'};
`;

export default VideoPage;