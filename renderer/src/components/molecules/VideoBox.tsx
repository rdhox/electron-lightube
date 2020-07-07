import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { apiApp, ReducerEffect, apiThemes, StateRef } from '../../store';
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
  onChannel: boolean;
  light?: boolean;
  selected?: boolean
};

const VideoBox: React.SFC<Props> = props => {

  function handleClickAuthor(): void {
    setIsSearchModalDisplayed(true);
    setIsFiltersOn(false);
    fetchChannelInfos(authorId);
  }

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

  const setIsSearchModalDisplayed: ReducerEffect<[boolean]> = apiApp.getState().reducers.setIsSearchModalDisplayed;
  const fetchChannelInfos: ReducerEffect<[string]> = apiApp.getState().effects.fetchChannelInfos;
  const setIsFiltersOn: ReducerEffect<[boolean]> = apiApp.getState().reducers.setIsFiltersOn;

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
    onChannel,
    light = false,
    selected = false
  } = props;

  useEffect(() => {
    function checkOnWatchLater(list: SeeLaterVideo[]) {
      const index = list.find(video => video.videoId === videoId);
      if(index) {
        setOnWatchList(true);
      }else {
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
    <Container light={light} selected={selected}>
      <Column width={210} align={light ? "center" : "space-between"}>
        {!light && (
          <Row height={onChannel ? 10 : 'auto'}>
            {!onChannel && (
              <LinkAction 
                onClick={handleClickAuthor}
              >
                <Author>{author}</Author>
              </LinkAction>
            )}
          </Row>
        )}
        <Row>
          <Link to={`/video/${videoId}`} >
            <Thumbnail 
              url={thumbnail}
              width={200}
              height='auto'
              borderRadius={5}
            />
          </Link>
        </Row>
        {!light && (
          <Row>
            {viewCount && (
              <span>
                <Picto icon="eye" width={10} height={10} />
                <SmallText>{` ${viewCount}`}</SmallText>
              </span>
            )}
            <SmallText>{formatLength(length)}</SmallText>
          </Row>
        )}
      </Column>
      <Column align={light ? "space-evenly" : "center"} >
        {light && (
          <Row>
            <LinkAction 
              onClick={handleClickAuthor}
            >
              <Author>{author}</Author>
            </LinkAction>
          </Row>
        )}
        <Row>
          <LinkStyle to={`/video/${videoId}`} >
            <Title>{title}</Title>
          </LinkStyle>
        </Row>
        {!light &&(
          <Row>
            <P>{description}</P>
          </Row>
        )}
        {light && (
          <Row>
            {viewCount && (
            <span>
              <Picto icon="eye" width={10} height={10} />
              <SmallText>{` ${viewCount}`}</SmallText>
            </span>
            )}
            <SmallText>{formatLength(length)}</SmallText>
          </Row>
        )}
        <Row>
          <SmallText>{publishedText}</SmallText>
          <SmallTextButton onClick={handleWatchLater}>
            {onWatchList ? t('molecules.VideoBox.removeWatchLater') : t('molecules.VideoBox.watchlater')}
          </SmallTextButton>
        </Row>
      </Column>
    </Container>
  );
}

const Container = styled.div<{ light?: boolean, selected?: boolean}>`
  box-sizing: border-box; 
  width: 100%;
  height: ${({light}) => light ? '140px' : '180px'};
  padding: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({selected}) => selected ? 'solid 3px #E0E0E0' : 'solid 1px #F5F5F5'};
  border-top: ${({selected}) => selected ? 'solid 3px #E0E0E0' : 'none'};
`;

const LinkStyle = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LinkAction = styled.span`
  color: black;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Row = styled.div<{height?: number | string}>`
  width: 100%;
  height: ${({height}) => {
    if(typeof height === 'string') {
      return height;
    } else if (typeof height == 'number') {
      return `${height}px`;
    }
    return 'auto';
  }};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div<{width?: number, align?: string}>`
  width: ${({width}) => width ? `${width}px` : '100%'};
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: ${({align}) => align ? align: 'space-between' };
  align-items: center;
  margin: 0px 5px;
`;

const Title = styled.span`
  display: -webkit-box;
  font-size: 15px;
  font-weight: bold;
  width: 100%; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const Author = styled.span`
  font-size: 12px;
  font-weight: bold;
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
  width:100%;
  color: grey;
  display: -webkit-box;
  font-size: 13px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
`;

const MemoizedVideoBox = React.memo(VideoBox);

export default MemoizedVideoBox;