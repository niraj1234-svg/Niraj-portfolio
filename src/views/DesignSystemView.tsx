import React, { useState, useEffect } from 'react';
import kalaImg from '../assets/portfolio-kala.svg';

interface SectionIndexItem {
  id: string;
  name: string;
  desc: string;
}

const SECTIONS: SectionIndexItem[] = [
  { id: 'ds-colour', name: 'Colour', desc: 'Semantic tokens and swatches' },
  { id: 'ds-type', name: 'Typography', desc: 'Faces, scale and headings' },
  { id: 'ds-space', name: 'Space & depth', desc: 'Spacing, radius, elevation' },
  { id: 'ds-actions', name: 'Actions', desc: 'Buttons, links, status, pills' },
  { id: 'ds-controls', name: 'Controls', desc: 'Segmented nav and loading' },
  { id: 'ds-content', name: 'Content', desc: 'Index rows and cards' },
  { id: 'ds-nav', name: 'Navigation & icons', desc: 'Rack blades, icon set' },
  { id: 'ds-motion', name: 'Motion', desc: 'Keyframes and reduced motion' },
  { id: 'ds-a11y', name: 'Accessibility', desc: 'Focus, contrast, semantics' },
  { id: 'ds-topology', name: 'Topology', desc: 'The infrastructure graph' },
];

const COLOR_GROUPS = [
  {
    label: 'Surface & background',
    tokens: [
      '--c-bg',
      '--c-surface',
      '--c-surface-alt',
      '--c-rack',
      '--c-border',
      '--c-border-ui',
      '--c-edge',
    ],
  },
  {
    label: 'Text',
    tokens: ['--c-text', '--c-heading', '--c-muted'],
  },
  {
    label: 'Accent',
    tokens: [
      '--c-accent',
      '--c-accent-light',
      '--c-accent-bright',
      '--c-accent-dark',
      '--c-accent-2',
      '--c-gradient',
    ],
  },
  {
    label: 'Semantic',
    tokens: ['--c-success', '--c-warning', '--c-error', '--c-dot-green'],
  },
  {
    label: 'State',
    tokens: ['--c-nav-hover', '--c-nav-active-bg', '--c-glow'],
  },
  {
    label: 'Shadow & skeleton',
    tokens: [
      '--c-shadow-sm',
      '--c-shadow-md',
      '--c-shadow-lg',
      '--color-skeleton-base',
      '--color-skeleton-shine',
    ],
  },
];

const TYPE_FACES = [
  {
    label: 'Display · --font-display',
    sample: 'Building reliable systems at scale. Engineer. Builder. Entrepreneur.',
    modifier: 'display',
  },
  {
    label: 'Body · --font-body',
    sample: 'The quick brown fox jumps over the lazy dog. 0123456789',
    modifier: 'body',
  },
  {
    label: 'Mono · --font-mono',
    sample: 'const status = "operational"',
    modifier: 'mono',
  },
];

const TYPE_SCALES = [
  { token: '--font-3xs', px: '9px', role: 'Micro badges' },
  { token: '--font-2xs', px: '10px', role: 'Micro labels' },
  { token: '--font-xs', px: '11px', role: 'Tiny labels, mono meta' },
  { token: '--font-sm', px: '12px', role: 'Captions, badges' },
  { token: '--font-btn', px: '13px', role: 'CTA, back-link' },
  { token: '--font-body-sm', px: '14px', role: 'Secondary body, bullets' },
  { token: '--font-base', px: '16px', role: 'Body' },
  { token: '--font-md', px: '17px', role: 'Lead paragraphs' },
  { token: '--font-lg', px: '18px', role: 'Card, entry titles' },
  { token: '--font-xl', px: '20px', role: 'Sub-section headings' },
  { token: '--font-2xl', px: '22px', role: 'Header identity' },
  { token: '--font-3xl', px: '24px', role: 'Section headings' },
  { token: '--font-5xl', px: '32px', role: 'Page title (h1)' },
];

