import React from 'react';
import styled from 'styled-components';

interface Props {
  url: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
};

const Thumbnail: React.SFC<Props> = props => {
  const {
    url,
    width,
    height,
    borderRadius
  } = props;

  return (
    <Container
      src={url}
      borderRadius={borderRadius}
      width={width}
      height={height}
    />
  );
}

const Container = styled.img<{borderRadius: number}>`
  border-radius: ${({borderRadius}) => borderRadius? `${borderRadius}px`: 'none'};
`;

export default Thumbnail;
