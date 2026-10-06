import React, { useState } from 'react';
import { Terminal, Shield, Cpu, Server, Wifi, CheckCircle2, Copy, Check } from 'lucide-react';

export const HeroVisualTerminal: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const commandSnippet = `curl -s https://nirajdhore.dev/api/status`;

  const copySnippet = () => {
    navigator.clipboard.writeText(commandSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none">
      <div className="relative rounded-xl border border-zinc-800 bg-[#0d1117] shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80 hover:bg-[#ff5f56] transition-colors" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 hover:bg-[#ffbd2e] transition-colors" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]/80 hover:bg-[#27c93f] transition-colors" />
            <span className="ml-2 font-mono text-xs text-zinc-400 flex items-center gap-1.5">
              <Terminal size={12} className="text-zinc-500" />
              niraj@infra-node: ~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
              ONLINE
            </span>
            <button
              onClick={copySnippet}
              title="Copy snippet"
              aria-label="Copy terminal snippet"
              className="text-zinc-500 hover:text-zinc-300 p-1 transition-colors"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-300 space-y-3.5">
          {/* Prompt 1 */}
          <div>
            <div className="text-zinc-500 flex items-center gap-1.5">
              <span className="text-sky-400">niraj@cloud-host</span>
              <span>:</span>
              <span className="text-indigo-400">~</span>
              <span className="text-zinc-300">$</span>
              <span className="text-zinc-200">whoami</span>
            </div>
            <div className="text-emerald-400 pl-4 font-semibold mt-0.5">
              niraj-dhore
            </div>
          </div>

          {/* Prompt 2 */}
          <div>
            <div className="text-zinc-500 flex items-center gap-1.5">
              <span className="text-sky-400">niraj@cloud-host</span>
              <span>:</span>
              <span className="text-indigo-400">~</span>
              <span className="text-zinc-300">$</span>
              <span className="text-zinc-200">role</span>
            </div>
            <div className="text-sky-300 pl-4 mt-0.5">
              devops-cloud-engineer
            </div>
          </div>

          {/* Prompt 3 */}
          <div>
            <div className="text-zinc-500 flex items-center gap-1.5">
              <span className="text-sky-400">niraj@cloud-host</span>
              <span>:</span>
              <span className="text-indigo-400">~</span>
              <span className="text-zinc-300">$</span>
              <span className="text-zinc-200">focus</span>
            </div>
            <div className="text-zinc-300 pl-4 mt-0.5 flex flex-wrap gap-1.5">
              <span className="px-1.5 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/60 text-zinc-200 text-[11px]">linux</span>
              <span className="px-1.5 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/60 text-zinc-200 text-[11px]">aws</span>
              <span className="px-1.5 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/60 text-zinc-200 text-[11px]">docker</span>
              <span className="px-1.5 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/60 text-zinc-200 text-[11px]">networking</span>
            </div>
          </div>

          {/* Prompt 4 */}
          <div>
            <div className="text-zinc-500 flex items-center gap-1.5">
              <span className="text-sky-400">niraj@cloud-host</span>
              <span>:</span>
              <span className="text-indigo-400">~</span>
              <span className="text-zinc-300">$</span>
              <span className="text-zinc-200">status</span>
            </div>
            <div className="text-amber-400 pl-4 mt-0.5 flex items-center gap-2">
              <span>building...</span>
              <span className="inline-block w-2 h-4 bg-sky-400 animate-blink" />
            </div>
          </div>

          {/* System Telemetry Bar */}
          <div className="pt-3 mt-3 border-t border-zinc-800/80">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Shield size={11} className="text-zinc-400" />
              Verified Subsystem Telemetry
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-2 bg-[#12161f] p-2 rounded border border-zinc-800/80">
                <Server size={13} className="text-sky-400 shrink-0" />
                <div className="truncate">
                  <span className="text-zinc-500 text-[10px] block">OS & Admin</span>
                  <span className="text-zinc-200 font-medium">Linux System</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#12161f] p-2 rounded border border-zinc-800/80">
                <Cpu size={13} className="text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="text-zinc-500 text-[10px] block">Cloud & Compute</span>
                  <span className="text-zinc-200 font-medium">AWS / Docker</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#12161f] p-2 rounded border border-zinc-800/80">
                <Wifi size={13} className="text-indigo-400 shrink-0" />
                <div className="truncate">
                  <span className="text-zinc-500 text-[10px] block">Protocols</span>
                  <span className="text-zinc-200 font-medium">TCP/IP · DNS · SSH</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#12161f] p-2 rounded border border-zinc-800/80">
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="text-zinc-500 text-[10px] block">Live Production</span>
                  <span className="text-zinc-200 font-medium">KALA Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer command prompt info */}
        <div className="px-4 py-2 bg-[#0b0e14] border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>HOST: infra-prod-ap-south</span>
          <span className="text-emerald-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            SYNCHRONIZED
          </span>
        </div>
      </div>
    </div>
  );
};
