import { css } from 'lit';

export const appStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content-wrapper {
    display: flex;
    flex: 1;
  }

  main {
    flex: 1;
    padding: 20px;
    background-color: #f9f9f9;
  }
`;
