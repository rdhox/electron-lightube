import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { transitionWatchLater } from '../../config/hardData';
import { apiThemes, StateRef } from '../../store';
import { SeeLaterVideo } from '../../store/modelThemes';
// import components
import ListVideos from '../molecules/ListVideos';
import SmallTitle from '../atoms/SmallTitle';

interface Props {
  transitionState: string;
};

const WatchLater: React.SFC<Props> = props => {
  
  const {
    transitionState
  } = props;
  const { defaultStyle, transitionStyles } = transitionWatchLater;

  const watchLaterRef: StateRef<SeeLaterVideo[]> = useRef(apiThemes.getState().state.watchlater);
  const [ t ] = useTranslation()
  const [ videoList, setVideoList ] = useState<SeeLaterVideo[]>(watchLaterRef.current)

  useEffect(() => {

    const unsubCheckWatchLater = apiThemes.subscribe(
      (watchlater: SeeLaterVideo[]) => {
        watchLaterRef.current = watchlater;
        setVideoList(watchlater);
      },
      themesState => themesState.state.watchlater
    );

    return () => {
      unsubCheckWatchLater();
    }
  }, []);

  return (
    <Container
      style={{
        ...defaultStyle,
        ...transitionStyles[transitionState],
      }}
    >
      <Row>
        <SmallTitle bold>Watch Later</SmallTitle>
      </Row>
      {watchLaterRef.current.length > 0 ? (
        <ListVideos videos={videoList} />
      ):(
      <Text>{t('organisms.WatchLater.novideo')}</Text>
      )}
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 165px;
  right: -320px;
  width: 420px;
  height: 600px;
  border: 1px solid lightGrey;
  box-shadow: 0px 6px 12px grey;
  z-index: 980;
  background-color: white;
  overflow-y: scroll;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0;
`;

const Text = styled.div`
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
`;

export default WatchLater;