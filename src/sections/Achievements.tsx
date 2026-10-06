import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ACHIEVEMENTS } from '../data/achievements';
import { Award, BookOpen } from 'lucide-react';

export const Achievements: React.FC = () => {
  const participationItems = ACHIEVEMENTS.filter((a) => a.type === 'PARTICIPATION');
  const learningItems = ACHIEVEMENTS.filter((a) => a.type === 'LEARNING');

  return (
    <section id="achievements" className="py-20 border-b border-zinc-800/80 bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="// 07"
          badge="VALIDATION & LEARNING"
          title="ACHIEVEMENTS & LEARNING"
          subtitle="Genuine hackathon participation and technical skill accreditations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Participation Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-wider pb-2 border-b border-zinc-800">
              <Award size={15} />
              <span>Hackathons & Challenges (Participation)</span>
            </div>

            <div className="space-y-3">
              {participationItems.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#0d1117] border border-zinc-800 hover:border-zinc-700 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-zinc-100">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {item.type}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-sky-400">
                    {item.issuer} {item.date ? `· ${item.date}` : ''}
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Accreditation Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider pb-2 border-b border-zinc-800">
              <BookOpen size={15} />
              <span>Foundational Course Accreditations</span>
            </div>

            <div className="space-y-3">
              {learningItems.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#0d1117] border border-zinc-800 hover:border-zinc-700 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-zinc-100">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                      COMPLETED
                    </span>
                  </div>

                  <div className="text-xs font-mono text-emerald-400">
                    {item.issuer} {item.date ? `· ${item.date}` : ''}
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              ))}

              {/* Note on forward certifications */}
              <div className="p-4 rounded-xl bg-[#12161f]/50 border border-dashed border-zinc-800 text-xs font-mono text-zinc-500">
                <span>Formal cloud certifications (AWS Solutions Architect / Certified Cloud Practitioner) are currently under active preparation and will be documented upon verification.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
