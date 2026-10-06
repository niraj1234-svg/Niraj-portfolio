import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Mail, Copy, Check, ExternalLink, Code2, Globe, Send } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../components/Icons';
import { SOCIAL_LINKS } from '../data/socials';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const email = 'dhoreniraj83@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 border-b border-zinc-800/80 bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="// 08"
          badge="COMMUNICATION & INQUIRIES"
          title="LET'S CONNECT"
          subtitle="Interested in technology, DevOps, cloud infrastructure, or building something useful? Let's connect."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Email Action Card */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0d1117] border border-zinc-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-zinc-100">Direct Email</h3>
                <p className="text-xs text-zinc-400 font-mono">Fastest communication channel</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#12161f] border border-zinc-800 flex items-center justify-between gap-3">
              <span className="font-mono text-xs sm:text-sm text-zinc-200 truncate">
                {email}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors text-xs flex items-center gap-1 font-mono"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400 hidden sm:inline">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${email}`}
                  className="p-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-zinc-950 font-medium transition-colors text-xs flex items-center gap-1 font-mono"
                  title="Open mail client"
                  aria-label="Send email"
                >
                  <Send size={14} />
                  <span className="hidden sm:inline">Send Mail</span>
                </a>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              I am actively seeking DevOps and Cloud Engineer internship opportunities, mentorship, and engineering discussions. Feel free to reach out with project questions or infrastructure opportunities.
            </p>
          </div>

          {/* Social Profiles Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#0d1117] border border-zinc-800 hover:border-zinc-700 hover:bg-[#12161f] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
                  <GitHubIcon size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-100">GitHub</div>
                  <div className="text-[11px] font-mono text-zinc-500">niraj1234-svg</div>
                </div>
              </div>
              <ExternalLink size={14} className="text-zinc-500 group-hover:text-sky-400 transition-colors" />
            </a>

            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#0d1117] border border-zinc-800 hover:border-zinc-700 hover:bg-[#12161f] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sky-400 group-hover:text-sky-300 transition-colors">
                  <LinkedInIcon size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-100">LinkedIn</div>
                  <div className="text-[11px] font-mono text-zinc-500">niraj-dhore</div>
                </div>
              </div>
              <ExternalLink size={14} className="text-zinc-500 group-hover:text-sky-400 transition-colors" />
            </a>

            <a
              href={SOCIAL_LINKS.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#0d1117] border border-zinc-800 hover:border-zinc-700 hover:bg-[#12161f] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 group-hover:text-amber-300 transition-colors">
                  <Code2 size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-100">LeetCode</div>
                  <div className="text-[11px] font-mono text-zinc-500">Niraj_009</div>
                </div>
              </div>
              <ExternalLink size={14} className="text-zinc-500 group-hover:text-sky-400 transition-colors" />
            </a>

            <a
              href={SOCIAL_LINKS.kala.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#0d1117] border border-zinc-800 hover:border-zinc-700 hover:bg-[#12161f] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  <Globe size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-100">KALA Store</div>
                  <div className="text-[11px] font-mono text-zinc-500">kalaofficial.store</div>
                </div>
              </div>
              <ExternalLink size={14} className="text-zinc-500 group-hover:text-sky-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
