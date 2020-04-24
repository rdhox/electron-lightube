import React from 'react';
import styled from 'styled-components';
import Header from '../components/organisms/Header';
import ModalLayout from './ModalLayout';
import Main from '../components/organisms/Main';
 
const MainLayout : React.SFC = () => {

  return (
    <Container>
      <Header />
      <Main />
      <ModalLayout />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
 
export default MainLayout;