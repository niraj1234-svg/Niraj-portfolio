import React from 'react';
import profileImg from '../assets/profile.jpg';
import { SOCIAL_LINKS } from '../data/socials';

interface TopProfileCardProps {
  onViewResume: () => void;
}

export const TopProfileCard: React.FC<TopProfileCardProps> = ({ onViewResume }) => {
  return (
    <header className="header box box-entrance box-entrance--header">
      <div className="header__body">
        {/* LEFT SECTION: Profile Identity */}
        <div className="header-identity">
          <div className="header-identity__photo">
            <img
              className="header-identity__photo-img"
              src={profileImg}
              alt="Niraj Dhore"
              width="160"
              height="160"
            />
          </div>
          <div className="header-identity__info">
            <div className="header-identity__name">
              Niraj <span className="header-identity__name-surname">Dhore</span>
            </div>
            <div className="header-identity__role">DevOps &amp; Cloud Engineer</div>
          </div>
        </div>

        {/* MIDDLE SECTION: Availability */}
        <div className="header-signal">
          <div className="header-signal__title">Availability</div>
          <div className="header-signal__status">
            <span className="header-signal__dot" aria-hidden="true"></span>
            Open to internships &amp; opportunities
          </div>
          <p className="header-signal__meta">Currently building and learning</p>
        </div>

        {/* RIGHT SECTION: Contact / Actions */}
        <div className="header-action">
          <div className="cv-group cv-group--header">
            <div className="cv-group__segments" role="group" aria-label="View Resume">
              <button
                className="cv-btn cv-btn--main cv-btn--header"
                onClick={onViewResume}
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
                className="cv-btn cv-btn--variant"
                onClick={onViewResume}
                aria-label="View ATS-friendly Resume"
                title="Plain CV, ATS-friendly"
              >
                ATS
              </button>
            </div>
          </div>

          <a
            href={SOCIAL_LINKS.email.url}
            target="_blank"
            rel="noopener noreferrer"
            className="header-action__email"
            aria-label="Email: dhoreniraj83@gmail.com"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="app-icon"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            dhoreniraj83@gmail.com
          </a>

          <ul className="header-action__social" aria-label="Social media links">
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SOCIAL_LINKS.linkedin.url}
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="app-icon"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SOCIAL_LINKS.github.url}
                title="GitHub"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="app-icon"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SOCIAL_LINKS.leetcode.url}
                title="LeetCode"
                aria-label="LeetCode"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="app-icon"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.kalaofficial.store/"
                title="KALA"
                aria-label="KALA"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="app-icon"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
