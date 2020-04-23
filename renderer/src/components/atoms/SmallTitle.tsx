import React from 'react';
import styled from 'styled-components';

interface Props {
  children: string;
  color?: string;
};

const SmallTitle: React.SFC<Props> = props => {
  const {
    children,
    color
  } = props;
  return (
    <Container color={color} >{children}</Container>
  );
}

const Container = styled.span<{color?: string}>`
  color: ${({color}) => color ? color : 'initial'};
  text-transform: capitalize;
`;

export default SmallTitle;