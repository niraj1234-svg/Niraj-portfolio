import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { JOURNEY_STAGES } from '../data/journey';
import { StatusBadge } from '../components/StatusBadge';
import { Compass, GitCommit } from 'lucide-react';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-20 border-b border-zinc-800/80 bg-[#0d1117]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="// 05"
          badge="LEARNING TO PRODUCTION"
          title="DEVOPS JOURNEY"
          subtitle="A structured, transparent roadmap from operating system fundamentals to production cloud deployments."
        />

        {/* Legend */}
        <div className="mb-10 p-4 rounded-xl bg-[#12161f] border border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-300">
            <Compass size={14} className="text-sky-400" />
            <span className="font-semibold uppercase tracking-wider">Milestone States:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <StatusBadge status="LEARNED" variant="green" />
              <span className="text-zinc-500 text-[11px]">Understood & verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <StatusBadge status="PRACTICED" variant="blue" />
              <span className="text-zinc-500 text-[11px]">Configured hands-on</span>
            </div>
            <div className="flex items-center gap-1.5">
              <StatusBadge status="BUILDING" variant="amber" />
              <span className="text-zinc-500 text-[11px]">Active live engineering</span>
            </div>
            <div className="flex items-center gap-1.5">
              <StatusBadge status="PLANNED" variant="purple" />
              <span className="text-zinc-500 text-[11px]">Forward roadmap</span>
            </div>
          </div>
        </div>

        {/* Timeline Stages Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOURNEY_STAGES.map((stage) => (
            <div
              key={stage.id}
              className="p-6 rounded-2xl bg-[#0d1117] border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-sky-400">
                    STAGE {stage.stageNumber}
                  </span>
                  <StatusBadge status={stage.status} />
                </div>

                <h3 className="font-mono text-base font-bold text-zinc-100 tracking-wide mb-2">
                  {stage.phase}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {stage.description}
                </p>
              </div>

              {/* Items List */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-2">
                {stage.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center gap-2 text-xs font-mono text-zinc-300"
                  >
                    <GitCommit size={12} className="text-sky-400/80 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
