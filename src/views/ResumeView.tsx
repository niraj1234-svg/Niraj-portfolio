import React, { useState, useEffect } from 'react';

interface ResumeViewProps {
  onOpenResumeModal: () => void;
  onNavigateToPortfolio?: () => void;
}

type EduFilter = 'all' | 'formal' | 'certifications';

export const ResumeView: React.FC<ResumeViewProps> = ({
  onOpenResumeModal,
  onNavigateToPortfolio,
}) => {
  const [activeSection, setActiveSection] = useState<
    'experience' | 'education' | 'competencies' | 'tools'
  >('experience');
  const [eduFilter, setEduFilter] = useState<EduFilter>('all');

  const scrollToSection = (
    id: 'experience' | 'education' | 'competencies' | 'tools'
  ) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Sync active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections: ('experience' | 'education' | 'competencies' | 'tools')[] = [
        'experience',
        'education',
        'competencies',
        'tools',
      ];
      const scrollPos = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="cv">
      {/* Header matching exact reference */}
      <header className="cv-header">
        <h1 className="title title--h1 first-title title__separate">
          Resume<span className="title--tone">.</span>
        </h1>
        <p className="cv-header__lede">
          Aspiring DevOps & Cloud Engineer and B.Tech Information Technology student at Guru Ghasidas Vishwavidyalaya. Experienced in full-stack architecture, Linux environments, containerization, and cloud deployment.
        </p>

        {/* View / Print Resume Actions */}
        <div className="cv-header__actions">
          <div className="cv-group__segments" role="group" aria-label="Resume Actions">
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="cv-btn cv-btn--main"
              aria-label="View Printable Resume"
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
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </span>
              <span className="cv-btn__text">View Resume</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="cv-btn cv-btn--variant"
              aria-label="Print Resume"
              title="Print Resume"
            >
              PRINT
            </button>
          </div>
        </div>
      </header>

      {/* Segmented Control Navigation */}
      <nav
        className="seg-control seg-control-nav"
        role="tablist"
        aria-label="Resume sections"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeSection === 'experience'}
          onClick={() => scrollToSection('experience')}
          className={`seg-control__seg ${
            activeSection === 'experience' ? 'seg-control__seg--active' : ''
          }`}
        >
          <span className="seg-control__seg-label">EXP.</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeSection === 'education'}
          onClick={() => scrollToSection('education')}
          className={`seg-control__seg ${
            activeSection === 'education' ? 'seg-control__seg--active' : ''
          }`}
        >
          <span className="seg-control__seg-label">EDUC.</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeSection === 'competencies'}
          onClick={() => scrollToSection('competencies')}
          className={`seg-control__seg ${
            activeSection === 'competencies' ? 'seg-control__seg--active' : ''
          }`}
        >
          <span className="seg-control__seg-label">SKILLS</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeSection === 'tools'}
          onClick={() => scrollToSection('tools')}
          className={`seg-control__seg ${
            activeSection === 'tools' ? 'seg-control__seg--active' : ''
          }`}
        >
          <span className="seg-control__seg-label">TOOLS</span>
        </button>
      </nav>

      {/* Section 01: Experience */}
      <section id="experience" className="cv-section">
        <header className="cv-head">
          <span className="cv-head__index" aria-hidden="true">
            01
          </span>
          <h2 className="cv-head__title">Experience</h2>
        </header>

        {/* KALA Co-Founder */}
        <article className="cv-entry">
          <div className="cv-entry__rail">
            <span className="cv-entry__period">2026 – Present</span>
            <span>Present</span>
            <span>Bilaspur, India</span>
          </div>
          <div className="cv-entry__body">
            <h3 className="cv-entry__role">Co-Founder</h3>
            <p className="cv-entry__org">KALA</p>
            <ul className="cv-entry__points">
              <li className="cv-entry__point">
                Engineered and launched production full-stack e-commerce platform for KALA, a print-on-demand customized sportswear business.
              </li>
              <li className="cv-entry__point">
                Built responsive product catalogue, search, filtering, shopping cart, authentication, order placement, and order management.
              </li>
              <li className="cv-entry__point">
                Automated Razorpay payment integration, server-side pricing calculations, shipping fee computation, and order notifications.
              </li>
              <li className="cv-entry__point">
                Orchestrated multi-tier cloud deployment: React/TypeScript frontend on Vercel, Node.js/Express API on Render, and MongoDB Atlas database.
              </li>
            </ul>
            <ul className="cv-entry__stack cv-chips cv-chips--outline">
              <li className="cv-chips__item">React</li>
              <li className="cv-chips__item">TypeScript</li>
              <li className="cv-chips__item">Vite</li>
              <li className="cv-chips__item">Tailwind CSS</li>
              <li className="cv-chips__item">Node.js</li>
              <li className="cv-chips__item">Express</li>
              <li className="cv-chips__item">MongoDB Atlas</li>
              <li className="cv-chips__item">Vercel</li>
              <li className="cv-chips__item">Render</li>
              <li className="cv-chips__item">Git</li>
              <li className="cv-chips__item">GitHub</li>
            </ul>
          </div>
        </article>

        {/* GFG Chapter GGV - Lead */}
        <article className="cv-entry">
          <div className="cv-entry__rail">
            <span className="cv-entry__period">Dec 2025 – Present</span>
            <span>Present</span>
            <span>Bilaspur, India</span>
          </div>
          <div className="cv-entry__body">
            <h3 className="cv-entry__role">Lead — Game Development Team</h3>
            <p className="cv-entry__org">GFG Chapter GGV</p>
            <ul className="cv-entry__points">
              <li className="cv-entry__point">
                Leading technical roadmap and collaborative game development initiatives across the student engineering chapter.
              </li>
              <li className="cv-entry__point">
                Conducting technical workshops and mentoring peers in Unity 3D engine, C# scripting, and modular architecture.
              </li>
            </ul>
            <ul className="cv-entry__stack cv-chips cv-chips--outline">
              <li className="cv-chips__item">Unity</li>
              <li className="cv-chips__item">C#</li>
              <li className="cv-chips__item">Git</li>
              <li className="cv-chips__item">Technical Leadership</li>
            </ul>
          </div>
        </article>

        {/* GFG Chapter GGV - Co-Lead */}
        <article className="cv-entry">
          <div className="cv-entry__rail">
            <span className="cv-entry__period">Dec 2024 – Aug 2025</span>
            <span>9 mos</span>
            <span>Bilaspur, India</span>
          </div>
          <div className="cv-entry__body">
            <h3 className="cv-entry__role">Co-Lead — Game Development Team</h3>
            <p className="cv-entry__org">GFG Chapter GGV</p>
            <ul className="cv-entry__points">
              <li className="cv-entry__point">
                Assisted team leads in organizing coding sprints, code reviews, and foundational game mechanics sessions.
              </li>
            </ul>
            <ul className="cv-entry__stack cv-chips cv-chips--outline">
              <li className="cv-chips__item">Unity</li>
              <li className="cv-chips__item">C#</li>
              <li className="cv-chips__item">Team Mentorship</li>
            </ul>
          </div>
        </article>

        {/* GDGC on Campus — GGV */}
        <article className="cv-entry">
          <div className="cv-entry__rail">
            <span className="cv-entry__period">Dec 2025 – Present</span>
            <span>Present</span>
            <span>Bilaspur, India</span>
          </div>
          <div className="cv-entry__body">
            <h3 className="cv-entry__role">Game Development Co-Lead</h3>
            <p className="cv-entry__org">GDGC on Campus — GGV</p>
            <ul className="cv-entry__points">
              <li className="cv-entry__point">
                Co-leading game development community tracks under Google Developer Groups on Campus at GGV.
              </li>
              <li className="cv-entry__point">
                Collaborating on hackathons, developer discussions, and student innovation events.
              </li>
            </ul>
            <ul className="cv-entry__stack cv-chips cv-chips--outline">
              <li className="cv-chips__item">Unity</li>
              <li className="cv-chips__item">C#</li>
              <li className="cv-chips__item">Community Building</li>
              <li className="cv-chips__item">Git</li>
            </ul>
          </div>
        </article>
      </section>

      {/* Section 02: Education */}
      <section id="education" className="cv-section">
        <header className="cv-head">
          <span className="cv-head__index" aria-hidden="true">
            02
          </span>
          <h2 className="cv-head__title">Education</h2>
        </header>

        <div className="cv-filter">
          <button
            type="button"
            onClick={() => setEduFilter('all')}
            className={`pill pill--mono ${eduFilter === 'all' ? 'pill--active' : ''}`}
            aria-pressed={eduFilter === 'all'}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setEduFilter('formal')}
            className={`pill pill--mono ${eduFilter === 'formal' ? 'pill--active' : ''}`}
            aria-pressed={eduFilter === 'formal'}
          >
            Formal
          </button>
          <button
            type="button"
            onClick={() => setEduFilter('certifications')}
            className={`pill pill--mono ${eduFilter === 'certifications' ? 'pill--active' : ''}`}
            aria-pressed={eduFilter === 'certifications'}
          >
            Achievements
          </button>
        </div>

        {/* Formal Education */}
        {(eduFilter === 'all' || eduFilter === 'formal') && (
          <div className="cv-edu-group">
            <h3 className="cv-subhead">Formal education</h3>
            <article className="cv-entry">
              <div className="cv-entry__rail">
                <span className="cv-entry__period">2024 – 2027</span>
                <span>CGPA: 8.52</span>
              </div>
              <div className="cv-entry__body">
                <h3 className="cv-entry__role">Guru Ghasidas Vishwavidyalaya</h3>
                <p className="cv-entry__org">B.Tech Information Technology</p>
                <p className="cv-entry__note">
                  Central University · Bilaspur, Chhattisgarh, India. Focus on core systems: Operating Systems, Computer Networks, Database Management Systems, Linux Administration, and Software Engineering.
                </p>
              </div>
            </article>
          </div>
        )}

        {/* Achievements & Certifications */}
        {(eduFilter === 'all' || eduFilter === 'certifications') && (
          <div className="cv-edu-group">
            <h3 className="cv-subhead">Achievements &amp; Certifications</h3>
            <article className="cv-entry">
              <div className="cv-entry__rail">
                <span className="cv-entry__period">2025</span>
                <span>MIC Hackathon</span>
              </div>
              <div className="cv-entry__body">
                <h3 className="cv-entry__role">Smart India Hackathon 2025</h3>
                <p className="cv-entry__org">Ministry of Education's Innovation Cell (MIC)</p>
                <p className="cv-entry__note">
                  Participation — National level competition solving complex technological challenges with full-stack architecture, deployment pipelines, and engineering teamwork.
                </p>
              </div>
            </article>

            <article className="cv-entry">
              <div className="cv-entry__rail">
                <span className="cv-entry__period">2024</span>
                <span>Sustainability</span>
              </div>
              <div className="cv-entry__body">
                <h3 className="cv-entry__role">SUSTAIN-A-THON 2024</h3>
                <p className="cv-entry__org">Sustainability Innovation Challenge</p>
                <p className="cv-entry__note">
                  Participation — Hackathon focusing on scalable technology solutions, efficient resource models, and collaborative problem solving.
                </p>
              </div>
            </article>

            <article className="cv-entry">
              <div className="cv-entry__rail">
                <span className="cv-entry__period">2024</span>
                <span>Unity Technologies</span>
              </div>
              <div className="cv-entry__body">
                <h3 className="cv-entry__role">Unity Learn — 3D Beginner: Roll-a-Ball Game</h3>
                <p className="cv-entry__org">Unity Technologies</p>
                <p className="cv-entry__note">
                  Foundational 3D game development and physics simulation badge from Unity Learn, covering player controls, physics, and gameplay mechanics.
                </p>
              </div>
            </article>
          </div>
        )}
      </section>

      {/* Section 03: Core Competencies */}
      <section id="competencies" className="cv-section">
        <header className="cv-head">
          <span className="cv-head__index" aria-hidden="true">
            03
          </span>
          <h2 className="cv-head__title">Core Competencies</h2>
        </header>
        <div className="cv-groups">
          <div>
            <h3 className="cv-group__label">DevOps &amp; Cloud</h3>
            <ul className="cv-group__list">
              <li className="cv-group__item">Linux Administration</li>
              <li className="cv-group__item">AWS Cloud Infrastructure</li>
              <li className="cv-group__item">Containerization &amp; Docker</li>
              <li className="cv-group__item">CI/CD Pipeline Automation</li>
              <li className="cv-group__item">Networking Protocols &amp; Firewalls</li>
            </ul>
          </div>
          <div>
            <h3 className="cv-group__label">Software Systems</h3>
            <ul className="cv-group__list">
              <li className="cv-group__item">Full-Stack Web Architecture</li>
              <li className="cv-group__item">RESTful API Design &amp; Integration</li>
              <li className="cv-group__item">Database Management (MongoDB)</li>
              <li className="cv-group__item">Game Development in Unity (C#)</li>
            </ul>
          </div>
          <div>
            <h3 className="cv-group__label">Leadership &amp; Workflow</h3>
            <ul className="cv-group__list">
              <li className="cv-group__item">Version Control &amp; GitHub Workflows</li>
              <li className="cv-group__item">Student Team Mentorship</li>
              <li className="cv-group__item">Cross-functional Collaboration</li>
              <li className="cv-group__item">Problem Diagnosis &amp; Optimization</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 04: Tools & Technologies */}
      <section id="tools" className="cv-section">
        <header className="cv-head">
          <span className="cv-head__index" aria-hidden="true">
            04
          </span>
          <h2 className="cv-head__title">Tools &amp; Technologies</h2>
        </header>
        <div className="cv-tools">
          <div>
            <h3 className="cv-tools__label">Primary Technologies</h3>
            <ul className="cv-chips">
              <li className="cv-chips__item">Linux</li>
              <li className="cv-chips__item">AWS</li>
              <li className="cv-chips__item">Docker</li>
              <li className="cv-chips__item">CI/CD</li>
              <li className="cv-chips__item">Networking</li>
              <li className="cv-chips__item">Git</li>
              <li className="cv-chips__item">GitHub</li>
              <li className="cv-chips__item">Bash</li>
            </ul>
          </div>
          <div>
            <h3 className="cv-tools__label">Additional Stack</h3>
            <ul className="cv-chips">
              <li className="cv-chips__item">Unity</li>
              <li className="cv-chips__item">C#</li>
              <li className="cv-chips__item">React</li>
              <li className="cv-chips__item">TypeScript</li>
              <li className="cv-chips__item">Node.js</li>
              <li className="cv-chips__item">MongoDB</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Outro Link matching reference */}
      <div className="cv-outro">
        <a
          href="#portfolio"
          onClick={(e) => {
            if (onNavigateToPortfolio) {
              e.preventDefault();
              onNavigateToPortfolio();
            }
          }}
          className="cv-outro__link"
        >
          <span>See the DevOps Cloud portfolio</span>
          <span className="cv-outro__arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </div>
  );
};
