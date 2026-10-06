import React from 'react';
import { ArrowDown, FileText, Code2, Globe, ExternalLink, Activity } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../components/Icons';
import { HeroVisualTerminal } from '../components/HeroVisualTerminal';
import { SOCIAL_LINKS } from '../data/socials';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand & Hero Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* System Status Element */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12161f] border border-zinc-800 text-xs font-mono text-zinc-300">
              <Activity size={13} className="text-emerald-400" />
              <span className="text-zinc-500 uppercase tracking-wider text-[11px]">System Status:</span>
              <span className="text-sky-300 font-medium">Learning → Building → Deploying → Improving</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <div className="font-mono text-xs sm:text-sm text-sky-400 font-medium tracking-widest uppercase">
                DEVOPS & CLOUD ENGINEER
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100">
                NIRAJ DHORE
              </h1>
              <p className="text-lg sm:text-xl font-medium text-zinc-300 tracking-tight">
                Engineer. Builder. Entrepreneur.
              </p>
            </div>

            {/* Truthful Supporting Text */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
              I build, deploy, and manage real-world systems while continuously improving my skills in DevOps, cloud infrastructure, Linux, networking, and automation.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-zinc-950 font-semibold text-sm transition-all shadow-md shadow-sky-500/10 hover:shadow-sky-500/20"
              >
                <span>View My Work</span>
                <ArrowDown size={15} />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#12161f] hover:bg-zinc-800 text-zinc-200 font-medium text-sm border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <FileText size={15} className="text-sky-400" />
                <span>View Resume</span>
              </button>
            </div>

            {/* Secondary Profile Links */}
            <div className="pt-4 border-t border-zinc-800/80">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
                Verified External Profiles
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
                <a
                  href={SOCIAL_LINKS.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#12161f] border border-zinc-800/80 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
                >
                  <GitHubIcon size={13} className="text-zinc-400" />
                  <span>GitHub</span>
                  <ExternalLink size={11} className="text-zinc-500" />
                </a>

                <a
                  href={SOCIAL_LINKS.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#12161f] border border-zinc-800/80 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
                >
                  <LinkedInIcon size={13} className="text-sky-400" />
                  <span>LinkedIn</span>
                  <ExternalLink size={11} className="text-zinc-500" />
                </a>

                <a
                  href={SOCIAL_LINKS.leetcode.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#12161f] border border-zinc-800/80 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
                >
                  <Code2 size={13} className="text-amber-400" />
                  <span>LeetCode</span>
                  <ExternalLink size={11} className="text-zinc-500" />
                </a>

                <a
                  href={SOCIAL_LINKS.kala.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#12161f] border border-zinc-800/80 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
                >
                  <Globe size={13} className="text-emerald-400" />
                  <span>KALA Store</span>
                  <ExternalLink size={11} className="text-zinc-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Terminal */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroVisualTerminal />
          </div>
        </div>
      </div>
    </section>
  );
};
