import React from 'react';
import { createGlobalStyle } from 'styled-components';
import MainLayout from './layouts/MainLayout';
// import i18n
import './utils/i18n';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding:0;
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  }
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
