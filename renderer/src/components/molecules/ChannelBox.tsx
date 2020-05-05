import React from 'react';
import styled from 'styled-components';

// import components
import Picto from '../atoms/Picto';

interface Props {
  image: string;
  author: string;
  subCount: number;
  description: string;
};

const ChannelBox: React.SFC<Props> = props => {

  const {
    image,
    author,
    subCount,
    description,
  } = props;

  return (
    <Container>
      <Column width={70} align="center">
        {image !== '' ?  <Avatar src={image} /> : 
          <PlaceHolderImage>
            <Picto icon="noimage" width={50} height={50} color="#BDBDBD" />
          </PlaceHolderImage>
        }
      </Column>
      <Column align="flex-start">
        <Row>
          {author !== '' ? <Author>{author}</Author> : <Placeholder width={100} height={15} color="#BDBDBD" />}
        </Row>
        <Row>
          {subCount !== null ? (
            <>
              <SmallText>{subCount}</SmallText>
              <Picto icon="people" width={15} height={15} />
            </>
          ): (
            <>
              <Placeholder width={30} height={10} color="#EEEEEE" />
              <Picto icon="people" width={15} height={15} />
            </>
          )}
        </Row>
        <Row>
          {description !== '' ? <P>{description}</P> : <Placeholder width={150} height={20} color="#F5F5F5" />}
        </Row>
      </Column>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 60px;
`;

const Placeholder = styled.div<{width: number, height: number, color: string}>`
  box-sizing: border-box;
  margin: 3px 2px ;
  width: ${({width}) => `${width}px`};
  height: ${({height}) => `${height}px`};
  background-color: ${({color}) => color};
`;

const PlaceHolderImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: solid 1px #757575;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Column = styled.div<{width?: number, align?: string}>`
  width: ${({width}) => width ? `${width}px` : '100%'};
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: ${({align}) => align ? align: 'space-between' };
  align-items: center;
  margin: 0 5px;
`;

const Author = styled.span`
  font-size: 13px;
  font-weight: bold;
`;

const SmallText = styled.span`
  font-size: 12px;
  margin-right: 5px;
`;

const P = styled.p`
  width:100%;
  color: grey;
  display: -webkit-box;
  font-size: 12px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export default ChannelBox;