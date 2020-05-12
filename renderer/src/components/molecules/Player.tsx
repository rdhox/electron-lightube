import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { apiApp, apiSettings, StateRef } from '../../store';
import { Video, Playlist, VideoPlaylist, RecommendedVideo } from '../../store/apiType';
// import components
import ReactPlayer from 'react-player';

interface Props {
  idVideo: string;
};

const Player: React.SFC<Props> = props => {

  const handleEnded = () => {
    // seeting autoplay
    if(true) {
      if(videoToReadNext.current !== '') {
        history.push(`/video/${videoToReadNext.current}`);
      }
    }
  }

  const {
    idVideo,
  } = props;

  const history = useHistory();
  const videoToReadNext = useRef('');

  const selectedVideo: Video = apiApp.getState().state.selectedVideo;
  const playlistSelected: Playlist = apiApp.getState().state.playlistSelected;

  const autoplayRef: StateRef<boolean> = useRef(apiSettings.getState().state.autoplay);

   // Autoplay 
  useEffect(() => {
    function findNextVideo(selected, playList) {
      let list = [] as Array<RecommendedVideo | VideoPlaylist>;
      if (Object.keys(playList).length > 0) {
        list = playList.videos;
      } else if (Object.keys(selected).length > 0) {
        list = selected.recommendedVideos;
      }
  
      if (list.length > 0) {
        const videoIndex = list.findIndex(v => v.videoId === idVideo);
        if (videoIndex === list.length - 1 || videoIndex === -1) {
          videoToReadNext.current = list[0].videoId;
        } else {
          videoToReadNext.current = list[videoIndex + 1].videoId;
        }
      }
    }

    const unsubNextSelectedVideo = apiApp.subscribe(
      (selectedVideo: Video) => {
        if(autoplayRef.current) {
          findNextVideo(selectedVideo, playlistSelected);
        }
      },
      appState => appState.state.selectedVideo
    );
    const unsubNextPlaylistVideo = apiApp.subscribe(
      (playlistSelected: Playlist) => {
        if(autoplayRef.current) {
          findNextVideo(selectedVideo, playlistSelected);
        }
      },
      appState => appState.state.playlistSelected
    );
    
    if(autoplayRef.current) {
      findNextVideo(selectedVideo, playlistSelected);
    }

    return () => {
      unsubNextSelectedVideo();
      unsubNextPlaylistVideo();
    }

  }, [idVideo, playlistSelected, selectedVideo]);

  useEffect(() => {
    const unsubAutoplay = apiSettings.subscribe(
      (autoplay: boolean) => autoplayRef.current = autoplay,
      settingsState => settingsState.state.autoplay
    );
    return () => {
      unsubAutoplay();
    }
  }, []);

  return (
    <Container>
      <ReactPlayer
        playing={false}
        url={`https://www.youtube.com/watch?v=${idVideo}`}
        className="react-player"
        config={{ 
          youtube: {
            embedOptions: {
              host: 'https://www.youtube-nocookie.com',
              videoId: idVideo
            },
            preload: true,
          }
        }}
        controls
        width='100%'
        height='100%'
        onEnded={handleEnded}
      />
      
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding-top: 56.25%;
`;


export default Player;