import React from 'react';
import styled from 'styled-components';

// import components
import SmallTitle from '../atoms/SmallTitle';

interface Props {
  author: string;
  authorThumbnails: string;
  contentHtml: string;
  publishedText: string;
  index: number;
};

const Comment: React.SFC<Props> = props => {
  const {
    author,
    authorThumbnails,
    contentHtml,
    publishedText,
    index
  } = props;

  return (
    <Container index={index} >
      <Row>
        <Avatar src={authorThumbnails} />
        <SmallTitle>{author}</SmallTitle>
      </Row>
      <Row padding="55px">
        <div dangerouslySetInnerHTML={{__html: contentHtml}} />
      </Row>
      <Row align="flex-end">
        <SmallText>{publishedText}</SmallText>
      </Row>
    </Container>
  );
}

const Container = styled.div<{index: number}>`
  display: flex;
  flex-direction: column;
  width : '100%';
  margin: 7px 0;
  padding: 5px;
  background-color: ${({index}) => {
    if( index % 2 === 0) {
      return '#FAFAFA';
    }
    return 'white';
  }};
`;

const Row = styled.div<{align?:string, padding?:string}>`
  display: flex;
  justify-content: ${({align}) => align ? align : 'flex-start'};
  padding-left: ${({padding}) => padding ? padding : '0' };
  align-items: center;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 35px;
  margin-right: 5px;
`;

const SmallText = styled.span`
  font-size: 15px;
  margin-left: 5px;
`;

export default Comment;