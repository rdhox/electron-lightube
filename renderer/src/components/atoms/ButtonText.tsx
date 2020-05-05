import React from 'react';
import styled from 'styled-components';

interface Props {
  children: string;
  onHandleClick: (any) => void;
  color?: string;
  width?: number;
  height?: number;
};

const ButtonText: React.SFC<Props> = props => {
  const {
    children,
    onHandleClick,
    color,
    width,
    height
  } = props;

  return (
    <Container
      onClick={onHandleClick}
      color={color}
      width={width}
      height={height}
    >
      {children}
    </Container>
  );
}

const Container = styled.button<{color: string; width: number; height:number}>`
  width: ${({width}) => width ? `${width}px` : '60px'};
  height: ${({height}) => height ? `${height}px` : '30px'};
  border-radius: 5px;
  background-color: ${({color}) => color ? color: 'white'};
  cursor: pointer;
  outline: none;
  margin: 2px;

  &:active {
    box-shadow: inset 0px 0px 2px 1px rgba(222,222,222,1);
  }
`;

export default ButtonText;