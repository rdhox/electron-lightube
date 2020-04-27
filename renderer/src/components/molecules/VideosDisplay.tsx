import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Channel, VideoDetails } from '../../store/modelApp';
import { apiApp, ReducerEffect, StateRef } from '../../store';
// import components
import VideoBox from './VideoBox';
import Spinner from '../atoms/Spinner';

interface Props {};

const VideosDisplay: React.SFC<Props> = props => {

  function handleInfiniteScroll(): void {
    const {
      scrollTop,
      clientHeight,
      scrollHeight
    } = refContainer.current;

    if ( scrollTop + clientHeight >= scrollHeight) {
      if(!loadingRef.current && !showChannelRef.current) {
        launchSearch(currentSearchRef.current, page + 1);
        setPage(p => p + 1);
      }
    }
  }

  const refContainer = useRef(null);
  const [ list, setList] = useState<VideoDetails[]>([]);
  const [ page, setPage ] = useState<number>(1);

  const videosToDisplayRef: StateRef<VideoDetails[]> = useRef(apiApp.getState().state.videosToDisplay);
  const channelInfosRef: StateRef<Channel> = useRef(apiApp.getState().state.channelInfos);
  const showChannelRef: StateRef<boolean> = useRef(apiApp.getState().state.showChannel);
  const currentSearchRef: StateRef<string> = useRef(apiApp.getState().state.currentSearch);
  const loadingRef: StateRef<boolean> = useRef(apiApp.getState().state.loading);

  const launchSearch: ReducerEffect = apiApp.getState().effects.launchSearch;

  function updateList(showChannel) {
    if(!showChannel) {
      setList(videosToDisplayRef.current);
    } else if(showChannel && channelInfosRef.current.latestVideos) {
      setList(channelInfosRef.current.latestVideos);
    } else if(showChannel && !channelInfosRef.current.latestVideos){
      setList([]);
    }
  }

  useEffect(() => {
    const unsubShowChannel = apiApp.subscribe(
      (showChannel: boolean) => {
        showChannelRef.current = showChannel;
        updateList(showChannel);
      },
      appState => appState.state.showChannel
    );
    const unsubVideosToDisplay = apiApp.subscribe(
      (videosToDisplay: VideoDetails[]) => {
        videosToDisplayRef.current = videosToDisplay;
        updateList(showChannelRef.current);
      },
      appState => appState.state.videosToDisplay
    );
    const unsubChannelInfos = apiApp.subscribe(
      (channelInfos: Channel) => {
        channelInfosRef.current = channelInfos;
        updateList(showChannelRef.current);
      },
      appState => appState.state.channelInfos
    );
    const unsubCurrentSearch = apiApp.subscribe(
      (currentSearch: string) => currentSearchRef.current = currentSearch,
      appState => appState.state.currentSearch
    );
    const unsubLoading = apiApp.subscribe(
      (loading: boolean) => loadingRef.current = loading,
      appState => appState.state.loading
    );

    return () => {
      unsubShowChannel();
      unsubVideosToDisplay();
      unsubChannelInfos();
      unsubCurrentSearch();
      unsubLoading();
    }
  }, []);

  return (
    <Container
      onScroll={handleInfiniteScroll}
      ref={refContainer}
    >
      {list.length === 0 ? (
        <Spinner />
      ):(
        list.map((video, i) => {
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
            <VideoBox
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
              index={i}
              onChannel={showChannelRef.current}
            />
          );
        })
      )}
      {list.length > 0 && loadingRef.current && <Spinner />}
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box; 
  padding: 20px;
  display: flex;
  width: 720px;
  max-height: 750px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default VideosDisplay;