const SPACING_TOKENS = [
  { rem: '0.25rem', px: '4px' },
  { rem: '0.375rem', px: '6px' },
  { rem: '0.5rem', px: '8px' },
  { rem: '0.75rem', px: '12px' },
  { rem: '1rem', px: '16px' },
  { rem: '1.25rem', px: '20px' },
  { rem: '1.5rem', px: '24px' },
  { rem: '2rem', px: '32px' },
  { rem: '2.5rem', px: '40px' },
];

const RADIUS_TOKENS = [
  { value: '4px', use: 'Tags, inline code' },
  { value: '6px', use: 'Skeleton bars, error nav' },
  { value: '8px', use: 'Controls, segmented nav' },
  { value: '12px', use: 'Cards, panels, code blocks' },
  { value: '14px', use: 'Featured row, diagram shell' },
  { value: '20px', use: 'Page shell' },
  { value: '999px', use: 'Pills and chips' },
];

const ELEVATION_TOKENS = [
  { token: '--elevation-surface', use: 'Resting surface', modifier: 'surface' },
  { token: '--elevation-raised', use: 'Card hover', modifier: 'raised' },
  { token: '--elevation-floating', use: 'Tooltip, modal', modifier: 'floating' },
  { token: '--elevation-dock', use: 'Bottom dock', modifier: 'dock' },
  { token: '--elevation-drawer', use: 'Expanded drawer', modifier: 'drawer' },
];

const MOTION_TOKENS = [
  { name: 'boxEntrance', dur: '0.55s', easing: 'ease both', use: 'Page and card entrance' },
  { name: 'signalFadeIn', dur: '0.5s', easing: 'ease forwards', use: 'Header signal wash' },
  { name: 'blink-dot', dur: '2.2s', easing: 'ease-in-out infinite', use: 'Availability dot' },
  { name: 'scroll', dur: '30s', easing: 'linear infinite', use: 'Client logo marquee' },
  { name: 'skeleton-sweep', dur: '1.4s', easing: 'ease-in-out infinite', use: 'Skeleton shimmer' },
  { name: 'terminal-line-in', dur: '0.16s', easing: 'ease', use: 'New terminal row' },
  { name: 'terminal-shimmer', dur: '1.4s', easing: 'linear infinite', use: 'Terminal skeleton' },
  { name: 'blink', dur: '1s', easing: 'step-end infinite', use: 'Terminal caret' },
];

const REDUCED_MOTION_CODE = `@media (prefers-reduced-motion: reduce) {
  .reveal { animation: none; opacity: 1; transform: none; }
  .skeleton-line::after { animation: none; }
}`;

const FOCUS_A11Y_CODE = `*:focus-visible {
  border-radius: 4px;
  outline: 2px solid var(--c-accent);
  outline-offset: 3px;
}`;

const TOPO_NODES = [
  { key: 'runtime', tag: 'EDGE', label: 'Runtime', desc: 'Answers a request' },
  { key: 'build', tag: 'BUILD', label: 'Build', desc: 'Produces the artifact' },
  { key: 'external', tag: 'EMAIL', label: 'External', desc: 'Third-party service' },
];

const TOPO_EDGES = [
  { key: 'solid', label: 'Request-time', note: 'Solid · 1.2px' },
  { key: 'dashed', label: 'Build-time', note: 'Dashed · 5 4' },
  { key: 'dotted', label: 'Out-of-band', note: 'Dotted · 2 4' },
];

const GLYPHS: Record<string, string> = {
  x: '<path d="M4 4l11.733 16h4.267l-11.733-16z" /><path d="M4 20l6.768-6.768m2.464-2.464L20 4" />',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
  resume: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
  portfolio: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>',
  blog: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>',
  contact: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>',
  journey: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>',
  location: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>',
  'external-link': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>',
  check: '<polyline points="20 6 9 17 4 12"></polyline>',
  send: '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>',
  'chevron-down': '<polyline points="6 9 12 15 18 9"></polyline>',
  'arrow-left': '<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>',
  'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',
  search: '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
  archive: '<polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>',
  'message-circle': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
  info: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
  terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
};

