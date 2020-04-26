import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { Channel, VideoDetails } from '../../store/modelApp';
import { useApp, ReducerEffect } from '../../store';
// import components
import VideoBox from './VideoBox';
import Spinner from '../atoms/Spinner';

interface Props {
  videosSearch: VideoDetails[];
  videosChannel: Channel;
};

const VideosDisplay: React.SFC<Props> = props => {

  // function loadMore(query: string, loading: boolean): void {
  //   console.log(loading);
  //   if (!loading) {
  //     launchSearch(query, page + 1);
  //     setPage(p => p + 1);
  //   }
  // }

  const {
    videosSearch,
    videosChannel,
  } = props;

  const refContainer = useRef(null);
  const [ list, setList] = useState<VideoDetails[]>([]);
  const [ page, setPage ] = useState<number>(1);
  const launchSearch: ReducerEffect = useApp(appState => appState.effects.launchSearch);
  const showChannel: boolean = useApp(appState => appState.state.showChannel);
  const currentSearch: string = useApp(appState => appState.state.currentSearch);
  const loading: boolean = useApp(appState => appState.state.loading);

  useEffect(() => {
    if(!showChannel) {
      setList(videosSearch);
    } else if(showChannel && videosChannel.latestVideos) {
      setList(videosChannel.latestVideos);
    } else if(showChannel && !videosChannel.latestVideos){
      setList([]);
    }
  }, [showChannel, videosSearch, videosChannel.latestVideos]);

  useEffect(() => {
     refContainer.current.addEventListener("scroll", () => {
      if (
        refContainer.current.scrollTop + refContainer.current.clientHeight >=
        refContainer.current.scrollHeight
      ) {
        loadMoreMemoized();
      }
    });
  }, [currentSearch]);

  const loadMoreMemoized = useCallback(() => {
    console.log(loading);
    if(!loading) {
      launchSearch(currentSearch, page + 1);
      setPage(p => p + 1);
    }
  },[loading, currentSearch]);

  return (
    <Container ref={refContainer}>
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
            />
          );
        })
      )}
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
`;

export default VideosDisplay;