import React, { useState, useEffect } from 'react';

export const JourneyView: React.FC = () => {
  const [activeYear, setActiveYear] = useState<string>('2024');

  const scrollToYear = (year: string) => {
    setActiveYear(year);
    const element = document.getElementById(`year-${year}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const yearsList = ['2024', '2025', '2026'];
      const scrollPos = window.scrollY + 180;
      for (const y of yearsList) {
        const el = document.getElementById(`year-${y}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveYear(y);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="journey-page">
      {/* Exact Reference Header */}
      <header className="reveal">
        <h1 className="title title--h1 first-title title__separate">
          Journey<span className="title--tone">.</span>
        </h1>
        <p className="journey-meta">
          <span className="journey-meta__count">11</span> milestones{' '}
          <span className="journey-meta__dot" aria-hidden="true">
            ·
          </span>
          <span className="journey-meta__range">2024–2026</span>
        </p>
      </header>

      {/* Segmented Control Navigation: Jump to year */}
      <nav
        className="seg-control seg-control-nav journey-years"
        role="tablist"
        aria-label="Jump to year"
      >
        {['2024', '2025', '2026'].map((year) => (
          <button
            key={year}
            type="button"
            role="tab"
            aria-selected={activeYear === year}
            onClick={() => scrollToYear(year)}
            className={`seg-control__seg ${
              activeYear === year ? 'seg-control__seg--active' : ''
            }`}
          >
            <span className="seg-control__seg-label">{year}</span>
          </button>
        ))}
      </nav>

      {/* Timeline Chapters */}
      <div className="journey-log">
        {/* ========================================================
            CHAPTER 2024
            ======================================================== */}
        <section id="year-2024" className="journey-chapter reveal">
          <header className="journey-chapter__head">
            <h2 className="journey-chapter__year">2024</h2>
            <span className="journey-chapter__count">3 events</span>
          </header>

          <ol className="journey-chapter__events">
            <li className="journey-entry">
              <div className="journey-entry__rail">
                <time className="journey-entry__date" dateTime="2024-08-01">
                  Aug 2024
                </time>
              </div>
              <div className="journey-entry__text">
                <p>
                  Started <strong>B.Tech in Information Technology</strong> at{' '}
                  <strong>Guru Ghasidas Vishwavidyalaya</strong> (GGV), Bilaspur. Built core foundations in computing fundamentals, discrete mathematics, and programming logic.
                </p>
              </div>
            </li>

            <li className="journey-entry">
              <div className="journey-entry__rail">
                <time className="journey-entry__date" dateTime="2024-10-15">
                  Oct 2024
                </time>
              </div>
              <div className="journey-entry__text">
                <p>
                  Dived into game development with <strong>Unity 3D</strong> and{' '}
                  <strong>C#</strong>. Mastered player movement controllers, coordinate systems, physics simulation, rigid bodies, and interactive 3D environment design.
                </p>
              </div>
            </li>

            <li className="journey-entry">
              <div className="journey-entry__rail">
                <time className="journey-entry__date" dateTime="2024-12-01">
                  Dec 2024
                </time>
              </div>
              <div className="journey-entry__text">
                <p>
                  Appointed <strong>Co-Lead — Game Development Team</strong> at{' '}
                  <strong>GFG Chapter GGV</strong>. Supported campus tech workshops, guided junior peers in game mechanics, and organized collaborative build sessions (served through Aug 2025).
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* ========================================================
            CHAPTER 2025
            ======================================================== */}
        <section id="year-2025" className="journey-chapter reveal">
          <header className="journey-chapter__head">
            <h2 className="journey-chapter__year">2025</h2>
            <span className="journey-chapter__count">4 events</span>
          </header>

          <ol className="journey-chapter__events">
            <li className="journey-entry">
              <div className="journey-entry__rail">
                <time className="journey-entry__date" dateTime="2025-05-19">
                  May 2025
                </time>
              </div>
              <div className="journey-entry__text">
                <p>
                  Completed <strong>Unity Learn — 3D Beginner: Roll-a-Ball Game</strong> credential. Deepened understanding of object-oriented game logic, input management, player physics, and AI navigation.
                </p>
              </div>
            </li>

            <li className="journey-entry">
              <div className="journey-entry__rail">
                <time className="journey-entry__date" dateTime="2025-07-10">
                  Jul 2025
                </time>
              </div>
              <div className="journey-entry__text">
                <p>
                  Expanded technical breadth into <strong>Web Development & DSA</strong>. Mastered modern JavaScript, React component architectures, Node.js runtime, and systematic problem solving on LeetCode.
                </p>
              </div>
            </li>

            <li className="journey-entry">
              <div className="journey-entry__rail">
                <time className="journey-entry__date" dateTime="2025-09-20">
                  Sep 2025
                </time>
              </div>
              <div className="journey-entry__text">
                <p>
                  Participated in <strong>Smart India Hackathon 2025</strong> under the Ministry of Education's Innovation Cell (MIC), collaborating in a high-pressure team sprint on software architecture and rapid delivery.
                </p>
              </div>
            </li>

            <li className="journey-entry">
              <div className="journey-entry__rail">
                <time className="journey-entry__date" dateTime="2025-12-15">
                  Dec 2025
                </time>
              </div>
              <div className="journey-entry__text">
                <p>
                  Promoted to <strong>Lead — Game Development Team</strong> at <strong>GFG Chapter GGV</strong> and joined <strong>GDGC on Campus — GGV</strong> as <strong>Game Development Co-Lead</strong>, spearheading campus workshops, game dev tracks, and student hackathon mentorship.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* ========================================================
            CHAPTER 2026
            ======================================================== */}
        <section id="year-2026" className="journey-chapter reveal">
          <header className="journey-chapter__head">
            <h2 className="journey-chapter__year">2026</h2>
            <span className="journey-chapter__count">4 events</span>
          </header>

          <ol className="journey-chapter__events">
            <li className="journey-entry">
              <div className="journey-entry__rail">
                <time className="journey-entry__date" dateTime="2026-01-10">
                  Jan 2026
                </time>
              </div>
              <div className="journey-entry__text">
                <p>
                  Co-founded <strong>KALA</strong> (
                  <a
                    href="https://www.kalaofficial.store/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    kalaofficial.store
                  </a>
                  ), a print-on-demand customized sportswear business. Architected and launched the production e-commerce platform using React, TypeScript, Node.js, Express, MongoDB Atlas, and automated payment gateway webhooks.
                </p>
              </div>
            </li>

            <li className="journey-entry">
              <div className="journey-entry__rail">
                <time className="journey-entry__date" dateTime="2026-02-18">
                  Feb 2026
                </time>
              </div>
              <div className="journey-entry__text">
                <p>
                  Scaled KALA operations across website uptime, Vercel edge deployment, Render backend containers, MongoDB connection pooling, Hostinger DNS management, and end-to-end customer order processing.
                </p>
              </div>
            </li>

            <li className="journey-entry">
              <div className="journey-entry__rail">
                <time className="journey-entry__date" dateTime="2026-03-12">
                  Mar 2026
                </time>
              </div>
              <div className="journey-entry__text">
                <p>
                  Initiated <strong>SIH 2026 — AI-Powered Import Impact Simulator for Palm Oil Tariffs</strong> addressing econometric policy challenges for the Department of Food and Public Distribution (ongoing development).
                </p>
              </div>
            </li>

            <li className="journey-entry journey-entry--latest">
              <div className="journey-entry__rail">
                <time className="journey-entry__date" dateTime="2026-04-01">
                  Present
                </time>
                <span className="journey-entry__flag">Latest</span>
              </div>
              <div className="journey-entry__text">
                <p>
                  Deepened dedicated technical specialization into{' '}
                  <strong>DevOps & Cloud Engineering</strong>. Actively designing and operating infrastructure with <strong>Linux</strong>, <strong>AWS</strong> (EC2, S3, IAM, VPC), <strong>Docker</strong> containerization, networking protocols (TCP/IP, DNS, SSH, firewalls), Git/GitHub workflows, and automated <strong>CI/CD</strong> delivery pipelines.
                </p>
              </div>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
};