export const DesignSystemView: React.FC = () => {
  const [computedColors, setComputedColors] = useState<Record<string, string>>({});
  const [isToggleActive, setIsToggleActive] = useState<boolean>(false);
  const [activeNavTab, setActiveNavTab] = useState<string>('stats');
  const [activeLocaleTab, setActiveLocaleTab] = useState<string>('en');

  // Live CSS variable computation reading current theme
  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return;
      const cs = getComputedStyle(document.documentElement);
      const map: Record<string, string> = {};
      COLOR_GROUPS.forEach((group) => {
        group.tokens.forEach((t) => {
          const val = cs.getPropertyValue(t).trim();
          map[t] = val.startsWith('linear-gradient')
            ? 'linear-gradient(142.17deg, …)'
            : val || 'not set';
        });
      });
      setComputedColors(map);
    };

    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="content ds-page">
      {/* Masthead Header */}
      <header className="ds-masthead reveal">
        <h1 className="title title--h1 title__separate">
          Design System<span className="title--tone">.</span>
        </h1>
        <p className="ds-masthead__lead">
          A live reference of the tokens and components that render this engineering portfolio. Every swatch reads the current theme; every specimen below is the component or class the site actually ships.
        </p>
        <p className="ds-masthead__meta">React · TypeScript · Vite</p>
      </header>

      {/* Index Navigation */}
      <nav className="ds-index reveal" aria-label="Sections">
        <ol className="ds-index__list">
          {SECTIONS.map((sec, idx) => (
            <li key={sec.id}>
              <a
                className="ds-index__item"
                href={`#${sec.id}`}
                onClick={(e) => handleSmoothScroll(e, sec.id)}
              >
                <span className="ds-index__num">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="ds-index__name">{sec.name}</span>
                <span className="ds-index__desc">{sec.desc}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Section 01: Colour */}
      <section className="ds-section reveal" id="ds-colour" aria-labelledby="h-colour">
        <div className="ds-section__head">
          <h2 id="h-colour" className="ds-section__title">
            Colour
          </h2>
          <p className="ds-section__note">
            Tokens flip between <code>:root</code> and <code>[data-theme="dark"]</code>. Prefer semantic tokens over raw hex, and keep one accent per surface.
          </p>
        </div>

        <div className="ds-color-groups">
          {COLOR_GROUPS.map((group) => (
            <article key={group.label} className="ds-color-group">
              <h3 className="ds-sub__title">{group.label}</h3>
              <ul className="ds-color-list">
                {group.tokens.map((token) => (
                  <li key={token} className="ds-color-row">
                    <span
                      className="ds-swatch"
                      style={{ background: `var(${token})` }}
                      aria-hidden="true"
                    />
                    <span className="ds-color-token">{token}</span>
                    <span className="ds-color-value">
                      {computedColors[token] || '…'}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Section 02: Typography */}
      <section className="ds-section reveal" id="ds-type" aria-labelledby="h-type">
        <div className="ds-section__head">
          <h2 id="h-type" className="ds-section__title">
            Typography
          </h2>
          <p className="ds-section__note">
            Three faces, one voice. Display for headings, Poppins for prose, mono for metadata and UI cues.
          </p>
        </div>

        <div className="ds-type-faces">
          {TYPE_FACES.map((face) => (
            <div key={face.label} className="ds-type-face">
              <span className="ds-label">{face.label}</span>
              <p
                className={`ds-type-face__sample ds-type-face__sample--${face.modifier}`}
              >
                {face.sample}
              </p>
            </div>
          ))}
        </div>

        <h3 className="ds-sub__title ds-sub__title--spaced">Scale</h3>
        <ul className="ds-scale">
          {TYPE_SCALES.map((scale) => (
            <li key={scale.token} className="ds-scale__row">
              <span className="ds-mono ds-scale__token">{scale.token}</span>
              <span className="ds-scale__meta">
                {scale.px} · {scale.role}
              </span>
              <span
                className="ds-scale__sample"
                style={{ fontSize: `var(${scale.token})` }}
              >
                {' '}Aa{' '}
              </span>
            </li>
          ))}
        </ul>

        <h3 className="ds-sub__title ds-sub__title--spaced">Headings</h3>
        <div className="ds-headings">
          <h1 className="title title--h1">h1 · title--h1</h1>
          <h2 className="title title--h2">h2 · title--h2</h2>
          <h3 className="title title--h3">h3 · title--h3</h3>
          <p className="ds-headings__body">
            Body copy at <code>--font-base</code>. Short paragraphs, restrained line lengths, generous rhythm.
          </p>
        </div>
      </section>

      {/* Section 03: Space & depth */}
      <section className="ds-section reveal" id="ds-space" aria-labelledby="h-space">
        <div className="ds-section__head">
          <h2 id="h-space" className="ds-section__title">
            Space &amp; depth
          </h2>
          <p className="ds-section__note">
            Spacing follows a rem rhythm. Elevation is theme-aware: the shadow primitives are tuned per theme and composed into semantic recipes.
          </p>
        </div>

        <div className="ds-split">
          <div>
            <h3 className="ds-sub__title">Spacing</h3>
            <ul className="ds-space">
              {SPACING_TOKENS.map((sp) => (
                <li key={sp.rem} className="ds-space__row">
                  <span className="ds-mono">{sp.rem}</span>
                  <span className="ds-space__px">{sp.px}</span>
                  <span
                    className="ds-space__bar"
                    style={{ width: sp.rem }}
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="ds-sub__title">Radius</h3>
            <ul className="ds-radius">
              {RADIUS_TOKENS.map((rad) => (
                <li key={rad.value} className="ds-radius__row">
                  <span
                    className="ds-radius__box"
                    style={{ borderRadius: rad.value }}
                    aria-hidden="true"
                  />
                  <span className="ds-mono">{rad.value}</span>
                  <span className="ds-radius__use">{rad.use}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="ds-sub__title ds-sub__title--spaced">Elevation</h3>
        <ul className="ds-elev">
          {ELEVATION_TOKENS.map((elev) => (
            <li
              key={elev.token}
              className={`ds-elev__card ds-elev__card--${elev.modifier}`}
            >
              <span className="ds-mono">{elev.token}</span>
              <span className="ds-elev__use">{elev.use}</span>
            </li>
          ))}
          <li className="ds-elev__card ds-elev__card--glow">
            <span className="ds-mono">--c-glow</span>
            <span className="ds-elev__use">Accent glow</span>
          </li>
        </ul>
      </section>

      {/* Section 04: Actions */}
      <section className="ds-section reveal" id="ds-actions" aria-labelledby="h-actions">
        <div className="ds-section__head">
          <h2 id="h-actions" className="ds-section__title">
            Actions
          </h2>
          <p className="ds-section__note">
            The CV button is a real component. Pills come from <code>BasePill.vue</code>, which every tag surface routes through.
          </p>
        </div>

        <div className="ds-specimens">
          <div className="ds-specimen">
            <span className="ds-label">CvDownloadButton · header</span>
            <div className="cv-group cv-group--header">
              <div
                className="cv-group__segments"
                role="group"
                aria-label="Download CV"
              >
                <button
                  type="button"
                  className="cv-btn cv-btn--main cv-btn--header"
                  aria-label="View Resume as PDF"
                >
                  <span className="cv-btn__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="app-icon"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </span>
                  <span className="cv-btn__text">VIEW RESUME</span>
                </button>
                <button
                  type="button"
                  className="cv-btn cv-btn--variant"
                  aria-label="View ATS-friendly Resume"
                  title="Plain CV, ATS-friendly"
                >
                  ATS
                </button>
              </div>
            </div>
          </div>

          <div className="ds-specimen">
            <span className="ds-label">.back-link</span>
            <a
              href="#ds-actions"
              className="back-link ds-back-link"
              onClick={(e) => e.preventDefault()}
            >
              <span className="back-link__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="app-icon"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </span>
              <span className="back-link__text">Back to all posts</span>
            </a>
          </div>
        </div>

        <h3 className="ds-sub__title ds-sub__title--spaced">Pills</h3>
        <ul className="ds-pill-specimens">
          <li className="ds-specimen">
            <span className="ds-label">.pill</span>
            <span className="pill">Default</span>
          </li>
          <li className="ds-specimen">
            <span className="ds-label">.pill--mono</span>
            <span className="pill pill--mono">mono</span>
          </li>
          <li className="ds-specimen">
            <span className="ds-label">.pill-sm</span>
            <span className="pill pill-sm">small</span>
          </li>
          <li className="ds-specimen">
            <span className="ds-label">.pill--active</span>
            <span className="pill pill--active">Active</span>
          </li>
          <li className="ds-specimen">
            <span className="ds-label">.pill--toggle</span>
            <button
              type="button"
              className={`pill pill--toggle ${isToggleActive ? 'pill--active' : ''}`}
              aria-pressed={isToggleActive}
              onClick={() => setIsToggleActive(!isToggleActive)}
            >
              Toggle
            </button>
          </li>
          <li className="ds-specimen">
            <span className="ds-label">.pill__count</span>
            <span className="pill">
              Docker <span className="pill__count">12</span>
            </span>
          </li>
        </ul>
      </section>

      {/* Section 05: Controls */}
      <section className="ds-section reveal" id="ds-controls" aria-labelledby="h-controls">
        <div className="ds-section__head">
          <h2 id="h-controls" className="ds-section__title">
            Controls
          </h2>
          <p className="ds-section__note">
            <code>SegmentedControl.vue</code> drives the resume and about section nav. <code>SkeletonLoader.vue</code> is the only loading state in the app; there are no spinners.
          </p>
        </div>

        <div className="ds-specimens ds-specimens--stack">
          <div className="ds-specimen ds-specimen--wide">
            <span className="ds-label">SegmentedControl · variant="nav"</span>
            <div className="ds-seg-specimen">
              <nav className="seg-control seg-control-nav" role="tablist">
                {[
                  { key: 'stats', label: 'Stats' },
                  { key: 'scope', label: 'Scope' },
                  { key: 'client', label: 'Client' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    className={`seg-control__seg ${activeNavTab === tab.key ? 'seg-control__seg--active' : ''}`}
                    role="tab"
                    aria-selected={activeNavTab === tab.key}
                    onClick={() => setActiveNavTab(tab.key)}
                  >
                    <span className="seg-control__seg-label">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="ds-specimen">
            <span className="ds-label">SegmentedControl · variant="locale"</span>
            <nav className="seg-control seg-control-locale" role="tablist">
              {[
                { key: 'en', label: 'EN' },
                { key: 'id', label: 'ID' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`seg-control__seg ${activeLocaleTab === tab.key ? 'seg-control__seg--active' : ''}`}
                  role="tab"
                  aria-selected={activeLocaleTab === tab.key}
                  onClick={() => setActiveLocaleTab(tab.key)}
                >
                  <span className="seg-control__seg-label">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="ds-specimen">
            <span className="ds-label">SkeletonLoader · line</span>
            <div className="ds-skeleton-stack">
              <div
                className="skeleton-line"
                style={{ width: '80%', height: '14px' }}
              />
              <div
                className="skeleton-line"
                style={{ width: '55%', height: '14px' }}
              />
            </div>
          </div>

          <div className="ds-specimen">
            <span className="ds-label">SkeletonLoader · card</span>
            <div className="ds-skeleton-card-slot">
              <div className="skeleton-card">
                <div className="skeleton-img" />
                <div className="skeleton-card__body">
                  <div className="skeleton-line skeleton-line-title" />
                  <div className="skeleton-line skeleton-line-short" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 06: Content */}
      <section className="ds-section reveal" id="ds-content" aria-labelledby="h-content">
        <div className="ds-section__head">
          <h2 id="h-content" className="ds-section__title">
            Content
          </h2>
          <p className="ds-section__note">
            Both specimens render real records from the site's own content. The index row is the blog and series entry; the card is the portfolio tile.
          </p>
        </div>

        <h3 className="ds-sub__title">Index row · BlogCard</h3>
        <a
          href="#ds-content"
          className="post-row"
          onClick={(e) => e.preventDefault()}
        >
          <div className="post-row__media">
            <div className="img-blur-wrap">
              <img
                className="post-row__img"
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=640&auto=format&fit=crop"
                alt="Cloud Networking Architecture"
                width="640"
                height="480"
                loading="lazy"
              />
            </div>
          </div>
          <div className="post-row__body">
            <p className="post-row__meta">
              <span>Oct 2026</span>
              <span className="post-row__sep" aria-hidden="true">
                ·
              </span>
              <span>8 min read</span>
              <span className="post-row__sep" aria-hidden="true">
                ·
              </span>
              <span>EN</span>
            </p>
            <h2 className="post-row__title">
              Connecting Cloud Infrastructure: Site-to-Site VPN &amp; Architecture Guide
            </h2>
            <p className="post-row__desc">
              Architecture principles and hands-on configuration for multi-region connectivity, encrypted tunneling, and high-availability routing.
            </p>
            <ul className="post-row__tags">
              <li>
                <span className="post-row__tag">AWS</span>
              </li>
              <li>
                <span className="post-row__tag">Networking</span>
              </li>
              <li>
                <span className="post-row__tag">Docker</span>
              </li>
            </ul>
          </div>
        </a>

        <h3 className="ds-sub__title ds-sub__title--spaced">
          Card · .portfolio-card
        </h3>
        <div className="ds-content-card">
          <article className="portfolio-card">
            <div className="portfolio-card__media">
              <img
                className="portfolio-card__img"
                src={kalaImg}
                alt="KALA — Production E-Commerce Platform"
                width="640"
                height="480"
                loading="lazy"
              />
            </div>
            <div className="portfolio-card__body">
              <span className="portfolio-card__category">Projects</span>
              <h4 className="portfolio-card__title">
                KALA — Production E-Commerce Platform
              </h4>
              <div className="portfolio-card__links">
                <a
                  className="portfolio-card__link portfolio-card__link--primary"
                  href="https://www.kalaofficial.store/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Store{' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="app-icon"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Section 07: Navigation & icons */}
      <section className="ds-section reveal" id="ds-nav" aria-labelledby="h-nav">
        <div className="ds-section__head">
          <h2 id="h-nav" className="ds-section__title">
            Navigation &amp; icons
          </h2>
          <p className="ds-section__note">
            <code>NavBlade.vue</code> renders every sidebar entry. Icons are stroke SVGs from the single <code>AppIcon.vue</code> map, drawn in <code>currentColor</code>.
          </p>
        </div>

        <div className="ds-split">
          <div>
            <h3 className="ds-sub__title">Rack blade</h3>
            <nav className="sidebar ds-rail" aria-label="Navigation specimen">
              <ul className="nav">
                <li className="nav__item">
                  <a
                    href="#about"
                    className="rack-nav__item rack-nav__item--active router-link-active"
                    onClick={(e) => e.preventDefault()}
                    title="About"
                  >
                    <span className="nav__icon">
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
                    </span>
                    <span className="nav__label">About</span>
                  </a>
                </li>
                <li className="nav__item">
                  <a
                    href="#portfolio"
                    className="rack-nav__item"
                    onClick={(e) => e.preventDefault()}
                    title="Portfolio"
                  >
                    <span className="nav__icon">
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
                    </span>
                    <span className="nav__label">Portfolio</span>
                  </a>
                </li>
                <li className="nav__item">
                  <a
                    href="#blog"
                    className="rack-nav__item"
                    onClick={(e) => e.preventDefault()}
                    title="Blog"
                  >
                    <span className="nav__icon">
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
                    </span>
                    <span className="nav__label">Blog</span>
                  </a>
                </li>
                <li className="nav__item">
                  <a
                    href="#contact"
                    className="rack-nav__item"
                    onClick={(e) => e.preventDefault()}
                    title="Contact"
                  >
                    <span className="nav__icon">
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
                    </span>
                    <span className="nav__label">Contact</span>
                  </a>
                </li>
              </ul>
            </nav>
            <p className="ds-note">
              Desktop rail only. Below 992px the same blades become the fixed bottom dock and drawer, so the specimen is hidden there rather than rendered in a state the site never shows.
            </p>
          </div>

          <div>
            <h3 className="ds-sub__title">
              Icon set · {Object.keys(GLYPHS).length} glyphs
            </h3>
            <ul className="ds-icons">
              {Object.entries(GLYPHS).map(([name, svgPath]) => (
                <li key={name} className="ds-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="app-icon"
                    dangerouslySetInnerHTML={{ __html: svgPath }}
                  />
                  <span className="ds-icon__name">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 08: Motion */}
      <section className="ds-section reveal" id="ds-motion" aria-labelledby="h-motion">
        <div className="ds-section__head">
          <h2 id="h-motion" className="ds-section__title">
            Motion
          </h2>
          <p className="ds-section__note">
            Motion is a signal, not decoration. Everything here collapses to a static state under <code>prefers-reduced-motion</code>, and nothing animates layout.
          </p>
        </div>

        <ul className="ds-motion">
          {MOTION_TOKENS.map((m) => (
            <li key={m.name} className="ds-motion__row">
              <span className="ds-mono ds-motion__name">{m.name}</span>
              <span className="ds-mono ds-motion__dur">{m.dur}</span>
              <span className="ds-motion__easing">{m.easing}</span>
              <span className="ds-motion__use">{m.use}</span>
            </li>
          ))}
        </ul>

        <pre className="ds-code">{REDUCED_MOTION_CODE}</pre>
      </section>

      {/* Section 09: Accessibility */}
      <section className="ds-section reveal" id="ds-a11y" aria-labelledby="h-a11y">
        <div className="ds-section__head">
          <h2 id="h-a11y" className="ds-section__title">
            Accessibility
          </h2>
          <p className="ds-section__note">
            WCAG AA at minimum. Automated checks are not enough; these rules still need manual testing with assistive technology.
          </p>
        </div>

        <div className="ds-split">
          <div className="ds-a11y">
            <div>
              <h3 className="ds-sub__title">Focus</h3>
              <p>
                Only <code>:focus-visible</code> draws a ring, so pointer users never see it and keyboard users always do.
              </p>
            </div>
            <pre className="ds-code">{FOCUS_A11Y_CODE}</pre>
          </div>

          <div className="ds-a11y">
            <div>
              <h3 className="ds-sub__title">Contrast</h3>
              <p>
                <code>--c-text</code> clears 7:1 on <code>--c-bg</code> in both themes. <code>--c-border-ui</code> clears 3:1 for control boundaries. Interactive text never sits below AA.
              </p>
            </div>
            <div>
              <h3 className="ds-sub__title">Hover and press</h3>
              <p>
                Hover effects are gated behind <code>(hover: hover) and (pointer: fine)</code>, so touch devices never get a stuck hover state. Presses nudge down by 1px rather than scaling the layout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Topology diagram */}
      <section className="ds-section reveal" id="ds-topology" aria-labelledby="h-topology">
        <div className="ds-section__head">
          <h2 id="h-topology" className="ds-section__title">
            Topology diagram
          </h2>
          <p className="ds-section__note">
            The <code>/infrastructure</code> graph. Three layers, one hue each: a node's marker and its edges take the layer colour, and line style carries timing. Nothing else in the diagram is coloured.
          </p>
        </div>

        <div className="ds-topo-grid">
          <div>
            <h3 className="ds-sub__title">Node · layer marker</h3>
            <ul className="ds-topo-nodes">
              {TOPO_NODES.map((n) => (
                <li key={n.key} className="ds-topo-node">
                  <span
                    className={`ds-topo-node__bar ds-topo-node__bar--${n.key}`}
                    aria-hidden="true"
                  />
                  <span className="ds-topo-node__tag">{n.tag}</span>
                  <span className="ds-topo-node__title">{n.label}</span>
                  <span className="ds-topo-node__desc">{n.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="ds-sub__title">Edge · line style</h3>
            <ul className="ds-topo-edges">
              {TOPO_EDGES.map((e) => (
                <li key={e.key} className="ds-topo-edge">
                  <span
                    className={`ds-topo-edge__line ds-topo-edge__line--${e.key}`}
                    aria-hidden="true"
                  />
                  <span className="ds-topo-edge__label">{e.label}</span>
                  <span className="ds-mono">{e.note}</span>
                </li>
              ))}
            </ul>
            <p className="ds-topo-note">
              Connectors render before nodes, so a line never covers a label. Geometry lives in the SVG's own <code>viewBox</code> user space, so the graph scales with its container instead of reflowing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
