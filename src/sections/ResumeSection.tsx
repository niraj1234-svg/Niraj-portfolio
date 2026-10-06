import React from 'react';
import { FileText, Eye, ShieldCheck } from 'lucide-react';

interface ResumeSectionProps {
  onOpenResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="resume" className="py-20 border-b border-zinc-800/80 bg-[#0d1117]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0d1117] border border-zinc-800 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="font-mono text-xs text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={14} />
              Curriculum Vitae
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
              RESUME<span className="text-sky-400">.</span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              A concise overview of my technical journey, projects, leadership, and experience. Structured specifically for technical recruiters, engineering managers, and cloud infrastructure leads.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold text-sm transition-all shadow-md shadow-sky-500/10 hover:shadow-sky-500/20"
              >
                <Eye size={16} />
                <span>VIEW RESUME</span>
              </button>

              <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                Truthful & verified credentials
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
