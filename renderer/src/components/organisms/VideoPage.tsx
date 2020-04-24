import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

interface Props {};

const VideoPage: React.SFC<Props> = props => {
  const { idVideo } = useParams();
  console.log(idVideo);
  return (
    <Container>Hello</Container>
  );
}

const Container = styled.div`
`;

export default VideoPage;