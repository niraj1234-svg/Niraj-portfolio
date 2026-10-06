import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { PROJECTS } from '../data/projects';
import { StatusBadge } from '../components/StatusBadge';
import { ExternalLink, Layers, Server, Database, Globe } from 'lucide-react';
import { GitHubIcon } from '../components/Icons';

interface ProjectsProps {
  onOpenKalaModal: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenKalaModal }) => {
  return (
    <section id="projects" className="py-20 border-b border-zinc-800/80 bg-[#0d1117]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="// 03"
          badge="PRODUCTION & WORKFLOWS"
          title="SELECTED WORK"
          subtitle="Things I've built, deployed, and learned from."
        />

        {/* Featured Project: KALA */}
        {PROJECTS.filter((p) => p.id === 'kala').map((project) => (
          <div
            key={project.id}
            className="mb-12 rounded-2xl bg-[#0d1117] border border-zinc-700/80 hover:border-sky-500/40 transition-all p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden"
          >
            {/* Top Badge & Indicator */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <StatusBadge status={project.badge} variant="green" pulse />
                <span className="font-mono text-xs text-zinc-400">
                  FLAGSHIP PRODUCTION WORK
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={onOpenKalaModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-mono font-medium transition-colors"
                >
                  <Layers size={13} />
                  <span>View Architecture & Details</span>
                </button>
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-zinc-950 font-semibold text-xs transition-colors"
                  >
                    <span>Live Website</span>
                    <ExternalLink size={13} />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors border border-zinc-700"
                  >
                    <GitHubIcon size={13} />
                    <span>Repo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Project Title & Short Description */}
            <div className="space-y-3 mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
                {project.title}
              </h3>
              <p className="text-sky-400 font-mono text-xs sm:text-sm">
                {project.subtitle}
              </p>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-4xl">
                {project.shortDescription}
              </p>
            </div>

            {/* Technical Detail Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#12161f] border border-zinc-800/90 mb-6 space-y-3">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Server size={13} className="text-sky-400" />
                Technical Implementation & Infrastructure
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {project.technicalDescription}
              </p>

              {/* Deployment Topology Chips */}
              {project.infrastructure && (
                <div className="pt-3 border-t border-zinc-800 flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="px-2.5 py-1 rounded bg-[#090b10] border border-zinc-800 text-zinc-300 flex items-center gap-1">
                    <Globe size={11} className="text-sky-400" />
                    Frontend: {project.infrastructure.frontend}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#090b10] border border-zinc-800 text-zinc-300 flex items-center gap-1">
                    <Server size={11} className="text-amber-400" />
                    Backend: {project.infrastructure.backend}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#090b10] border border-zinc-800 text-zinc-300 flex items-center gap-1">
                    <Database size={11} className="text-indigo-400" />
                    DB: {project.infrastructure.database}
                  </span>
                </div>
              )}
            </div>

            {/* Stack Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-mono text-zinc-500 mr-2">Stack:</span>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-zinc-800/70 border border-zinc-700/50 text-zinc-300 font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.filter((p) => p.id !== 'kala').map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl bg-[#0d1117] border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <StatusBadge status={project.badge} />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    Slot
                  </span>
                </div>

                <h4 className="text-lg font-bold text-zinc-100 tracking-tight mb-1">
                  {project.title}
                </h4>
                <div className="text-xs font-mono text-sky-400/80 mb-3">
                  {project.subtitle}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {project.shortDescription}
                </p>
              </div>

              <div>
                {project.features && (
                  <div className="pt-3 border-t border-zinc-800/80 mb-4 space-y-1">
                    {project.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-zinc-600" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-zinc-800/50 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
