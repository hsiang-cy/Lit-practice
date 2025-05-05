import { LitElement, html } from 'lit';
import { appStyles } from '../styles/app-styles.js';
import './nav-bar.js';
import './side-bar.js';

export class AppShell extends LitElement {
  static styles = [appStyles];

  static properties = {
    sidebarOpen: { type: Boolean },
    currentPage: { type: String },
    navItems: { type: Array },
    sidebarItems: { type: Array },
    activeNavItem: { type: String },
    activeSidebarItem: { type: String },
    appTitle: { type: String },
    sidebarTitle: { type: String },
    footerText: { type: String }
  };

  constructor() {
    super();
    this.sidebarOpen = window.innerWidth > 768;
    this.currentPage = '歡迎使用';
    this.appTitle = 'Lit導航示例';
    this.sidebarTitle = '功能選單';
    this.footerText = `© ${new Date().getFullYear()} Lit演示`;
    
    // 導航項目
    this.navItems = [
      { id: 'home', text: '首頁', url: '#home' },
      { id: 'products', text: '產品', url: '#products' },
      { id: 'services', text: '服務', url: '#services' },
      { id: 'about', text: '關於我們', url: '#about' },
      { id: 'contact', text: '聯絡我們', url: '#contact' }
    ];
    
    // 側邊欄項目
    this.sidebarItems = [
      { id: 'dashboard', text: '儀表板', url: '#dashboard' },
      { id: 'profile', text: '個人資料', url: '#profile' },
      { id: 'settings', text: '設置', url: '#settings' },
      { id: 'messages', text: '訊息', url: '#messages' },
      { id: 'tasks', text: '任務', url: '#tasks' },
      { id: 'reports', text: '報告', url: '#reports' },
      { id: 'help', text: '幫助', url: '#help' }
    ];
    
    this.activeNavItem = 'home';
    this.activeSidebarItem = 'dashboard';
    
    // 監聽視窗大小變化
    window.addEventListener('resize', () => {
      this.sidebarOpen = window.innerWidth > 768;
    });
  }

  firstUpdated() {
    // 從URL哈希設置初始頁面
    this._handleLocationChange();
    window.addEventListener('hashchange', () => this._handleLocationChange());
  }

  _handleLocationChange() {
    const hash = window.location.hash.slice(1) || 'home';
    
    // 查找匹配的導航項
    const navItem = this.navItems.find(item => item.id === hash);
    if (navItem) {
      this.activeNavItem = hash;
      this.currentPage = navItem.text;
    }
    
    // 查找匹配的側邊欄項
    const sidebarItem = this.sidebarItems.find(item => item.id === hash);
    if (sidebarItem) {
      this.activeSidebarItem = hash;
      this.currentPage = sidebarItem.text;
    }
  }

  _toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  _handleNavItemClick(e) {
    const { item } = e.detail;
    this.activeNavItem = item.id;
    this.currentPage = item.text;
    window.location.hash = item.id;
    
    // 在移動端點擊後關閉側邊欄
    if (window.innerWidth <= 768) {
      this.sidebarOpen = false;
    }
  }

  _handleSidebarItemClick(e) {
    const { item } = e.detail;
    this.activeSidebarItem = item.id;
    this.currentPage = item.text;
    window.location.hash = item.id;
    
    // 在移動端點擊後關閉側邊欄
    if (window.innerWidth <= 768) {
      this.sidebarOpen = false;
    }
  }

  render() {
    return html`
      <nav-bar 
        .appTitle=${this.appTitle}
        .navItems=${this.navItems}
        .activeItem=${this.activeNavItem}
        @toggle-sidebar=${this._toggleSidebar}
        @nav-item-click=${this._handleNavItemClick}>
      </nav-bar>
      <div class="content-wrapper">
        <side-bar 
          ?open=${this.sidebarOpen}
          .items=${this.sidebarItems}
          .title=${this.sidebarTitle}
          .footerText=${this.footerText}
          .activeItem=${this.activeSidebarItem}
          @sidebar-item-click=${this._handleSidebarItemClick}>
        </side-bar>
        <main>
          <h1>${this.currentPage}</h1>
          <p>這是一個使用Lit建立的導航欄和側邊欄演示。</p>
          <p>您可以點擊頂部導航項目或側邊欄項目來導航。在小螢幕上，側邊欄會收起，可通過頂部的漢堡選單圖標開啟。</p>
          <p>所有內容都是動態的，可以通過應用配置來更改。</p>
        </main>
      </div>
    `;
  }
}

customElements.define('app-shell', AppShell);
