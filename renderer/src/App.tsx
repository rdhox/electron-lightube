import React from 'react';
import { createGlobalStyle } from 'styled-components';
import MainLayout from './layouts/MainLayout';
// import i18n
import './utils/i18n';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding:0;
  }
`;


function App() {
  return (
    <>
      <GlobalStyle />
      <MainLayout />
    </>
  );
}

export default App;
