import { LitElement, html } from 'lit';
import { navStyles } from '../styles/nav-styles.js';

export class NavBar extends LitElement {
  static styles = [navStyles];

  static properties = {
    appTitle: { type: String },
    navItems: { type: Array },
    activeItem: { type: String }
  };

  constructor() {
    super();
    this.appTitle = '應用標題';
    this.navItems = [];
    this.activeItem = '';
  }

  _toggleSidebar() {
    this.dispatchEvent(new CustomEvent('toggle-sidebar', {
      bubbles: true,
      composed: true
    }));
  }

  _handleNavClick(item, event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('nav-item-click', {
      bubbles: true,
      composed: true,
      detail: { item }
    }));
  }

  render() {
    return html`
      <nav>
        <div class="logo">${this.appTitle}</div>
        <div class="menu-toggle" @click=${this._toggleSidebar}>☰</div>
        <ul>
          ${this.navItems.map(item => html`
            <li>
              <a href="${item.url}" 
                 class="${item.id === this.activeItem ? 'active' : ''}"
                 @click=${(e) => this._handleNavClick(item, e)}>
                ${item.text}
              </a>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);
