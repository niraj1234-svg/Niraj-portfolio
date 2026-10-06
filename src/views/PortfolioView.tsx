import React, { useState, useEffect } from 'react';
import kalaImg from '../assets/portfolio-kala.svg';
import sihPalmImg from '../assets/portfolio-sih-palm-oil.svg';
import sih2025Img from '../assets/portfolio-sih-2025.svg';
import sustainImg from '../assets/portfolio-sustainathon.svg';
import unityImg from '../assets/portfolio-unity.svg';
import { api } from '../services/api';
import type { ProjectData, AchievementData } from '../services/api';

interface PortfolioViewProps {
  onOpenKalaModal: () => void;
}

type FilterCategory = 'all' | 'projects' | 'ongoing' | 'certifications';

// Fallback initial state ensuring instantaneous zero-flicker render
const INITIAL_PROJECTS: ProjectData[] = [
  {
    _id: '1',
    title: 'KALA — Production E-Commerce Platform',
    slug: 'kala-ecommerce-platform',
    category: 'Projects',
    description:
      'Production e-commerce platform for KALA, a print-on-demand sportswear business. Built and managed with React, TypeScript, Vite, Tailwind CSS, Node.js, Express and MongoDB, with product catalogue, search, filtering, cart, checkout, authentication, order placement, payment gateway and order management.',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'MongoDB Atlas',
      'Vercel',
      'Render',
      'Hostinger',
    ],
    image: kalaImg,
    liveUrl: 'https://www.kalaofficial.store/',
    githubUrl: 'https://github.com/niraj1234-svg/Kala-Front',
    featured: true,
    status: 'completed',
    order: 1,
  },
  {
    _id: '2',
    title: 'SIH 2026 — AI-Powered Import Impact Simulator for Palm Oil Tariffs',
    slug: 'sih-palm-oil-tariff-simulator',
    category: 'Ongoing',
    description:
      'Ongoing initiative addressing edible oil tariff optimizations for the Department of Food and Public Distribution. Simulating import duty dynamics, domestic consumer prices, and revenue impacts.',
    technologies: ['Python', 'FastAPI', 'Statistical Modeling', 'Docker'],
    image: sihPalmImg,
    liveUrl: '',
    githubUrl: '',
    featured: false,
    status: 'ongoing',
    order: 2,
  },
];

