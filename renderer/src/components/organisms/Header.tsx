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
      <Row align="center" >
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
      <Row align="space-between">
        <ThemesManager />
        <ListChannels />
        <div style={{ alignSelf: "flex-end"}} >
          <ButtonIcon
              icon="arrowDown"
              handleClick={() => {}}
              backgroundColor="transparent"
              width={50}
              height={50}
              widthIcon={40}
              heightIcon={40}
            />
        </div>
      </Row>
    </Container>
  );
}

const Container = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 6px 2px 0px rgba(240,240,240,1);
`;
const Row = styled.div<{align: string}>`
  width: 100%;
  display: flex;
  justify-content: ${({align}) => align};
  align-items: center;
  padding: 5px;
`;
const AlignLeft = styled.div`
  position: absolute;
  top: 2.5px;
  left: 0px;
`;

 
export default Header;