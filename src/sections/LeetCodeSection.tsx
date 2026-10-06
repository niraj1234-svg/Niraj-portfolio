import React from 'react';
import { Code2, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/socials';

export const LeetCodeSection: React.FC = () => {
  return (
    <section id="problem-solving" className="py-16 border-b border-zinc-800/80 bg-[#0d1117]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1117] border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="font-mono text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 size={14} />
              Data Structures & Algorithms
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
              PROBLEM SOLVING & LEETCODE
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              Practicing fundamental algorithmic thinking, data structures, and computational complexity on LeetCode to reinforce core software engineering principles.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 rounded-xl bg-[#12161f] border border-zinc-800 font-mono text-xs text-zinc-300">
              <span className="text-zinc-500 block text-[10px] uppercase">Handle:</span>
              <span className="text-amber-300 font-semibold">Niraj_009</span>
            </div>

            <a
              href={SOCIAL_LINKS.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-medium transition-colors whitespace-nowrap"
            >
              <span>View LeetCode Profile</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
