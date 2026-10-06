import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Terminal, Cpu, Building2, Workflow } from 'lucide-react';

export const About: React.FC = () => {
  const facts = [
    {
      number: '01',
      label: 'BACKGROUND',
      title: 'B.Tech Information Technology',
      desc: 'Guru Ghasidas Vishwavidyalaya (GGV) · 2024–2027. Started technical exploration through game programming and C# before expanding into full-stack web and systems.',
      icon: Terminal,
    },
    {
      number: '02',
      label: 'FOCUS',
      title: 'DevOps & Cloud Systems',
      desc: 'Deep focus on Linux system administration, AWS cloud topologies, Docker virtualization, networking protocols (TCP/IP, DNS, SSH), and automated deployment pipelines.',
      icon: Cpu,
    },
    {
      number: '03',
      label: 'BUILDING',
      title: 'KALA Production Platform',
      desc: 'Co-founded and engineered the production infrastructure for KALA sportswear, executing live deployments, DNS setup, and order operations handling 400–500 customer transactions.',
      icon: Building2,
    },
    {
      number: '04',
      label: 'CURRENT',
      title: 'Learn → Build → Deploy',
      desc: 'Actively practicing infrastructure as code, containerization workflows, and hands-on system troubleshooting to prepare for production DevOps & cloud engineering roles.',
      icon: Workflow,
    },
  ];

  return (
    <section id="about" className="py-20 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="// 01"
          badge="BACKGROUND & IDENTITY"
          title="ABOUT ME"
          subtitle="A systems-oriented engineer driven by building, deploying, and maintaining dependable software infrastructure."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Narrative Story (Concise, technical, recruiter-friendly) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0d1117] border border-zinc-800 space-y-4">
              <div className="font-mono text-xs text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                The Engineering Trajectory
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed">
                My engineering path began in game development, where I built foundational logic, physics implementations, and C# programming skills. As I dove deeper into software architecture and web platforms, I co-founded <strong className="text-zinc-100">KALA</strong>, a print-on-demand sportswear startup.
              </p>

              <p className="text-zinc-300 text-sm leading-relaxed">
                Taking a platform to production made one thing clear: the most challenging and fascinating problems happen after the code is written—in hosting, networking, deployment reliability, environment parity, and server infrastructure.
              </p>

              <p className="text-zinc-300 text-sm leading-relaxed">
                Today, I dedicate my focus to <strong className="text-sky-300">DevOps and Cloud Engineering</strong>: mastering Linux systems, AWS infrastructure, Docker containerization, networking fundamentals, and CI/CD pipelines.
              </p>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>IDENTITY: Aspiring DevOps Engineer</span>
                <span className="text-emerald-400">BUILDER & FOUNDER</span>
              </div>
            </div>
          </div>

          {/* Key Facts Cards (01, 02, 03, 04) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {facts.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="p-5 rounded-2xl bg-[#12161f] border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-sky-400">
                        {item.number}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded bg-zinc-800/80 text-sky-400 group-hover:text-white transition-colors">
                        <Icon size={16} />
                      </div>
                      <h3 className="font-semibold text-zinc-100 text-sm">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
