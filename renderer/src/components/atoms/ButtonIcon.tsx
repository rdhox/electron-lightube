import React from 'react';
import styled from 'styled-components';
// import Components
import Picto from './Picto';

interface ParamsStyle {
  round?: boolean;
  halfround?: boolean;
  width?: number;
  height?: number;
  backgroundColor?: string;
  border?: string;
}

interface Props extends ParamsStyle {
  icon: string;
  handleClick: () => void; 
  widthIcon?: string | number;
  heightIcon?: string | number;
  colorIcon?: string;
}

const ButtonIcon: React.SFC<Props> = props => {

  const {
    icon,
    handleClick,
    round,
    halfround,
    width,
    height,
    widthIcon,
    heightIcon,
    colorIcon,
    backgroundColor,
    border
  } = props;  

  return (
    <Container
      round={round}
      halfround={halfround}
      width={width}
      height={height}
      onClick={handleClick}
      backgroundColor={backgroundColor}
      border={border}
    >
      <Picto
        icon={icon}
        width={widthIcon}
        height={heightIcon}
        color={colorIcon}
      />
    </Container>
  );
}

const Container = styled.button<ParamsStyle>`
  width: ${({width}) => width ? `${width}px`: '100px'};
  height: ${({height}) => height ? `${height}px`: '50px'};
  border-radius: ${({round, halfround, width, height}) => {
    if(round) {
      return `${width/2}px`;
    } else if (halfround) {
      return `0 ${height/2}px ${height/2}px 0`;
    }
    return null;
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({backgroundColor}) => backgroundColor? backgroundColor: "transparent"};
  cursor: pointer;
  border: ${({border}) => border ? border: "none"};
  appearance: none;
  outline: none;
`;

export default ButtonIcon;