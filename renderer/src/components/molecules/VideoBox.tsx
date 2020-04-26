import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useApp, ReducerEffect } from '../../store';
import {formatLength} from '../../utils/functions';
// import components
import Picto from '../atoms/Picto';
import Thumbnail from '../atoms/Thumbnail';

interface Props {
  videoId: string;
  title: string;
  author: string;
  authorId: string;
  thumbnail: string;
  viewCount: number;
  publishedText: string;
  length: number;
  description: string;
};

const VideoBox: React.SFC<Props> = props => {

  function handleClickAuthor(): void {
    fetchchannelInfos(authorId);
  }

  const fetchchannelInfos: ReducerEffect = useApp(appState => appState.effects.fetchchannelInfos);

  const {
    videoId,
    title,
    author,
    authorId,
    thumbnail,
    viewCount,
    publishedText,
    length,
    description,
  } = props;

  return (
    <Container>
      <Column width={210}>
        <Row>
          <LinkAction 
            onClick={handleClickAuthor}
          >
            <Author>{author}</Author>
          </LinkAction>
        </Row>
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
        <Row>
          <span>
            <Picto icon="eye" width={10} height={10} />
            <SmallText>{` ${viewCount}`}</SmallText>
          </span>
          <SmallText>{formatLength(length)}</SmallText>
        </Row>
      </Column>
      <Column align="center" >
        <Row>
          <LinkStyle to={`/video/${videoId}`} >
            <Title>{title}</Title>
          </LinkStyle>
        </Row>
        <Row>
            <P>{description}</P>
        </Row>
        <Row>
          <SmallText>{publishedText}</SmallText>
        </Row>
      </Column>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box; 
  width: 100%;
  height: 180px;
  padding: 3px;
  display: flex;
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

const LinkAction = styled.span`
  color: black;
  text-decoration: none;
  cursor: pointer;

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

export default VideoBox;