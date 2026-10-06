import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Journey', href: '#journey' },
    { name: 'GitHub', href: '#github' },
    { name: 'Contact', href: '#contact' },
  ];

  // Track active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionElements = navLinks.map((link) => ({
        id: link.href.substring(1),
        element: document.getElementById(link.href.substring(1)),
      }));

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.element && item.element.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          return;
        }
      }

      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#090b10]/90 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/30'
          : 'bg-[#090b10]/60 backdrop-blur-sm border-b border-zinc-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Left */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 text-zinc-100 font-bold tracking-tight hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/60 flex items-center justify-center text-sky-400 font-mono text-sm group-hover:border-sky-500/50 transition-colors">
                <Terminal size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm tracking-wider font-semibold">NIRAJ DHORE</span>
                <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline-block">DevOps & Cloud</span>
              </div>
            </a>

            {/* Status indicator on desktop */}
            <div className="hidden lg:flex items-center pl-3 ml-2 border-l border-zinc-800">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-950/40 text-emerald-300 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle" />
                AVAILABLE FOR INTERNSHIPS / OPPORTUNITIES
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? 'text-sky-400 bg-sky-500/10 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            {/* Resume button */}
            <button
              onClick={onOpenResume}
              className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 transition-colors"
            >
              <FileText size={13} className="text-sky-400" />
              <span>Resume</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenResume}
              className="px-2.5 py-1 text-xs font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-1"
            >
              <FileText size={12} className="text-sky-400" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#0d1117] px-4 pt-3 pb-6 space-y-3">
          {/* Status Indicator on Mobile */}
          <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle shrink-0" />
            <span>AVAILABLE FOR INTERNSHIPS / OPPORTUNITIES</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`p-2.5 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-sky-500/10 text-sky-400 font-semibold border border-sky-500/30'
                      : 'bg-[#12161f] text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-zinc-600 text-[10px]">#</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
