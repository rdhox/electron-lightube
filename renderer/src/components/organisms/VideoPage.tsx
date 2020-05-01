import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { apiApp } from '../../store';
// import components
import Player from '../molecules/Player';

interface Props {};

const VideoPage: React.SFC<Props> = props => {

  const { idVideo } = useParams();
  const [video, setVideo] = useState<string>(idVideo);
  const resetSearch = apiApp.getState().reducers.resetSearch;

  useEffect(() => {
    if(idVideo !== video) {
      setVideo(idVideo);
    } else if (idVideo === video){
      resetSearch();
    }
  }, [resetSearch, idVideo, video]);

  return (
    <Container>
      <Row>
        <Player idVideo={video} />
      </Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
`;

export default VideoPage;