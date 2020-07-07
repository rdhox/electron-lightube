import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ReducerEffect, apiThemes, StateRef } from '../../store';
import {formatLength} from '../../utils/functions';
// import components
import Picto from '../atoms/Picto';
import Thumbnail from '../atoms/Thumbnail';
import { SeeLaterVideo } from '../../store/modelThemes';

interface Props {
  videoId: string;
  title: string;
  author: string;
  authorId: string;
  thumbnail: string;
  viewCount?: number | string;
  publishedText?: string;
  length: number;
  description?: string;
  index?: number;
};

const VideoBoxHomePage: React.SFC<Props> = props => {

  function handleWatchLater(): void {
    if (onWatchList) {
      removeVideoOnWatchLater(videoId);
    } else {
      addVideoOnWatchLater({
        videoId,
        title,
        videoThumbnails: Array(5).fill({url:thumbnail}),
        author,
        authorId,
        lengthSeconds: length,
        viewCountText: viewCount
      });
    }
  }

  const [ t ]= useTranslation();

  const addVideoOnWatchLater: ReducerEffect<[SeeLaterVideo]> = apiThemes.getState().effects.addVideoOnWatchLater;
  const removeVideoOnWatchLater: ReducerEffect<[string]> = apiThemes.getState().effects.removeVideoOnWatchLater;
  const watchLaterRef: StateRef<SeeLaterVideo[]> = useRef(apiThemes.getState().state.watchlater);

  const [ onWatchList, setOnWatchList ] = useState<boolean>(false);

  const {
    videoId,
    title,
    author,
    authorId,
    thumbnail,
    viewCount = null,
    publishedText,
    length,
    description,
  } = props;

  useEffect(() => {
    function checkOnWatchLater(list: SeeLaterVideo[]) {
      const index = list.find(video => video.videoId === videoId);
      if(index) {
        setOnWatchList(true);
      } else {
        setOnWatchList(false)
      }
    }

    const unsubCheckWatchLater = apiThemes.subscribe(
      (watchlater: SeeLaterVideo[]) => {
        watchLaterRef.current = watchlater;
        checkOnWatchLater(watchLaterRef.current);
      },
      themesState => themesState.state.watchlater
    );

    checkOnWatchLater(watchLaterRef.current);

    return () => {
      unsubCheckWatchLater();
    }
  }, [videoId]);

  return (
    <Container>
        <Link to={`/video/${videoId}`} >
          <Thumbnail 
            url={thumbnail}
            width={200}
            height='auto'
            borderRadius={5}
          />
        </Link>
        <LinkStyle to={`/video/${videoId}`} >
          <Title>{title}</Title>
        </LinkStyle>
        <Row>
          {viewCount && (
            <span>
              <Picto icon="eye" width={10} height={10} />
              <SmallText>{` ${viewCount}`}</SmallText>
            </span>
          )}
          <SmallText>{formatLength(length)}</SmallText>
        </Row>
          <P>{description}</P>
        <RowRight>
          <SmallText>{publishedText}</SmallText>
        </RowRight>
        <Row>
          <SmallTextButton onClick={handleWatchLater}>
            {onWatchList ? t('molecules.VideoBoxHomePage.removeWatchLater') : t('molecules.VideoBoxHomePage.watchlater')}
          </SmallTextButton>
        </Row>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box; 
  width: 220px;
  height: 260px;
  padding: 6px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const LinkStyle = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RowRight = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Title = styled.span`
  display: -webkit-box;
  font-size: 14px;
  font-weight: bold;
  width: 100%; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const SmallText = styled.span`
  font-size: 12px;
`;

const SmallTextButton = styled.span`
  font-size: 12px;
  color: black;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const P = styled.p`
  width: 100%;
  color: grey;
  display: -webkit-box;
  font-size: 11px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const MemoizedVideoBoxHomePage = React.memo(VideoBoxHomePage);

export default MemoizedVideoBoxHomePage;