import React, { useState, useEffect } from 'react';

interface AboutViewProps {
  onNavigateToPortfolio: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigateToPortfolio,
}) => {
  const [activeSection, setActiveSection] = useState<'stats' | 'scope' | 'clients'>('stats');

  useEffect(() => {
    const handleScroll = () => {
      const scopeEl = document.getElementById('scope');
      const clientsEl = document.getElementById('clients');
      const scrollPos = window.scrollY + 180;

      if (clientsEl && clientsEl.offsetTop <= scrollPos) {
        setActiveSection('clients');
      } else if (scopeEl && scopeEl.offsetTop <= scrollPos) {
        setActiveSection('scope');
      } else {
        setActiveSection('stats');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id as any);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* Title with Signature Accent Underline */}
      <div className="pb-2">
        <h1 className="title title--h1 first-title title__separate">
          About Me<span className="title--tone">.</span>
        </h1>
      </div>

      {/* Profile Fact Sheet & Narrative */}
      <section id="story" className="about-story">
        <aside className="about-story__meta">
          <span className="about-story__kicker">Profile</span>
          <dl className="about-story__facts">
            <div className="about-story__fact">
              <dt>Role</dt>
              <dd>DevOps &amp; Cloud Engineer</dd>
            </div>
            <div className="about-story__fact">
              <dt>Location</dt>
              <dd>Bilaspur, CG, India</dd>
            </div>
            <div className="about-story__fact">
              <dt>Education</dt>
              <dd>B.Tech IT (GGV)</dd>
            </div>
            <div className="about-story__fact">
              <dt>Experience</dt>
              <dd>Co-Founder @ KALA</dd>
            </div>
          </dl>
        </aside>

        <div className="about-story__prose">
          <p className="about-story__lead">
            Information Technology undergraduate at Guru Ghasidas Vishwavidyalaya focused on DevOps and cloud infrastructure, Linux systems administration, containerization, and automated deployment pipelines.
          </p>
          <p>
            Co-Founder and Technology Lead at KALA, an active print-on-demand sportswear business. Architected and manage the production e-commerce platform across Vercel, Render, and MongoDB Atlas, handling live customer traffic, automated checkouts, and 500+ orders.
          </p>
          <p>
            Actively building practical infrastructure projects, mastering AWS cloud topologies, Docker virtualization, networking protocols (TCP/IP, DNS, HTTP/HTTPS, SSH), and automated CI/CD workflows with GitHub Actions.
          </p>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToPortfolio();
            }}
            className="about-story__link cursor-pointer"
          >
            <span>See the DevOps Cloud portfolio</span>
            <span className="about-story__link-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </section>

      {/* Segmented Control Navigation matching reference */}
      <nav className="seg-control seg-control-nav" role="tablist" aria-label="About sections">
        <button
          type="button"
          role="tab"
          aria-selected={activeSection === 'stats'}
          onClick={() => scrollToSection('stats')}
          className={`seg-control__seg ${activeSection === 'stats' ? 'seg-control__seg--active' : ''}`}
        >
          <span className="seg-control__seg-label">STATS</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeSection === 'scope'}
          onClick={() => scrollToSection('scope')}
          className={`seg-control__seg ${activeSection === 'scope' ? 'seg-control__seg--active' : ''}`}
        >
          <span className="seg-control__seg-label">SCOPE</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeSection === 'clients'}
          onClick={() => scrollToSection('clients')}
          className={`seg-control__seg ${activeSection === 'clients' ? 'seg-control__seg--active' : ''}`}
        >
          <span className="seg-control__seg-label">CLIENT</span>
        </button>
      </nav>

      {/* Track Record Stats */}
      <section id="stats" className="about-section">
        <header className="about-section__head">
          <h2 className="about-section__title">Track Record</h2>
        </header>
        <div className="about-stats">
          <a href="#journey" className="about-stat">
            <span className="about-stat__value">2027</span>
            <span className="about-stat__label">B.Tech IT (GGV)</span>
          </a>
          <a href="#portfolio" className="about-stat">
            <span className="about-stat__value">500+</span>
            <span className="about-stat__label">Total Orders (KALA)</span>
          </a>
          <a href="#resume" className="about-stat">
            <span className="about-stat__value">~60</span>
            <span className="about-stat__label">Website Orders</span>
          </a>
          <a href="#journey" className="about-stat">
            <span className="about-stat__value">2</span>
            <span className="about-stat__label">Tech Lead Roles</span>
          </a>
        </div>
      </section>

      {/* Areas of Work */}
      <section id="scope" className="about-section">
        <header className="about-section__head">
          <h2 className="about-section__title">Areas of Work</h2>
        </header>
        <div className="about-scope-grid">
          <div className="about-scope-grid__item">
            <article className="about-scope-card">
              <span className="about-scope-card__index" aria-hidden="true">
                01
              </span>
              <div className="about-scope-card__body">
                <div className="about-scope-card__head">
                  <h3 className="about-scope-card__title">DevOps &amp; Systems</h3>
                  <span className="about-scope-card__type">DEVOPS</span>
                </div>
                <p className="about-scope-card__desc">
                  Linux administration, containerization with Docker, Git branching workflows, CI/CD pipelines, and reliable automated deployments.
                </p>
              </div>
              <span className="about-scope-card__icon" aria-hidden="true">
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
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </span>
            </article>
          </div>

          <div className="about-scope-grid__item">
            <article className="about-scope-card">
              <span className="about-scope-card__index" aria-hidden="true">
                02
              </span>
              <div className="about-scope-card__body">
                <div className="about-scope-card__head">
                  <h3 className="about-scope-card__title">Cloud Engineering</h3>
                  <span className="about-scope-card__type">CLOUD</span>
                </div>
                <p className="about-scope-card__desc">
                  AWS cloud architecture, EC2, IAM governance, S3 storage, VPC networking, security groups, and multi-tier production deployment.
                </p>
              </div>
              <span className="about-scope-card__icon" aria-hidden="true">
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
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
              </span>
            </article>
          </div>

          <div className="about-scope-grid__item">
            <article className="about-scope-card">
              <span className="about-scope-card__index" aria-hidden="true">
                03
              </span>
              <div className="about-scope-card__body">
                <div className="about-scope-card__head">
                  <h3 className="about-scope-card__title">Infrastructure &amp; Networking</h3>
                  <span className="about-scope-card__type">INFRASTRUCTURE</span>
                </div>
                <p className="about-scope-card__desc">
                  Linux system administration, TCP/IP, DNS routing, HTTP/HTTPS, SSL/TLS, reverse proxies, firewalls, and production troubleshooting.
                </p>
              </div>
              <span className="about-scope-card__icon" aria-hidden="true">
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
              </span>
            </article>
          </div>

          <div className="about-scope-grid__item">
            <article className="about-scope-card">
              <span className="about-scope-card__index" aria-hidden="true">
                04
              </span>
              <div className="about-scope-card__body">
                <div className="about-scope-card__head">
                  <h3 className="about-scope-card__title">Automation &amp; CI/CD</h3>
                  <span className="about-scope-card__type">AUTOMATION</span>
                </div>
                <p className="about-scope-card__desc">
                  Deployment automation with Bash scripts, GitHub Actions workflows, configuration management, and DevOps operational excellence.
                </p>
              </div>
              <span className="about-scope-card__icon" aria-hidden="true">
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </span>
            </article>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="about-section">
        <header className="about-section__head">
          <h2 className="about-section__title">Clients</h2>
        </header>
        <div className="clients-scroll clients-scroll--static">
          <div className="clients-track--static clients-track">
            <a
              href="https://www.kalaofficial.store/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-client"
            >
              <span className="about-client__placeholder">K</span>
              <span className="about-client__name">KALA Sportswear</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
