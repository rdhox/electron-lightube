import React from 'react';
import styled from 'styled-components';
// import components
import InputSearch from '../molecules/InputSearch';
import ButtonIcon from '../atoms/ButtonIcon';
import ThemesManager from '../molecules/ThemesManager';
import ListChannels from '../molecules/ListChannels';


export interface Props {}
 
const Header: React.SFC <Props> = () => {
  
  function clickSettings() {
    console.log('settings');
  }

  return (
    <Container>
      <Row align="space-between" >
        <Row align="flex-start">
          <ButtonIcon
            icon="gear"
            handleClick={clickSettings}
            backgroundColor="transparent"
            width={50}
            height={50}
            widthIcon={40}
            heightIcon={40}
          />
          <ThemesManager />
        </Row>
        <InputSearch />
      </Row>
      <Row align="space-between" style={{ paddingTop: "10px" }}>
        <ListChannels />
      </Row>
    </Container>
  );
}

const Container = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 2px 0px rgba(240,240,240,1);
  padding-top: 10px;
`;
const Row = styled.div<{align: string}>`
  width: 100%;
  display: flex;
  justify-content: ${({align}) => align};
  align-items: center;
`;

 
export default Header;