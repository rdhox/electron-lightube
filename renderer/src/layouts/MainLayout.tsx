import React from 'react';
import styled from 'styled-components';
import Header from '../components/organisms/Header';
import ModalLayout from './ModalLayout';
 
const MainLayout : React.SFC = () => {

  return (
    <Container>
      <Header />
      <ModalLayout />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
 
export default MainLayout;