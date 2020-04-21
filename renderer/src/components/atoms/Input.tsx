import React from 'react';
import styled from 'styled-components';

interface Props {
  handleChange: (v:string) => void;
  placeholder?:string;
  value: string;
  length?: string;
}

const Input: React.SFC<Props> = props => {

  function onHandleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    handleChange(e.target.value);
  }

  const {
    value,
    placeholder,
    handleChange,
    length
  } = props;

  return (
    <Container
      value={value}
      placeholder={placeholder}
      onChange={onHandleChange}
      length={length}
    />
  );
}

const Container = styled.input<{length: string}>`
  border: none;
  font-size: 22px;
  appearance: none;
  outline: none;
  width: ${({length}) => length ? length : 'auto'};
`;

export default Input;