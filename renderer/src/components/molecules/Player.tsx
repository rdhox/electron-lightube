import React from 'react';
import styled from 'styled-components';

// import components
import ReactPlayer from 'react-player';

interface Props {
  idVideo: string;
};

const Player: React.SFC<Props> = props => {

  const { idVideo } = props;

  return (
    <Container>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${idVideo}`}
        className="react-player"
        config={{ 
          youtube: {
            embedOptions: {
              host: 'https://www.youtube-nocookie.com',
              videoId: idVideo
            },
            preload: true,
          }
        }}
        controls
        width='70%'
        height='100%'
      />
      
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding-top: 56.25%;
`;


export default Player;