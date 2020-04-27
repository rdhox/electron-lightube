import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import { apiApp, apiThemes, ReducerEffect, StateRef } from '../../store';
import { Channel } from '../../store/modelApp';
import { ChannelsInThemes, ChannelSaved } from '../../store/modelThemes';
// import components
import ButtonIcon from '../atoms/ButtonIcon';
import ChannelBox from './ChannelBox';

interface Props {};

interface Subscribed {
  authorId: string;
  sub: boolean;
}

const ChannelBar: React.SFC<Props> = props => {

  function back() {
    setShowChannel(false);
    setChannelInfos({});
  }

  function handleChannel(): void {
    if(subscribed.sub) {
      removeChannelToTheme(authorId);
    } else {
      const newSub: ChannelSaved = {
        image,
        author,
        authorId,
        subCount,
        description
      };
      addChannelToTheme(newSub);
    }
  }

  const [ display, setDisplay ] = useState<boolean>(false);
  const [ image, setImage ] = useState<string>('');
  const [ author, setAuthor ] = useState<string>('');
  const [ authorId, setAuthorId ] = useState<string>('');
  const [ subCount, setSubCount ] = useState<number>(null);
  const [ description, setDescription ] = useState<string>('');
  const [ subscribed, setSubscribed ] = useState<Subscribed>({
    authorId: '',
    sub: false
  });

  const setShowChannel: ReducerEffect = apiApp.getState().reducers.setShowChannel;
  const setChannelInfos: ReducerEffect = apiApp.getState().reducers.setChannelInfos;
  const addChannelToTheme: ReducerEffect = apiThemes.getState().effects.addChannelToTheme;
  const removeChannelToTheme: ReducerEffect = apiThemes.getState().effects.removeChannelToTheme;

  const channelsRef: StateRef<ChannelsInThemes> = useRef(apiThemes.getState().state.channels);

  function checkSubscribed() {
    const allSubIds = Object.keys(channelsRef.current).reduce((acc, key) => {
      acc = [
        ...acc,
        ...channelsRef.current[key]
      ];
      return acc
    }, [])
      .map(channel => channel.authorId);

    setSubscribed(state => {
      const sub: boolean = allSubIds.includes(state.authorId);
      return ({
        ...state,
        sub
      })
    });
  }


  useEffect(() => {
    const unsubShowChannel = apiApp.subscribe(
      (showChannel: boolean) => setDisplay(showChannel),
      appState => appState.state.showChannel
    );
    const unsubChannelInfos = apiApp.subscribe(
      (channelInfos: Channel) => {
        if(Object.keys(channelInfos).length > 0) {
          setImage(channelInfos.authorThumbnails[3].url);
          setAuthor(channelInfos.author);
          setAuthorId(channelInfos.authorId);
          setSubCount(channelInfos.subCount);
          setDescription(channelInfos.description);
          setSubscribed({authorId: channelInfos.authorId, sub: false});
          checkSubscribed();
        }
      },
      appState => appState.state.channelInfos
    );

    const unsubChannelSubscribe = apiThemes.subscribe(
      (channels: ChannelsInThemes) => {
        channelsRef.current = channels;
        checkSubscribed();
      },
      themesState => themesState.state.channels
    );

    return () => {
      unsubShowChannel();
      unsubChannelInfos();
      unsubChannelSubscribe();
    }
  }, []);

  if(display) {

    return (
      <Container>
        <ButtonIcon
          icon="arrowBack"
          widthIcon={20}
          heightIcon={20}
          width={30}
          height={30}
          handleClick={back}
        />
        <ChannelBox
          image={image}
          author={author}
          subCount={subCount}
          description={description}
        />
        <div style={{ marginLeft: "auto"}}>
          <ButtonIcon
            icon={subscribed.sub ? "unsubscribe" : "subscribe"}
            widthIcon={30}
            heightIcon={30}
            width={40}
            height={40}
            handleClick={handleChannel}
          />
        </div>
      </Container>
    );
  }

  return null;
}

const apparition = keyframes`
  0% {
    left: -700px;
  }
  100% {
    left: 0px;
  }
`;

const Container = styled.div`
  position: relative;
  left: -700px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 3px 20px;
  width: 100%;
  height: 75px;
  animation-name: ${apparition};
  animation-timing-function: ease-out;
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-fill-mode: forwards;
`;



export default ChannelBar;