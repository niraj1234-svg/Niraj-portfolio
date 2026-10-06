import React from 'react';

export type NavTabId =
  | 'about'
  | 'portfolio'
  | 'resume'
  | 'journey'
  | 'blog'
  | 'contact'
  | 'terminal'
  | 'infrastructure'
  | 'design-system';

interface SidebarProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
}

interface NavItem {
  id: NavTabId;
  label: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const NAV_ITEMS: NavItem[] = [
    {
      id: 'about',
      label: 'ABOUT',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="app-icon"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
    },
    {
      id: 'portfolio',
      label: 'PORTFOLIO',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="app-icon"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
    },
    {
      id: 'resume',
      label: 'RESUME',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="app-icon"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
    },
    {
      id: 'journey',
      label: 'JOURNEY',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="app-icon"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
          <line x1="4" y1="22" x2="4" y2="15"></line>
        </svg>
      ),
    },
    {
      id: 'blog',
      label: 'BLOG',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="app-icon"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
    },
    {
      id: 'contact',
      label: 'CONTACT',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="app-icon"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
    },
    {
      id: 'terminal',
      label: 'TERMINAL',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="app-icon"
        >
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
      ),
    },
    {
      id: 'infrastructure',
      label: 'INFRASTRUCTURE',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="app-icon"
        >
          <polyline points="21 8 21 21 3 21 3 8"></polyline>
          <rect x="1" y="3" width="22" height="5"></rect>
          <line x1="10" y1="12" x2="14" y2="12"></line>
        </svg>
      ),
    },
    {
      id: 'design-system',
      label: 'DESIGN SYSTEM',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="app-icon"
        >
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
      ),
    },
  ];

  return (
    <aside className="col-12 col-md-12 rack-col">
      <nav
        className="sidebar box sticky-column rack-desktop box-entrance box-entrance--sidebar"
        aria-label="Main navigation"
      >
        <ul className="nav">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id} className="nav__item">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTab(item.id);
                  }}
                  className={`rack-nav__item ${
                    isActive ? 'router-link-active rack-nav__item--active' : ''
                  }`}
                  title={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="nav__icon">{item.icon}</span>
                  <span className="nav__label">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Sidebar Utilities matching Image 2 */}
        <div className="rack-utils">
          <button
            type="button"
            className="search-trigger"
            aria-label="Search Ctrl+K"
            title="Search (Ctrl+K)"
            onClick={() => onSelectTab('terminal')}
          >
            <span className="search-trigger__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="14"
                height="14"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <span className="search-trigger__label">SEARCH</span>
            <kbd className="search-trigger__kbd">CTRL+K</kbd>
          </button>

          <div className="locale-seg" role="radiogroup" aria-label="Language: EN">
            <button
              type="button"
              className="locale-seg__btn locale-seg__btn--active"
              aria-pressed="true"
              aria-label="English (EN)"
            >
              EN
            </button>
            <button
              type="button"
              className="locale-seg__btn"
              aria-pressed="false"
              aria-label="Indonesian (ID)"
            >
              ID
            </button>
          </div>

          <button
            type="button"
            className="theme-toggle"
            role="switch"
            aria-checked="true"
            aria-label="Dark / Light"
          >
            <span className="theme-toggle__icon">
              <svg
                className="theme-toggle__moon"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </span>
            <span className="theme-toggle__label">DARK</span>
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet scrollable bar */}
      <div className="rack-tablet">
        <nav className="sidebar box sticky-column tablet-bar" aria-label="Main navigation">
          <div className="tablet-nav">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTab(item.id);
                  }}
                  className={`tablet-nav__item ${
                    isActive ? 'tablet-nav__item--active' : ''
                  }`}
                  title={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="tablet-nav__icon">{item.icon}</span>
                  <span className="tablet-nav__label">{item.label}</span>
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
};
