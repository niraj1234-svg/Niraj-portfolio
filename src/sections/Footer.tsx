import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/socials';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#06080b] border-t border-zinc-800/80 text-zinc-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-800/60">
          <div>
            <div className="flex items-center gap-2 text-zinc-100 font-bold text-sm tracking-wide">
              <Terminal size={15} className="text-sky-400" />
              <span>NIRAJ DHORE</span>
            </div>
            <p className="text-zinc-400 font-sans text-xs mt-1">
              Engineer. Builder. Entrepreneur. · DevOps & Cloud Engineer
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <a
              href={SOCIAL_LINKS.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors"
            >
              LeetCode
            </a>
            <span>·</span>
            <a
              href={SOCIAL_LINKS.kala.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors"
            >
              KALA
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors text-xs"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 text-[11px]">
          <div>
            © 2026 Niraj Dhore. All rights reserved.
          </div>
          <div className="text-zinc-600">
            Engineered with React, TypeScript & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
