import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  header?: boolean;
};


const Modal: React.SFC<Props> = props => {

  const {
    children,
    header
  } = props;

  return ReactDOM.createPortal(
    <Container header={header} >{children}</Container>
  , document.getElementById('root'));
}

const Container = styled.div<{header?: boolean}>`
  position: absolute;
  left: 0;
  right: 0;
  top: ${({header}) => header ? '150px': '0px'};
  bottom: 0;
  background-color: rgba(44,62,80 ,0.2);
  display: flex;
  z-index: 999;
`;

export default Modal;