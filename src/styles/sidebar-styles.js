import { css } from 'lit';

export const sidebarStyles = css`
  :host {
    display: block;
    width: 250px;
    background-color: #f0f0f0;
    border-right: 1px solid #ddd;
    overflow-y: auto;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .sidebar-header {
    padding: 20px 15px;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0;
  }

  a {
    display: block;
    padding: 15px;
    color: #333;
    text-decoration: none;
    border-left: 3px solid transparent;
  }

  a:hover, a.active {
    background-color: #e5e5e5;
    border-left-color: #007bff;
  }

  .sidebar-footer {
    margin-top: auto;
    padding: 15px;
    border-top: 1px solid #ddd;
    font-size: 0.8rem;
    color: #777;
  }

  @media (max-width: 768px) {
    :host {
      position: fixed;
      left: -250px;
      height: calc(100vh - 60px);
      top: 60px;
      transition: left 0.3s ease;
      z-index: 100;
    }

    :host([open]) {
      left: 0;
    }
  }
`;
