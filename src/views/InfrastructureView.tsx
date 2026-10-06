import React, { useState, useMemo } from 'react';

interface StackLayer {
  n: string;
  category: 'systems' | 'cloud' | 'networking' | 'automation';
  layerType: 'runtime' | 'build' | 'external';
  title: string;
  desc: string;
  items: string[];
}

const STACK_LAYERS: StackLayer[] = [
  {
    n: '01',
    category: 'systems',
    layerType: 'runtime',
    title: 'Operating System',
    desc: 'Primary Unix/Linux environment powering system administration, development, and container runtimes.',
    items: ['Linux'],
  },
  {
    n: '02',
    category: 'cloud',
    layerType: 'runtime',
    title: 'Cloud Infrastructure',
    desc: 'Foundational cloud computing services for compute instances, storage, identity, and private network segmentation.',
    items: ['AWS'],
  },
  {
    n: '03',
    category: 'cloud',
    layerType: 'runtime',
    title: 'Containers',
    desc: 'Containerization technology for packaging applications, isolating dependencies, and standardizing environments.',
    items: ['Docker'],
  },
  {
    n: '04',
    category: 'automation',
    layerType: 'build',
    title: 'Version Control',
    desc: 'Distributed source code version control, repository management, and collaboration workflows.',
    items: ['Git', 'GitHub'],
  },
  {
    n: '05',
    category: 'automation',
    layerType: 'build',
    title: 'CI/CD Automation',
    desc: 'Automated continuous integration and delivery pipelines, build workflows, and deployment concepts.',
    items: ['CI/CD Pipelines', 'GitHub Actions / CI Concepts'],
  },
  {
    n: '06',
    category: 'networking',
    layerType: 'runtime',
    title: 'Networking & Protocols',
    desc: 'Fundamental computer networking concepts, traffic protocols, addressing models, and diagnosis tools.',
    items: [
      'IP Addressing',
      'Subnetting',
      'DNS',
      'HTTP / HTTPS',
      'TCP / UDP',
      'SSH',
      'Ports',
      'Firewall',
      'Routing',
      'NAT',
      'Load Balancer',
      'Reverse Proxy',
      'Ping',
      'Curl',
      'Netstat / SS',
      'Dig',
      'Nslookup',
      'Traceroute',
      'Wireshark',
      'Tcpdump',
    ],
  },
  {
    n: '07',
    category: 'systems',
    layerType: 'runtime',
    title: 'System & DevOps Administration',
    desc: 'Linux server management, process oversight, security permissions, daemon scheduling, and bash scripting.',
    items: [
      'Linux Administration',
      'Bash',
      'Process Management',
      'Permissions',
      'Users and Groups',
      'SSH',
      'Logs',
      'Storage',
      'Cron',
      'Shell Scripting',
    ],
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Layers' },
  { id: 'systems', label: 'Systems & OS' },
  { id: 'cloud', label: 'Cloud & Containers' },
  { id: 'networking', label: 'Networking' },
  { id: 'automation', label: 'CI/CD & Git' },
];

export const InfrastructureView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [copied, setCopied] = useState<boolean>(false);

  const filteredLayers = useMemo(() => {
    if (activeFilter === 'all') return STACK_LAYERS;
    return STACK_LAYERS.filter((layer) => layer.category === activeFilter);
  }, [activeFilter]);

  const copyPageUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="content infra-page">
      {/* Reference Masthead Header */}
      <header className="infra-masthead reveal">
        <h1 className="title title--h1 first-title title__separate">
          Infrastructure<span className="title--tone">.</span>
        </h1>
        <p className="infra-masthead__lead">
          The infrastructure and DevOps technologies, networking protocols, and systems concepts I
          am actively learning and working with hands-on.
        </p>

        <div className="infra-masthead__meta">
          <span className="infra-status">
            <span className="infra-status__dot" aria-hidden="true"></span> Active Learning & Labs
          </span>
          <span className="infra-masthead__sep" aria-hidden="true">
            ·
          </span>
          <span>DevOps & Cloud Focus</span>
          <span className="infra-masthead__sep" aria-hidden="true">
            ·
          </span>
          <span>Linux · AWS · Docker · Networking</span>
        </div>

        <button type="button" className="infra-action" onClick={copyPageUrl}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="app-icon"
            aria-hidden="true"
          >
            {copied ? (
              <polyline points="20 6 9 17 4 12"></polyline>
            ) : (
              <>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </>
            )}
          </svg>
          <span>{copied ? 'Copied' : 'Share URL'}</span>
        </button>
      </header>

      {/* Stack Section matching Reference */}
      <section className="infra-section reveal reveal-delay-1" aria-labelledby="infra-stack">
        <div className="infra-section__head">
          <h2 id="infra-stack" className="infra-section__title">
            Technical Stack
          </h2>
        </div>
        <p className="infra-hint">
          Detailed catalog of confirmed technologies and foundational concepts organized by layer.
        </p>

        {/* Filter Toolbar */}
        <div className="index-toolbar__topics my-4" style={{ marginBottom: '1.5rem' }}>
          {FILTER_TABS.map((tab) => {
            const count =
              tab.id === 'all'
                ? STACK_LAYERS.length
                : STACK_LAYERS.filter((l) => l.category === tab.id).length;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`pill pill--mono ${isActive ? 'pill--active' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                {tab.label}
                <span className="pill__count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Stack Index matching exact reference CSS */}
        <ol className="stack-index">
          {filteredLayers.map((layer) => (
            <li key={layer.n} className="stack-entry">
              <span className="stack-entry__index">{layer.n}</span>
              <div className="stack-entry__body">
                <h3 className="stack-entry__title">
                  <span
                    className={`stack-entry__bar ${
                      layer.layerType === 'build' ? 'stack-entry__bar--build' : ''
                    }`}
                    aria-hidden="true"
                  ></span>
                  {layer.title}
                </h3>
                <p className="stack-entry__desc">{layer.desc}</p>
              </div>
              <ul className="stack-entry__items">
                {layer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};
