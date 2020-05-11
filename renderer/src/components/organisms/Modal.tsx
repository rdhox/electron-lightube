import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { apiApp, StateRef } from '../../store';

interface Props {
  children: React.ReactNode;
  header?: boolean;
};


const Modal: React.SFC<Props> = props => {

  const {
    children,
    header
  } = props;

  const isFiltersOn: boolean = apiApp.getState().state.isFiltersOn;
  const [ filters, setFilters ] = useState(isFiltersOn);

  useEffect(() => {

    const unsubFilter = apiApp.subscribe(
      (isFiltersOn: boolean) => {
        setFilters(isFiltersOn);
      },
      appState => appState.state.isFiltersOn
    );

    return () => {
      unsubFilter();
    }
  }, []);

  return ReactDOM.createPortal(
    <Container filtersOn={filters} header={header} >{children}</Container>
  , document.getElementById('root'));
}

const Container = styled.div<{header?: boolean, filtersOn?: boolean}>`
  position: absolute;
  left: 0;
  right: 0;
  top: ${({header, filtersOn}) => {
    if(header) {
      if(filtersOn)
        return '370px';
      return '170px';
    }
    return 0;
  }};
  bottom: 0;
  background-color: rgba(44,62,80 ,0.2);
  display: flex;
  z-index: 999;
  overflow-x: hidden;
  transition: top 0.2s ease-out;
`;

export default Modal;