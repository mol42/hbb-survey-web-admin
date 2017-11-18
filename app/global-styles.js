import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .container {
    background-color: white;
  }

  .dummy-class {
    font-size: 22px;
  }

  .nav-tabs .nav-link {
    cursor: pointer;
  }
  
  .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: #464a4c;
    background-color: #f5f5f5;
    border-color: #ddd #ddd #fff;
  }
`;
