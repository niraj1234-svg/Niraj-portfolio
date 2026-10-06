import React from 'react';
import { QUICK_STATS } from '../data/stats';
import { ShieldCheck } from 'lucide-react';

export const QuickStats: React.FC = () => {
  return (
    <section className="py-8 border-y border-zinc-800/80 bg-[#0d1117]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-400" />
            Verified Profile Markers
          </span>
          <span className="text-[11px] font-mono text-zinc-600">
            Truth-in-engineering metrics
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {QUICK_STATS.map((stat) => (
            <div
              key={stat.id}
              className="p-4 rounded-xl bg-[#12161f] border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="text-[10px] font-mono text-sky-400 uppercase tracking-wider mb-1">
                {stat.tag}
              </div>
              <div className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-100">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-zinc-300 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
