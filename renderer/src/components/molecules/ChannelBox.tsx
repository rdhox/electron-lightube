import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useApp } from '../../store';
import { Channel } from '../../store/modelApp';
// import components
import Picto from '../atoms/Picto';

interface Props {};

const ChannelBox: React.SFC<Props> = props => {

  const channelInfos: Channel = useApp(appState => appState.state.channelInfos);
  const [ image, setImage ] = useState<string>('');
  const [ author, setAuthor ] = useState<string>('');
  const [ subCount, setSubCount ] = useState<number>(null);
  const [ description, setDescription ] = useState<string>('');

  useEffect(() => {
    if(Object.keys(channelInfos).length > 0) {
      setImage(channelInfos.authorThumbnails[3].url);
      setAuthor(channelInfos.author);
      setSubCount(channelInfos.subCount);
      setDescription(channelInfos.description);
    }
    
  }, [channelInfos]);


  return (
    <Container>
      <Column width={70}>
        {image !== '' &&  <Avatar src={image} /> }
      </Column>
      <Column align="flex-start">
        <Row>
          <Author>{author}</Author>
        </Row>
        <Row>
          {subCount && (
            <>
              <SmallText>{subCount}</SmallText>
              <Picto icon="people" width={15} height={15} />
            </>
          )}
        </Row>
        <Row>
          <P>{description}</P>
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
  height: 70px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Column = styled.div<{width?: number, align?: string}>`
  width: ${({width}) => width ? `${width}px` : '100%'};
  height: 70px;
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
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export default ChannelBox;