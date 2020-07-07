import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { apiApp, ReducerEffect } from '../../store';
import { VideoPlaylist } from '../../store/apiType';
// import components
import Picto from '../atoms/Picto';
import Thumbnail from '../atoms/Thumbnail';

interface Props {
  title: string;
  author: string;
  authorId: string;
  playlistId: string;
  playlistThumbnail: string;
  videoCount: number;
  onChannel: boolean;
  light?: boolean;
  videos: VideoPlaylist;
};

const PlaylistBox: React.SFC<Props> = props => {

  function handleClickAuthor(): void {
    fetchChannelInfos(authorId);
  }

  function handleClickPlaylist() {
    fetchPlaylist(playlistId);
    history.push(`/video/${videos[0].videoId}`);
  }

  const fetchChannelInfos: ReducerEffect<[string?, number?, string?, string?, number?, string?]> = apiApp.getState().effects.fetchChannelInfos;
  const fetchPlaylist: ReducerEffect<[string]> = apiApp.getState().effects.fetchPlaylist;

  const history = useHistory();

  const {
    title,
    playlistId,
    playlistThumbnail,
    author,
    authorId,
    videoCount,
    light = false,
    onChannel,
    videos
  } = props;

  return (
    <Container light={light}>
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
          <LinkAction onClick={handleClickPlaylist} >
            <Thumbnail 
              url={playlistThumbnail}
              width={200}
              height='auto'
              borderRadius={5}
            />
          </LinkAction>
        </Row>
        {!light && (
          <Row>
            <span>
              <Picto icon="video" width={10} height={10} />
              <SmallText>{` ${videoCount}`}</SmallText>
            </span>
            <SmallText>Playlist</SmallText>
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
          <LinkAction onClick={handleClickPlaylist} >
            <Title>{title}</Title>
          </LinkAction>
        </Row>
        {light &&(
          <Row>
            <P>Playlist</P>
          </Row>
        )}
        {light && (
          <Row>
            <span>
              <Picto icon="video" width={10} height={10} />
              <SmallText>{` ${videoCount}`}</SmallText>
            </span>
          </Row>
        )}
      </Column>
    </Container>
  );
}

const Container = styled.div<{light?: boolean}>`
  box-sizing: border-box; 
  width: 100%;
  height: ${({light}) => light ? '140px' : '180px'};
  padding: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #F5F5F5;
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

const P = styled.p`
  width:100%;
  color: grey;
  display: -webkit-box;
  font-size: 13px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
`;

export default PlaylistBox;