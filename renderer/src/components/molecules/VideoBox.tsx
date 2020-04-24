import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {formatLength} from '../../utils/functions';
// import components
import Picto from '../atoms/Picto';
import Thumbnail from '../atoms/Thumbnail';

interface Props {
  videoId: string;
  title: string;
  author: string;
  authorUrl: string;
  thumbnail: string;
  viewCount: number;
  publishedText: string;
  length: number;
};

const VideoBox: React.SFC<Props> = props => {

  const {
    videoId,
    title,
    author,
    authorUrl,
    thumbnail,
    viewCount,
    publishedText,
    length,
  } = props;

  return (
    <Container>
      <Row>
        <Text>{author}</Text>
        <SmallText>{publishedText}</SmallText>
      </Row>
      <Row>
        <Link to={`/video/${videoId}`} >
          <Thumbnail 
            url={thumbnail}
            width={293}
            height='auto'
            borderRadius={20}
          />
        </Link>
      </Row>
      <Row>
        <LinkStyle to={`/video/${videoId}`} >
          <Title>{title}</Title>
        </LinkStyle>
      </Row>
      <Row>
        <span>
          <Picto icon="eye" width={10} height={10} />
          <SmallText>{` ${viewCount}`}</SmallText>
        </span>
        <SmallText>{formatLength(length)}</SmallText>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  width: 300px;
  height: 260px;
  padding: 3px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  margin: 3px 0;
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

const Text = styled.span`
  font-size: 15px;
`;

const SmallText = styled.span`
  font-size: 12px;
`;

export default VideoBox;