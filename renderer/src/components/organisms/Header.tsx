import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../store';
// import components
import InputSearch from '../molecules/InputSearch';
import ButtonIcon from '../atoms/ButtonIcon';


export interface Props {}
 
const Header: React.SFC <Props> = () => {
  
  function clickSettings() {
    console.log('settings');
  }

  const search = useStore(state => state.global.search);

  return (
    <Container>
      <Row>
        <AlignLeft>
          <ButtonIcon
            icon="gear"
            handleClick={clickSettings}
            backgroundColor="transparent"
            width={50}
            height={50}
            widthIcon={40}
            heightIcon={40}
          />
        </AlignLeft>
        <InputSearch />
      </Row>
      <h1>{search}</h1>
    </Container>
  );
}

const Container = styled.header`
  position: relative;
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  border: 2px solid lightblue;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px;
`;
const AlignLeft = styled.div`
  position: absolute;
  top: 2.5px;
  left: 0px;
`;

 
export default Header;