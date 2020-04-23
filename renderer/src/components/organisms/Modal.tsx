import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
};


const Modal: React.SFC<Props> = props => {

  const {
    children
  } = props;

  return ReactDOM.createPortal(
    <Container>{children}</Container>
  , document.getElementById('root'));
}

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(44,62,80 ,0.2);
  display: flex;
  z-index: 999;
`;

export default Modal;