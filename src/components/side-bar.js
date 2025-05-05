import { LitElement, html } from 'lit';
import { sidebarStyles } from '../styles/sidebar-styles.js';

export class SideBar extends LitElement {
  static styles = [sidebarStyles];

  static properties = {
    open: { type: Boolean, reflect: true },
    items: { type: Array },
    title: { type: String },
    footerText: { type: String },
    activeItem: { type: String }
  };

  constructor() {
    super();
    this.open = false;
    this.items = [];
    this.title = '側邊欄';
    this.footerText = `© ${new Date().getFullYear()}`;
    this.activeItem = '';
  }

  _handleItemClick(item, event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('sidebar-item-click', {
      bubbles: true,
      composed: true,
      detail: { item }
    }));
  }

  render() {
    return html`
      <div class="sidebar">
        <div class="sidebar-header">${this.title}</div>
        <ul>
          ${this.items.map(item => html`
            <li>
              <a href="${item.url}" 
                 class="${item.id === this.activeItem ? 'active' : ''}"
                 @click=${(e) => this._handleItemClick(item, e)}>
                ${item.text}
              </a>
            </li>
          `)}
        </ul>
        <div class="sidebar-footer">
          ${this.footerText}
        </div>
      </div>
    `;
  }
}

customElements.define('side-bar', SideBar);
