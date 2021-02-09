import { createGlobalStyle } from 'styled-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import theme from './theme.json';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme['primary-color']} !important;
  }
  .anticon {
    position: relative;
    top: -3px;
  }

  .ant-card-actions {
    border-radius: 8px;
  }
`;
