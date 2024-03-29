import React from 'react';
import styled from 'styled-components';

interface Props {
  children: string;
  color?: string;
  bold?: boolean
};

const SmallTitle: React.SFC<Props> = props => {
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
  color: ${({color}) => color ? color : 'initial'};
  text-transform: capitalize;
  font-weight: ${({bold}) => bold ? 'bold' : 'normal'};
`;

export default SmallTitle;