const INITIAL_ACHIEVEMENTS: AchievementData[] = [
  {
    _id: '1',
    title: 'Smart India Hackathon 2025',
    organization: "Ministry of Education's Innovation Cell (MIC)",
    date: '2025',
    description:
      'National level hackathon participation solving complex challenges with full-stack architecture, deployment pipelines, and engineering teamwork.',
    category: 'Certifications',
    image: sih2025Img,
  },
  {
    _id: '2',
    title: 'SUSTAIN-A-THON 2024',
    organization: 'Sustainability Innovation Challenge',
    date: '2024',
    description:
      'Participation in sustainability hackathon focusing on scalable technology solutions, efficient resource models, and collaborative problem solving.',
    category: 'Certifications',
    image: sustainImg,
  },
  {
    _id: '3',
    title: 'Unity Learn — 3D Beginner: Roll-a-Ball Game',
    organization: 'Unity Technologies',
    date: '2024',
    description:
      'Foundational 3D game development and physics simulation badge from Unity Learn, covering player controls, physics, and gameplay mechanics.',
    category: 'Certifications',
    image: unityImg,
  },
];

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onOpenKalaModal }) => {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [projects, setProjects] = useState<ProjectData[]>(INITIAL_PROJECTS);
  const [achievements, setAchievements] = useState<AchievementData[]>(INITIAL_ACHIEVEMENTS);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Fetch dynamic project list from backend API
    api
      .getProjects()
      .then((res) => {
        if (isMounted && res.success && res.data && res.data.length > 0) {
          const mapped = res.data.map((p) => ({
            ...p,
            image: p.slug === 'kala-ecommerce-platform' ? kalaImg : sihPalmImg,
          }));
          setProjects(mapped);
        }
      })
      .catch((err) => console.error('Projects fetch error:', err));

    // Fetch dynamic achievement list from backend API
    api
      .getAchievements()
      .then((res) => {
        if (isMounted && res.success && res.data && res.data.length > 0) {
          const mapped = res.data.map((a) => {
            let img = sih2025Img;
            if (a.title.includes('SUSTAIN') || a.image?.includes('sustain')) {
              img = sustainImg;
            } else if (a.title.includes('Unity') || a.image?.includes('unity')) {
              img = unityImg;
            }
            return {
              ...a,
              image: img,
            };
          });
          setAchievements(mapped);
        }
      })
      .catch((err) => console.error('Achievements fetch error:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle escape key and scroll lock for image lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedImage(null);
    };

    if (zoomedImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomedImage]);

  // Handle mouse move to set dynamic radial glow on card borders
  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--spot-x', `${x}px`);
    e.currentTarget.style.setProperty('--spot-y', `${y}px`);
  };

  const projectCount = projects.filter((p) => p.status === 'completed').length;
  const ongoingCount = projects.filter((p) => p.status === 'ongoing').length;
  const certCount = achievements.length;
  const totalCount = projects.length + achievements.length;

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'projects') return p.status === 'completed';
    if (filter === 'ongoing') return p.status === 'ongoing';
    return false;
  });

  const showAchievements = filter === 'all' || filter === 'certifications';
  const totalVisibleItems = filteredProjects.length + (showAchievements ? achievements.length : 0);

  return (
    <div>
      {/* Page Header: Exact Aditya Pratama Title, Tone Accent Dot & Underline */}
      <div className="pb-2">
        <h1 className="title title--h1 first-title title__separate">
          DevOps Cloud Engineer Portfolio<span className="title--tone">.</span>
        </h1>
        <p className="portfolio-intro">
          Production systems, live e-commerce engineering, and verified achievements. Projects cover architecture decisions, real deployments, and technical outcomes.
        </p>
      </div>

      {/* Filter Navigation Chips: Exact .pill .pill--mono .pill--active classes & badges */}
      <div className="portfolio-explore" role="group" aria-label="Filter portfolio by category">
        <div className="portfolio-explore__chips">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`pill pill--mono ${filter === 'all' ? 'pill--active' : ''}`}
            aria-pressed={filter === 'all'}
          >
            All <span className="pill__count">{totalCount}</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter('projects')}
            className={`pill pill--mono ${filter === 'projects' ? 'pill--active' : ''}`}
            aria-pressed={filter === 'projects'}
          >
            Projects <span className="pill__count">{projectCount}</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter('ongoing')}
            className={`pill pill--mono ${filter === 'ongoing' ? 'pill--active' : ''}`}
            aria-pressed={filter === 'ongoing'}
          >
            Ongoing <span className="pill__count">{ongoingCount}</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter('certifications')}
            className={`pill pill--mono ${filter === 'certifications' ? 'pill--active' : ''}`}
            aria-pressed={filter === 'certifications'}
          >
            Certifications <span className="pill__count">{certCount}</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {totalVisibleItems === 0 && (
        <div className="portfolio-empty">
          <h3 className="portfolio-empty__title">No items found</h3>
          <p className="portfolio-empty__body">There are currently no items under this category.</p>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className="pill pill--mono pill--active"
          >
            Show All Items
          </button>
        </div>
      )}

      {/* Grid of Portfolio Cards matching reference layout and responsive structure */}
      <div className="portfolio-grid">
        {/* Render Projects */}
        {filteredProjects.map((project) => {
          const isFeature = project.featured;

          return (
            <article
              key={project._id}
              className={`${isFeature ? 'portfolio-card--feature ' : ''}portfolio-card`}
              onMouseMove={handleCardMouseMove}
            >
              <div className="portfolio-card__media">
                <img
                  className="portfolio-card__img"
                  src={project.image || (isFeature ? kalaImg : sihPalmImg)}
                  alt={project.title}
                  loading="lazy"
                />
              </div>

              <div className="portfolio-card__body">
                <span className="portfolio-card__category">{project.category}</span>
                <h2 className="portfolio-card__title">{project.title}</h2>
                <p className="portfolio-card__desc">{project.description}</p>

                <div className="portfolio-card__links">
                  {isFeature ? (
                    <>
                      <button
                        type="button"
                        onClick={onOpenKalaModal}
                        className="portfolio-card__link portfolio-card__link--primary"
                        aria-label="View KALA project details"
                      >
                        View project{' '}
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
                      </button>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-card__link"
                        >
                          Website{' '}
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
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-card__link"
                        >
                          Github{' '}
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
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      )}
                    </>
                  ) : (
                    <span
                      className="portfolio-card__link font-mono text-xs uppercase tracking-wider font-semibold"
                      style={{ color: 'var(--c-warning)' }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--c-warning)',
                          marginRight: '6px',
                        }}
                      ></span>
                      ONGOING
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}

        {/* Render Achievements / Certifications */}
        {showAchievements &&
          achievements.map((item) => (
            <article
              key={item._id}
              className="portfolio-card"
              onMouseMove={handleCardMouseMove}
            >
              <div className="portfolio-card__media">
                <button
                  type="button"
                  className="zoomable-trigger"
                  aria-label={`Zoom certificate: ${item.title}`}
                  onClick={() =>
                    setZoomedImage({
                      src: item.image || sih2025Img,
                      alt: item.title,
                    })
                  }
                >
                  <img
                    className="portfolio-card__img"
                    src={item.image || sih2025Img}
                    alt={item.title}
                    loading="lazy"
                  />
                  <span className="zoomable-trigger__icon" aria-hidden="true">
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
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </span>
                </button>
              </div>

              <div className="portfolio-card__body">
                <span className="portfolio-card__category">{item.category}</span>
                <h2 className="portfolio-card__title">{item.title}</h2>
                <p className="portfolio-card__desc">{item.description}</p>
                <div className="portfolio-card__links">
                  <span className="portfolio-card__link">
                    {item.title.includes('Unity') ? 'Unity Badge' : 'Participation'}
                  </span>
                </div>
              </div>
            </article>
          ))}
      </div>

      {/* Lightbox / Zoom Modal for Certificates */}
      {zoomedImage && (
        <div
          className="zoomable-modal"
          onClick={() => setZoomedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged Certificate Image"
        >
          <button
            type="button"
            className="zoomable-modal__close"
            onClick={() => setZoomedImage(null)}
            aria-label="Close enlarged certificate"
          >
            ×
          </button>
          <img
            src={zoomedImage.src}
            alt={zoomedImage.alt}
            className="zoomable-modal__img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
