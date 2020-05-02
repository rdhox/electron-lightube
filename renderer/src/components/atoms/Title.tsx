import React from 'react';
import styled from 'styled-components';

interface Props {
  children: string;
  color?: string;
  bold?: boolean
};

const Title: React.SFC<Props> = props => {
  const {
    children,
    color,
    bold = false
  } = props;
  return (
    <Container color={color} bold={bold} >{children}</Container>
  );
}

const Container = styled.span<{color?: string, bold?: boolean}>`
  font-size: 18px;
  color: ${({color}) => color ? color : 'initial'};
  text-transform: capitalize;
  font-weight: ${({bold}) => bold ? 'bold' : 'normal'};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export default Title;