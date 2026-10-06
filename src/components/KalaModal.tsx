import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Server, Database, Globe, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { GitHubIcon } from './Icons';

interface KalaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KalaModal: React.FC<KalaModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'overview' | 'features' | 'impact'>('architecture');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#0d1117] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-[#12161f]">
          <div className="flex items-center gap-3">
            <StatusBadge status="LIVE / PRODUCTION" variant="green" pulse />
            <h3 className="font-semibold text-lg text-zinc-100 font-mono">
              KALA // Architecture & Deep Dive
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 bg-[#0d1117] px-5 gap-4 overflow-x-auto text-xs font-mono">
          {[
            { id: 'architecture', label: '01. Architecture' },
            { id: 'overview', label: '02. Role & Overview' },
            { id: 'features', label: '03. Features' },
            { id: 'impact', label: '04. Impact & Metrics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-3 border-b-2 font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-sky-400 text-sky-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm">
          {/* Quick Links Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#12161f] border border-zinc-800 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Globe size={14} className="text-sky-400" />
              <span>Domain: kalaofficial.store</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://www.kalaofficial.store/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-zinc-950 font-medium text-xs transition-colors shadow-sm"
              >
                <span>Live Website</span>
                <ExternalLink size={13} />
              </a>
              <a
                href="https://github.com/niraj1234-svg/Kala-Front"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs transition-colors border border-zinc-700"
              >
                <GitHubIcon size={13} />
                <span>Frontend Code</span>
              </a>
            </div>
          </div>

          {/* TAB 1: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-semibold text-zinc-100 mb-1 flex items-center gap-2">
                  <Layers size={16} className="text-sky-400" />
                  Production System Architecture
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Decoupled multi-tier deployment topology designed for low operational overhead and automated Git-based releases.
                </p>
              </div>

              {/* Visual Flowchart */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* Step 1: User & Domain */}
                <div className="bg-[#12161f] p-4 rounded-xl border border-zinc-800 relative">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400 mb-1">01 // Ingress</div>
                  <div className="flex items-center gap-2 font-semibold text-zinc-100 text-sm mb-1">
                    <Globe size={16} className="text-sky-400" />
                    Hostinger DNS
                  </div>
                  <p className="text-xs text-zinc-400">Custom domain routing & SSL certificate enforcement at DNS level.</p>
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                    <ArrowRight size={14} className="text-zinc-600" />
                  </div>
                </div>

                {/* Step 2: Frontend */}
                <div className="bg-[#12161f] p-4 rounded-xl border border-zinc-800 relative">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1">02 // Edge CDN</div>
                  <div className="flex items-center gap-2 font-semibold text-zinc-100 text-sm mb-1">
                    <Layers size={16} className="text-emerald-400" />
                    Vercel Frontend
                  </div>
                  <p className="text-xs text-zinc-400">React + Vite SPA distributed globally on Vercel's edge network.</p>
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                    <ArrowRight size={14} className="text-zinc-600" />
                  </div>
                </div>

                {/* Step 3: Backend API */}
                <div className="bg-[#12161f] p-4 rounded-xl border border-zinc-800 relative">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1">03 // Application API</div>
                  <div className="flex items-center gap-2 font-semibold text-zinc-100 text-sm mb-1">
                    <Server size={16} className="text-amber-400" />
                    Render Backend
                  </div>
                  <p className="text-xs text-zinc-400">Node.js & Express REST services handling orders, auth & payments.</p>
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                    <ArrowRight size={14} className="text-zinc-600" />
                  </div>
                </div>

                {/* Step 4: Database */}
                <div className="bg-[#12161f] p-4 rounded-xl border border-zinc-800">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 mb-1">04 // Data Tier</div>
                  <div className="flex items-center gap-2 font-semibold text-zinc-100 text-sm mb-1">
                    <Database size={16} className="text-indigo-400" />
                    MongoDB Atlas
                  </div>
                  <p className="text-xs text-zinc-400">Managed cloud NoSQL cluster storing catalogs, users, and customer orders.</p>
                </div>
              </div>

              {/* Architecture Technical Breakdown Table */}
              <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#161b22] text-zinc-400 border-b border-zinc-800">
                    <tr>
                      <th className="p-3 font-semibold">Tier</th>
                      <th className="p-3 font-semibold">Service</th>
                      <th className="p-3 font-semibold">Deployment & Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80 bg-[#0d1117] text-zinc-300">
                    <tr>
                      <td className="p-3 font-semibold text-sky-400">Frontend UI</td>
                      <td className="p-3">React, Vite, TypeScript, Tailwind</td>
                      <td className="p-3">Automated Git push deploy via Vercel CI</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-amber-400">API Backend</td>
                      <td className="p-3">Node.js, Express REST API</td>
                      <td className="p-3">Render Web Service with environment secrets</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-indigo-400">Database</td>
                      <td className="p-3">MongoDB Atlas (M0/M2 Cluster)</td>
                      <td className="p-3">IP access whitelisting, encrypted storage</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-emerald-400">Networking & DNS</td>
                      <td className="p-3">Hostinger DNS Manager</td>
                      <td className="p-3">CNAME & A-record pointing to Vercel and API endpoints</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW & ROLE */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-semibold text-zinc-100 mb-1">About the Business & System</h4>
                <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
                  KALA is a live print-on-demand athletic sportswear venture co-founded to deliver quality custom apparel directly to collegiate athletes and fitness enthusiasts. The web application serves as the central customer portal for browsing products, customizing apparel orders, handling payment verification, and routing order data directly to fulfillment teams.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#12161f] border border-zinc-800 space-y-3">
                <h5 className="font-mono text-xs font-semibold text-sky-400 uppercase tracking-wider">
                  My Role & Responsibilities
                </h5>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Platform Engineering:</strong> Developed and manage the responsive production storefront using React, Vite, and Tailwind CSS.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Deployment & Operations:</strong> Configured production deployment pipelines on Vercel and Render, ensuring continuous uptime during marketing campaigns.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>DNS & Infrastructure:</strong> Managed domain registrar settings, SSL security, and routing on Hostinger.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Business Execution:</strong> Co-manage inventory catalogs, order tracking with print suppliers, customer resolution, and digital marketing strategies.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-400">
                <span className="text-zinc-300 font-medium">Transparency note:</span> Modern AI-assisted development tools were leveraged to accelerate boilerplate creation, while core system integration, debugging, production deployment, and business operations were hands-on.
              </div>
            </div>
          )}

          {/* TAB 3: FEATURES */}
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Product Catalog & Search', desc: 'Category-filtered catalog with instant search across jerseys, shorts, and activewear.' },
                { title: 'Product Detail & Sizing', desc: 'Dynamic sizing chart, image gallery, stock status, and variant selector.' },
                { title: 'Cart & Session Persistence', desc: 'Local storage caching and seamless customer bag state during browsing.' },
                { title: 'Checkout & Payment Gateway', desc: 'Secure order checkout workflow capturing customer delivery and payment intent.' },
                { title: 'Order Management Workflow', desc: 'Centralized order tracking system for fulfillment status and customer updates.' },
                { title: 'Mobile First Optimization', desc: 'Designed for fluid performance across smartphones where 85%+ customer traffic originates.' },
              ].map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#12161f] border border-zinc-800">
                  <div className="flex items-center gap-2 font-semibold text-zinc-100 text-xs mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    {feat.title}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: IMPACT */}
          {activeTab === 'impact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#12161f] border border-zinc-800 text-center">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-sky-400">400–500</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Total Orders Processed</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#12161f] border border-zinc-800 text-center">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-400">20</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Live Active Products</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#12161f] border border-zinc-800 text-center">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-amber-400">99.8%</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Store Uptime</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#12161f] border border-zinc-800 text-center">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-indigo-400">2026</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Founded & Active</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#12161f] border border-zinc-800 space-y-2">
                <h5 className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Real Engineering Takeaways
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Building and running a production store provided direct operational lessons that simulated projects cannot replicate: resolving cross-origin resource sharing (CORS) between Vercel and Render, diagnosing cold starts on cloud containers, validating customer payment statuses against webhook drops, and optimizing bundle sizes for mobile customers on cell networks.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-zinc-800 bg-[#12161f] text-xs font-mono">
          <span className="text-zinc-500">Press ESC or click backdrop to close</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
