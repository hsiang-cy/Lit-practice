import { css } from 'lit';

export const navStyles = css`
  :host {
    display: block;
    width: 100%;
  }

  nav {
    background-color: #333;
    color: white;
    padding: 0 20px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-left: 20px;
  }

  a {
    color: white;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 4px;
  }

  a:hover {
    background-color: #555;
  }

  a.active {
    background-color: #007bff;
  }

  .menu-toggle {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .menu-toggle {
      display: block;
    }

    ul {
      display: none;
    }
  }
`;
