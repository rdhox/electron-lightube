import React from 'react';
import styled from 'styled-components';

import { transitionSettings } from '../../config/hardData';
// import components

interface Props {
  transitionState: string;
};

const Settings: React.SFC<Props> = props => {
  
  const {
    transitionState
  } = props;
  const { defaultStyle, transitionStyles } = transitionSettings;

  return (
    <Container
      style={{
        ...defaultStyle,
        ...transitionStyles[transitionState],
      }}
    />
  );
}

const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 5px;
  width: 300px;
  min-height: 600px;
  border: 1px solid lightGrey;
  box-shadow: 0px 6px 12px lightGrey;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  background-color: white;
`;

export default Settings;