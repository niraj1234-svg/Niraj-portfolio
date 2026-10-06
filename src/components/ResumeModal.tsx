import React, { useEffect } from 'react';
import { X, Mail, Code2, GraduationCap, Briefcase, Award, Printer } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { SOCIAL_LINKS } from '../data/socials';
import profileImg from '../assets/profile.jpg';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#0d1117] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-[#12161f]">
          <div className="flex items-center gap-2 font-mono text-sm text-zinc-100">
            <span className="text-sky-400 font-bold">$</span>
            <span>view-resume --candidate="Niraj Dhore"</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              title="Print Resume"
            >
              <Printer size={13} />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-zinc-200 print:text-black print:bg-white">
          {/* Candidate Profile Header */}
          <div className="border-b border-zinc-800 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 print:text-black">
                  NIRAJ DHORE
                </h1>
                <p className="text-sky-400 font-mono text-sm sm:text-base mt-1">
                  Aspiring DevOps & Cloud Engineer · Co-Founder @ KALA
                </p>
                <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl">
                  Engineer. Builder. Entrepreneur. Focused on Linux administration, cloud infrastructure, containerization, and automated deployment pipelines.
                </p>
              </div>

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-sky-500/40 p-0.5 bg-sky-500/10 shrink-0 overflow-hidden shadow-sm self-start">
                <img
                  src={profileImg}
                  alt="Niraj Dhore"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Quick Contact Line */}
            <div className="flex flex-wrap gap-y-2 gap-x-4 mt-3 text-xs font-mono text-zinc-400">
              <a
                href={SOCIAL_LINKS.email.url}
                className="flex items-center gap-1 text-zinc-300 hover:text-sky-400 transition-colors"
              >
                <Mail size={13} className="text-sky-400" />
                dhoreniraj83@gmail.com
              </a>
              <a
                href={SOCIAL_LINKS.github.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-zinc-300 hover:text-sky-400 transition-colors"
              >
                <GitHubIcon size={13} />
                github.com/niraj1234-svg
              </a>
              <a
                href={SOCIAL_LINKS.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-zinc-300 hover:text-sky-400 transition-colors"
              >
                <LinkedInIcon size={13} />
                linkedin.com/in/niraj-dhore-56538a416
              </a>
              <a
                href={SOCIAL_LINKS.leetcode.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-zinc-300 hover:text-sky-400 transition-colors"
              >
                <Code2 size={13} />
                leetcode.com/u/Niraj_009
              </a>
            </div>
          </div>

          {/* Education */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <GraduationCap size={14} />
              Education
            </h2>
            <div className="bg-[#12161f] p-4 rounded-xl border border-zinc-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-zinc-100 text-sm">
                  Bachelor of Technology (B.Tech) — Information Technology
                </span>
                <span className="font-mono text-xs text-zinc-400 mt-0.5 sm:mt-0">2024 – 2027</span>
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                Guru Ghasidas Vishwavidyalaya (GGV) · Bilaspur, Chhattisgarh
              </div>
            </div>
          </section>

          {/* Core Technical Competencies */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Code2 size={14} />
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#12161f] p-3.5 rounded-xl border border-zinc-800/80">
                <div className="font-mono text-zinc-400 text-[11px] mb-1">DEVOPS & CLOUD</div>
                <div className="text-zinc-200">
                  Linux (Admin, Bash scripting), AWS (EC2, S3, IAM, VPC), Docker, CI/CD Workflows, Git & GitHub.
                </div>
              </div>
              <div className="bg-[#12161f] p-3.5 rounded-xl border border-zinc-800/80">
                <div className="font-mono text-zinc-400 text-[11px] mb-1">NETWORKING</div>
                <div className="text-zinc-200">
                  TCP/IP, DNS, HTTP/HTTPS, SSH, Routing, NAT, Firewalls, Reverse Proxy, Wireshark, tcpdump.
                </div>
              </div>
              <div className="bg-[#12161f] p-3.5 rounded-xl border border-zinc-800/80">
                <div className="font-mono text-zinc-400 text-[11px] mb-1">DEVELOPMENT & TOOLS</div>
                <div className="text-zinc-200">
                  React, TypeScript, Node.js, Express, MongoDB, C#, Unity Engine.
                </div>
              </div>
              <div className="bg-[#12161f] p-3.5 rounded-xl border border-zinc-800/80">
                <div className="font-mono text-zinc-400 text-[11px] mb-1">SYSTEM PRACTICES</div>
                <div className="text-zinc-200">
                  System Architecture, Automated Deployments, Domain & DNS Configuration, GitOps Principles.
                </div>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Briefcase size={14} />
              Experience & Production Ventures
            </h2>

            <div className="bg-[#12161f] p-4 rounded-xl border border-zinc-800/80 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-semibold text-zinc-100 text-sm">
                    Co-Founder / Technology & Web Lead
                  </span>
                  <span className="text-sky-400 font-mono text-xs ml-2">@ KALA Sportswear</span>
                </div>
                <span className="font-mono text-xs text-zinc-400 mt-1 sm:mt-0">2026 – Present</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
                <li>Co-founded print-on-demand sportswear startup; engineered and maintain production e-commerce platform.</li>
                <li>Architected deployment pipeline using Vercel (Edge CDN), Render (Node.js API), and MongoDB Atlas.</li>
                <li>Processed approximately 400–500 verified customer orders with active catalog of 20 live products.</li>
                <li>Managed domain routing, SSL enforcement, and customer transaction workflows on Hostinger DNS.</li>
              </ul>
            </div>

            <div className="bg-[#12161f] p-4 rounded-xl border border-zinc-800/80 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-semibold text-zinc-100 text-sm">
                    Lead — Game Development Team
                  </span>
                  <span className="text-zinc-400 font-mono text-xs ml-2">@ GFG Student Chapter GGV</span>
                </div>
                <span className="font-mono text-xs text-zinc-400 mt-1 sm:mt-0">Dec 2025 – Present</span>
              </div>
              <p className="text-xs text-zinc-300">
                Lead campus workshops on C# logic and game physics. Previously served as Co-Lead (Dec 2024 – Aug 2025).
              </p>
            </div>

            <div className="bg-[#12161f] p-4 rounded-xl border border-zinc-800/80 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-semibold text-zinc-100 text-sm">
                    Game Development Co-Lead
                  </span>
                  <span className="text-zinc-400 font-mono text-xs ml-2">@ GDG on Campus GGV</span>
                </div>
                <span className="font-mono text-xs text-zinc-400 mt-1 sm:mt-0">Dec 2025 – Present</span>
              </div>
              <p className="text-xs text-zinc-300">
                Coordinate developer workshops, hackathon teams, and student tech community initiatives.
              </p>
            </div>
          </section>

          {/* Key Projects */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Code2 size={14} />
              Key Projects
            </h2>

            <div className="bg-[#12161f] p-4 rounded-xl border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-100 text-sm">
                  KALA — Production E-Commerce Platform
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                  LIVE PRODUCTION
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                Production e-commerce storefront with search, product details, cart, checkout, payment integration, and order management. Stack: React, Vite, TypeScript, Tailwind, Node.js, Express, MongoDB Atlas, Vercel, Render.
              </p>
            </div>

            <div className="bg-[#12161f] p-4 rounded-xl border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-100 text-sm">
                  AI-Powered Import Impact Simulator for Palm Oil Tariffs
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800/40">
                  ONGOING
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                Smart India Hackathon project analyzing tariff variations and macroeconomic market impact for edible oil imports.
              </p>
            </div>
          </section>

          {/* Achievements & Participation */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Award size={14} />
              Achievements & Participation
            </h2>
            <div className="bg-[#12161f] p-4 rounded-xl border border-zinc-800/80 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-200"><strong>Smart India Hackathon 2025</strong> — Participation</span>
                <span className="text-zinc-500 font-mono">2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-200"><strong>SUSTAIN-A-THON 2024</strong> — Participation</span>
                <span className="text-zinc-500 font-mono">2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-200"><strong>Unity Learn — 3D Beginner: Roll-a-Ball Game</strong></span>
                <span className="text-zinc-500 font-mono">Completed May 19, 2025</span>
              </div>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-zinc-800 bg-[#12161f] text-xs font-mono">
          <span className="text-zinc-400">Recruiter-ready digital format</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
