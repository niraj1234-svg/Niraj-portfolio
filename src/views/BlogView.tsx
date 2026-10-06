import React, { useState, useMemo } from 'react';

interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  lang: string;
  tags: string[];
  imageUrl?: string;
  featured?: boolean;
}

const PREPARED_TOPICS = [
  { id: 'all', label: 'All' },
  { id: 'devops', label: 'DevOps' },
  { id: 'linux', label: 'Linux' },
  { id: 'aws', label: 'AWS' },
  { id: 'docker', label: 'Docker' },
  { id: 'networking', label: 'Networking' },
  { id: 'ci-cd', label: 'CI/CD' },
  { id: 'cloud', label: 'Cloud' },
];

export const BlogView: React.FC = () => {
  // Published articles store (currently empty as genuine articles are being prepared)
  const [articles] = useState<ArticleItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTopic, setActiveTopic] = useState<string>('all');
  const [activeYear] = useState<string>('2026');

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return PREPARED_TOPICS;
    const q = searchQuery.toLowerCase();
    return PREPARED_TOPICS.filter((t) => t.label.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <div className="content">
      {/* Reference Masthead Header */}
      <header className="index-masthead reveal">
        <h1 className="title title--h1 title__separate">
          Blog<span className="title--tone">.</span>
        </h1>
        <p className="index-masthead__lead">
          Field notes on cloud infrastructure, systems, and the web.
        </p>

        <div className="index-masthead__foot">
          <p className="index-masthead__stat">
            {articles.length} posts{' '}
            <span className="index-masthead__sep" aria-hidden="true">
              ·
            </span>{' '}
            2026
          </p>

          <div className="blog-search">
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
              className="app-icon blog-search__icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              className="blog-search__input"
              placeholder="Search topics or articles…"
              aria-label="Search articles…"
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                className="blog-search__clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Reference Toolbar: Archive Years & Topic Pills */}
      <nav className="index-toolbar reveal reveal-delay-1" aria-label="Blog filters">
        <ul className="index-toolbar__years">
          <li>
            <button
              type="button"
              className={`year-link ${activeYear === '2026' ? 'year-link-active' : ''}`}
            >
              2026
              <span className="year-link__count">Soon</span>
            </button>
          </li>
        </ul>

        <div className="index-toolbar__topics">
          {filteredTopics.map((topic) => {
            const isActive = activeTopic === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveTopic(topic.id)}
                className={`pill pill--mono ${isActive ? 'pill--active' : ''}`}
              >
                {topic.label}
                <span className="pill__count">Soon</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Results Container */}
      <div className="blog-results reveal reveal-delay-2">
        {articles.length > 0 ? (
          <div className="post-list">
            {articles.map((post) => (
              <article
                key={post.id}
                className={`post-row ${post.featured ? 'post-row-featured' : ''}`}
              >
                {post.imageUrl && (
                  <div className="post-row__media">
                    <img
                      className="post-row__img"
                      src={post.imageUrl}
                      alt={post.title}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="post-row__body">
                  <p className="post-row__meta">
                    <span>{post.date}</span>
                    <span className="post-row__sep" aria-hidden="true">
                      ·
                    </span>
                    <span>{post.readTime}</span>
                    <span className="post-row__sep" aria-hidden="true">
                      ·
                    </span>
                    <span>{post.lang}</span>
                  </p>
                  <h2 className="post-row__title">{post.title}</h2>
                  <p className="post-row__desc">{post.description}</p>
                  <ul className="post-row__tags">
                    {post.tags.map((tag) => (
                      <li key={tag}>
                        <span className="post-row__tag">{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Authentic Coming Soon State using Reference Visual Tokens */
          <div className="blog-coming-soon">
            <div className="blog-coming-soon__badge">
              <span className="blog-coming-soon__dot" aria-hidden="true"></span>
              Technical Notes in Preparation
            </div>

            <h2 className="blog-coming-soon__title">
              Hands-On Architecture & System Build Logs
            </h2>

            <p className="blog-coming-soon__desc">
              Currently preparing detailed technical write-ups and documentation on building and
              deploying real systems. Topics focus on Linux administration, AWS infrastructure,
              Docker containerization, networking fundamentals, and automated CI/CD pipelines.
            </p>

            <div className="blog-coming-soon__topics">
              <span className="blog-coming-soon__pill">DevOps</span>
              <span className="blog-coming-soon__pill">Linux</span>
              <span className="blog-coming-soon__pill">AWS</span>
              <span className="blog-coming-soon__pill">Docker</span>
              <span className="blog-coming-soon__pill">Networking</span>
              <span className="blog-coming-soon__pill">CI/CD</span>
              <span className="blog-coming-soon__pill">Cloud Engineering</span>
              <span className="blog-coming-soon__pill">Production Systems</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
