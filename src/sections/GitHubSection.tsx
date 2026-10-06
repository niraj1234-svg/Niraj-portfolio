import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ExternalLink, GitBranch, Code2, FolderGit2 } from 'lucide-react';
import { GitHubIcon } from '../components/Icons';
import { SOCIAL_LINKS } from '../data/socials';

export const GitHubSection: React.FC = () => {
  return (
    <section id="github" className="py-20 border-b border-zinc-800/80 bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="// 06"
          badge="SOURCE CODE & VCS"
          title="GITHUB"
          subtitle="Code, experiments, and infrastructure work."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* GitHub Profile Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0d1117] border border-zinc-800 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-sky-400">
                <GitHubIcon size={28} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-zinc-100 font-mono">
                  niraj1234-svg
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  github.com/niraj1234-svg
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Active repository management for production client applications, infrastructure automation experiments, and academic challenge solutions.
            </p>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <FolderGit2 size={13} className="text-sky-400" />
                VCS: Git & GitHub
              </span>
              <a
                href={SOCIAL_LINKS.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-colors"
              >
                <span>Visit Profile</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Repositories Breakdown */}
          <div className="lg:col-span-7 space-y-4">
            {/* Featured Repo: Kala-Front */}
            <div className="p-5 rounded-xl bg-[#12161f] border border-zinc-800 hover:border-zinc-700 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-sm font-semibold text-zinc-100">
                  <FolderGit2 size={16} className="text-emerald-400" />
                  <a
                    href="https://github.com/niraj1234-svg/Kala-Front"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors flex items-center gap-1"
                  >
                    Kala-Front
                    <ExternalLink size={12} className="text-zinc-500" />
                  </a>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                  PUBLIC REPO
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                Frontend storefront repository for KALA. Built with React, Vite, TypeScript, and Tailwind CSS. Integrated with Render backend and deployed continuously via Vercel.
              </p>

              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-zinc-800 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    TypeScript
                  </span>
                  <span className="flex items-center gap-1 text-zinc-500">
                    <GitBranch size={12} />
                    main
                  </span>
                </div>
                <a
                  href="https://github.com/niraj1234-svg/Kala-Front"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  View on GitHub →
                </a>
              </div>
            </div>

            {/* Upcoming Repositories Placeholder Notice */}
            <div className="p-4 rounded-xl bg-[#0d1117] border border-dashed border-zinc-800 text-xs font-mono text-zinc-400 space-y-2">
              <div className="text-zinc-300 font-semibold flex items-center gap-1.5">
                <Code2 size={14} className="text-sky-400" />
                Pipeline & Repository Pipeline
              </div>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                Additional public repositories will be linked here as the DevOps Flagship infrastructure code, SIH palm oil tariff simulator, and full-stack applications complete their active implementation phases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
