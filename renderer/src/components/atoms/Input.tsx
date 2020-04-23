import React from 'react';
import styled from 'styled-components';

interface Props {
  onHandleChange: (v:string) => void;
  placeholder?:string;
  value: string;
  length?: string;
  fontSize?: number;
  height?: number;
}

const Input: React.SFC<Props> = props => {

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onHandleChange(e.target.value);
  }

  const {
    value,
    placeholder,
    onHandleChange,
    length,
    fontSize,
    height,
  } = props;

  return (
    <Container
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      length={length}
      fontSize={fontSize}
      height={height}
    />
  );
}

const Container = styled.input<{length: string, fontSize: number, height: number}>`
  border: none;
  font-size: ${({fontSize}) => fontSize ? `${fontSize}px` : '22px'};
  appearance: none;
  outline: none;
  width: ${({length}) => length ? length : 'auto'};
  height: ${({height}) => height ? `${height}px` : 'auto'};
`;

export default Input;