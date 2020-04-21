import React from 'react';
import styled from 'styled-components';
import Header from '../components/organisms/Header';
 
const MainLayout : React.SFC = () => {

  return (
    <Container>
      <Header />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
 
export default MainLayout;