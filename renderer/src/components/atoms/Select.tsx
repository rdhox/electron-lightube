import React from 'react';
import styled from 'styled-components';

interface Options {
  [key: string]: string;
}

interface Props {
  options: Options;
  defaultValue: string;
  onHandleChange: (value: string) => void;
};

const Select: React.SFC<Props> = props => {

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = e.currentTarget.value;
    onHandleChange(value);
  }

  const {
    options,
    defaultValue,
    onHandleChange,
  } = props;

  return (
    <Container value={defaultValue} onChange={handleChange}>
      {Object.keys(options).map(key => <option key={key} value={key}>{options[key]}</option>)}
    </Container>
  );
}

const Container = styled.select`
  width: 200px;
  height: 30px;
  font-size: 20px;
  border: none;
  outline: none;
  background-color: transparent;
`;

export default Select;