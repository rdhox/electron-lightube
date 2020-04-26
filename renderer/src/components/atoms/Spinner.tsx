import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner'

interface Props {};

const Spinner: React.SFC<Props> = props => {
  return (
    <Container>
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={50}
        width={50}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Spinner;