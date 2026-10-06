import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { SKILL_CATEGORIES } from '../data/skills';
import { StatusBadge } from '../components/StatusBadge';
import { Terminal, Filter } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredCategories =
    activeFilter === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeFilter);

  return (
    <section id="skills" className="py-20 border-b border-zinc-800/80 bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="// 02"
          badge="TECHNICAL COMPETENCIES"
          title="CORE SKILLS"
          subtitle="Honest, categorical proficiency indicators focused on infrastructure, networking topologies, and software development."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
          <span className="text-zinc-500 mr-2 flex items-center gap-1.5">
            <Filter size={13} />
            Filter:
          </span>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeFilter === 'all'
                ? 'bg-sky-500/10 border-sky-500/50 text-sky-300 font-semibold'
                : 'bg-[#12161f] border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
            }`}
          >
            All Categories ({SKILL_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)})
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                activeFilter === cat.id
                  ? 'bg-sky-500/10 border-sky-500/50 text-sky-300 font-semibold'
                  : 'bg-[#12161f] border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              {cat.title} ({cat.skills.length})
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="p-3.5 mb-8 rounded-xl bg-[#0d1117] border border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="text-zinc-400 flex items-center gap-2">
            <Terminal size={13} className="text-sky-400" />
            <span>Evaluation Criteria:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status="Strong" variant="green" />
            <span className="text-zinc-500 text-[11px]">— High autonomy & daily practice</span>
            <StatusBadge status="Working Knowledge" variant="blue" />
            <span className="text-zinc-500 text-[11px]">— Functional implementation experience</span>
            <StatusBadge status="Learning" variant="amber" />
            <span className="text-zinc-500 text-[11px]">— Active study & exploration</span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-10">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#0d1117] border border-zinc-800 space-y-6"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-sky-400">
                    CATEGORY {category.categoryNumber}
                  </span>
                  <span className="text-zinc-600">/</span>
                  <h3 className="font-mono text-base sm:text-lg font-bold text-zinc-100 tracking-wider">
                    {category.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 max-w-md font-sans">
                  {category.description}
                </p>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`p-3.5 rounded-xl border transition-all ${
                      skill.highlight
                        ? 'bg-[#12161f] border-zinc-700/80 hover:border-sky-500/50'
                        : 'bg-[#12161f]/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-zinc-100 text-sm">
                        {skill.name}
                      </span>
                      <StatusBadge status={skill.proficiency} />
                    </div>
                    {skill.note && (
                      <p className="text-[11px] text-zinc-400 line-clamp-2 font-mono">
                        {skill.note}
                      </p>
                    )}
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
