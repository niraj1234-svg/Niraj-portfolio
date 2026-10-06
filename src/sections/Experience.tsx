import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { EXPERIENCES } from '../data/experience';
import { Calendar, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-b border-zinc-800/80 bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="// 04"
          badge="ROLES & IMPACT"
          title="EXPERIENCE & LEADERSHIP"
          subtitle="Real venture engineering combined with student developer community leadership."
        />

        <div className="relative border-l border-zinc-800 ml-4 sm:ml-6 space-y-10 pl-6 sm:pl-8">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                  exp.type === 'Work'
                    ? 'bg-sky-500 border-[#090b10] ring-4 ring-sky-500/20'
                    : 'bg-zinc-700 border-[#090b10] ring-4 ring-zinc-800/60'
                }`}
              />

              {/* Content Card */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-zinc-800 hover:border-zinc-700 transition-all space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {exp.type === 'Work' ? 'VENTURE / WORK' : 'STUDENT LEADERSHIP'}
                      </span>
                      {exp.isCurrent && (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mt-2">
                      {exp.role}
                    </h3>
                    <div className="text-sky-400 font-mono text-xs sm:text-sm font-medium mt-0.5">
                      {exp.organization}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                    <Calendar size={13} className="text-zinc-500" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                  {exp.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-sky-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
