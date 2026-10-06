import React, { useState, useRef, useEffect, useCallback } from 'react';
import { api } from '../services/api';

interface LinePart {
  text: string;
  cls: string;
}

interface TerminalLine {
  text?: string;
  class?: string;
  prompt?: string;
  parts?: LinePart[];
}

interface CommandDef {
  description: string;
  handler: (args: string[]) => void | Promise<void>;
}

export const TerminalView: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }, 10);
  };

  const addLine = useCallback((text = '', className = '') => {
    setLines((prev) => [...prev, { text, class: className }]);
    scrollToBottom();
  }, []);

  const addParts = useCallback((parts: LinePart[]) => {
    setLines((prev) => [...prev, { parts, class: '' }]);
    scrollToBottom();
  }, []);

  const addKeyVal = useCallback((key: string, val: string, width = 14) => {
    addParts([
      { text: `  ${key.padEnd(width)}`, cls: 'terminal__text-muted' },
      { text: String(val ?? ''), cls: '' },
    ]);
  }, [addParts]);

  const addPromptEcho = useCallback((cmd: string) => {
    setLines((prev) => [...prev, { prompt: `niraj@portfolio:~$ ${cmd}` }]);
    scrollToBottom();
  }, []);

  // Safe commands table
  const commands = useRef<Map<string, CommandDef>>(new Map());

  const showHelp = useCallback(() => {
    addLine('Available commands', 'terminal__line--accent');
    addLine();
    const sorted = [...commands.current.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    for (const [name, def] of sorted) {
      addParts([
        { text: `  ${name.padEnd(14)}`, cls: '' },
        { text: def.description, cls: 'terminal__text-muted' },
      ]);
    }
    addLine();
    addLine('Tab completes, ↑↓ walks history, Ctrl+L clears.', 'terminal__line--muted');
  }, [addLine, addParts]);

  // Initialize commands and welcome banner
  useEffect(() => {
    const cmdMap = new Map<string, CommandDef>();

    cmdMap.set('help', {
      description: 'Show available commands',
      handler: () => showHelp(),
    });

    cmdMap.set('clear', {
      description: 'Clear the screen',
      handler: () => setLines([]),
    });

    cmdMap.set('about', {
      description: 'Show my background & summary',
      handler: () => {
        addLine('Niraj Dhore', 'terminal__line--accent');
        addLine('Aspiring DevOps & Cloud Engineer', 'terminal__line--accent');
        addLine();
        addLine(
          'Information Technology undergraduate at Guru Ghasidas Vishwavidyalaya (GGV) Bilaspur.'
        );
        addLine(
          'Technical focus centered on Linux administration, AWS, Docker containerization, networking fundamentals, and automated CI/CD pipelines.'
        );
        addLine('Co-founder at KALA (kalaofficial.store) managing cloud infrastructure & technology.');
        addLine();
        addLine("Try 'skills', 'projects', 'education', or 'contact'.", 'terminal__line--muted');
      },
    });

    cmdMap.set('projects', {
      description: 'List portfolio projects',
      handler: () => {
        addLine('Portfolio Projects', 'terminal__line--accent');
        addLine();
        addLine('  1. KALA — Production E-Commerce Platform');
        addLine(
          '     Live full-stack e-commerce system (React, TypeScript, Node.js, Express, MongoDB Atlas, Render, Vercel).',
          'terminal__text-muted'
        );
        addLine('     https://www.kalaofficial.store/', 'terminal__line--muted');
        addLine();
        addLine('  2. SIH 2026 — AI-Powered Import Impact Simulator for Palm Oil Tariffs (ONGOING)');
        addLine(
          '     Econometric trade modeling engine developed for Smart India Hackathon 2026 (currently in active development).',
          'terminal__text-muted'
        );
      },
    });

    cmdMap.set('skills', {
      description: 'Show core competencies & stack',
      handler: () => {
        addLine('Core Technical Competencies', 'terminal__line--accent');
        addLine();
        addLine('  DevOps & Systems', 'terminal__line--accent');
        addLine('    Linux (Ubuntu/Debian), AWS (EC2, S3, IAM, VPC), Docker, Bash, CI/CD, Git, GitHub', 'terminal__text-muted');
        addLine();
        addLine('  Networking & Infrastructure', 'terminal__line--accent');
        addLine('    TCP/IP, DNS, HTTP/HTTPS, SSH, Firewalls, Reverse Proxies, Cloudflare', 'terminal__text-muted');
        addLine();
        addLine('  Web & Backend Engineering', 'terminal__line--accent');
        addLine('    JavaScript, TypeScript, React, Node.js, Express, REST APIs, MongoDB Atlas', 'terminal__text-muted');
        addLine();
        addLine('  Game Development & Logic', 'terminal__line--accent');
        addLine('    Unity 3D, C#, Physics, AI Navigation, Object-Oriented Design', 'terminal__text-muted');
      },
    });

    cmdMap.set('experience', {
      description: 'Show work and leadership experience',
      handler: () => {
        addLine('Experience & Leadership History', 'terminal__line--accent');
        addLine();
        addLine('  KALA — Co-Founder (2026 – Present)');
        addLine('    Built and manage technology & cloud deployment for print-on-demand customized apparel.', 'terminal__text-muted');
        addLine();
        addLine('  GFG Chapter GGV — Lead, Game Development (Dec 2025 – Present)');
        addLine('    Spearheading game development workshops, build sessions, and mentoring student projects.', 'terminal__text-muted');
        addLine();
        addLine('  GDGC on Campus GGV — Game Development Co-Lead (Dec 2025 – Present)');
        addLine('    Organizing game development tracks, speaker events, and collaborative sprints.', 'terminal__text-muted');
        addLine();
        addLine('  GFG Chapter GGV — Co-Lead, Game Development (Dec 2024 – Aug 2025)');
        addLine('    Supported campus tech workshops and guided students in Unity 3D & C# fundamentals.', 'terminal__text-muted');
      },
    });

    cmdMap.set('education', {
      description: 'Show academic education',
      handler: () => {
        addLine('Education', 'terminal__line--accent');
        addLine();
        addKeyVal('Degree', 'B.Tech in Information Technology');
        addKeyVal('Institution', 'Guru Ghasidas Vishwavidyalaya (GGV)');
        addKeyVal('Location', 'Bilaspur, Chhattisgarh, India');
        addKeyVal('Duration', '2024 – 2027');
        addKeyVal('CGPA', '8.52');
      },
    });

    cmdMap.set('achievements', {
      description: 'Show achievements & hackathons',
      handler: () => {
        addLine('Achievements & Certifications', 'terminal__line--accent');
        addLine();
        addLine('  Smart India Hackathon 2025');
        addLine('    Participated under Ministry of Education Innovation Cell (MIC).', 'terminal__text-muted');
        addLine();
        addLine('  SUSTAIN-A-THON 2024');
        addLine('    Sustainability-themed nationwide hackathon sprint.', 'terminal__text-muted');
        addLine();
        addLine('  Unity Learn — 3D Beginner: Roll-a-Ball Game');
        addLine('    Official Unity credential in 3D physics, controllers, and game mechanics.', 'terminal__text-muted');
      },
    });

    cmdMap.set('contact', {
      description: 'Show contact details & email',
      handler: () => {
        addLine('Contact Details', 'terminal__line--accent');
        addLine();
        addKeyVal('Email', 'dhoreniraj83@gmail.com');
        addKeyVal('Location', 'Bilaspur, Chhattisgarh, India');
        addKeyVal('Availability', 'Open to internships & software/cloud opportunities');
        addLine();
        addLine('Or submit an inquiry from the /contact page.', 'terminal__line--muted');
      },
    });

    cmdMap.set('socials', {
      description: 'Show social & portfolio links',
      handler: () => {
        addLine('Social & Technical Profiles', 'terminal__line--accent');
        addLine();
        addKeyVal('LinkedIn', 'https://www.linkedin.com/in/niraj-dhore-56538a416');
        addKeyVal('GitHub', 'https://github.com/niraj1234-svg');
        addKeyVal('LeetCode', 'https://leetcode.com/u/Niraj_009/');
        addKeyVal('KALA Store', 'https://www.kalaofficial.store/');
      },
    });

    cmdMap.set('search', {
      description: 'Search database (usage: search <query>)',
      handler: async (args: string[]) => {
        const query = args.join(' ').trim();
        if (!query) {
          addLine('Usage: search <keyword> (e.g. search docker, search aws, search kala)', 'terminal__line--error');
          return;
        }
        addLine(`Searching database for "${query}"...`, 'terminal__line--muted');
        try {
          const res = await api.search(query);
          if (res.success && res.data) {
            const projects = (res.data as any).projects || [];
            const skills = (res.data as any).skills || [];
            const total = projects.length + skills.length;
            if (total === 0) {
              addLine(`No matching projects or skills found for "${query}".`, 'terminal__line--muted');
            } else {
              addLine(`Found ${total} result${total > 1 ? 's' : ''}:`, 'terminal__line--success');
              projects.forEach((p: any) => {
                addLine(`  [Project] ${p.title} (${p.category})`);
              });
              skills.forEach((s: any) => {
                addLine(`  [Skill]   ${s.name} (${s.category})`);
              });
            }
          } else {
            addLine('No results returned from search service.', 'terminal__line--muted');
          }
        } catch {
          addLine('Search query could not be completed.', 'terminal__line--error');
        }
      },
    });

    cmdMap.set('whoami', {
      description: 'Display current user',
      handler: () => addLine('niraj'),
    });

    cmdMap.set('pwd', {
      description: 'Print working directory',
      handler: () => addLine('/home/niraj/portfolio'),
    });

    cmdMap.set('neofetch', {
      description: 'Show system and environment info',
      handler: () => {
        const os = navigator.userAgent.includes('Windows')
          ? 'Windows (x86_64)'
          : navigator.userAgent.includes('Mac')
          ? 'macOS'
          : navigator.userAgent.includes('Linux')
          ? 'Linux'
          : 'Unix-like';
        const browser = navigator.userAgent.includes('Chrome')
          ? 'Chrome'
          : navigator.userAgent.includes('Firefox')
          ? 'Firefox'
          : navigator.userAgent.includes('Safari')
          ? 'Safari'
          : 'Browser';

        addLine('niraj@portfolio', 'terminal__line--accent');
        addLine('----------------', 'terminal__line--muted');
        addKeyVal('User', 'Niraj Dhore');
        addKeyVal('Role', 'Aspiring DevOps & Cloud Engineer');
        addKeyVal('OS', os);
        addKeyVal('Host', browser);
        addKeyVal('Shell', 'bash (sandboxed simulation)');
        addKeyVal('Uptime', 'Active');
        addKeyVal('Stack', 'React, TypeScript, Node.js, Docker, AWS');
      },
    });

    commands.current = cmdMap;

    // Initial greeting
    setLines([
      { text: 'Niraj Dhore', class: 'terminal__line--accent' },
      { text: 'Aspiring DevOps & Cloud Engineer', class: 'terminal__line--accent' },
      { text: '' },
      { text: 'Available commands', class: 'terminal__line--accent' },
      { text: '' },
      {
        parts: [
          { text: '  about         ', cls: '' },
          { text: 'Show my background & summary', cls: 'terminal__text-muted' },
        ],
      },
      {
        parts: [
          { text: '  achievements  ', cls: '' },
          { text: 'Show achievements & hackathons', cls: 'terminal__text-muted' },
        ],
      },
      {
        parts: [
          { text: '  clear         ', cls: '' },
          { text: 'Clear the screen', cls: 'terminal__text-muted' },
        ],
      },
      {
        parts: [
          { text: '  contact       ', cls: '' },
          { text: 'Show contact details & email', cls: 'terminal__text-muted' },
        ],
      },
      {
        parts: [
          { text: '  education     ', cls: '' },
          { text: 'Show academic education', cls: 'terminal__text-muted' },
        ],
      },
      {
        parts: [
          { text: '  experience    ', cls: '' },
          { text: 'Show work and leadership experience', cls: 'terminal__text-muted' },
        ],
      },
      {
        parts: [
          { text: '  help          ', cls: '' },
          { text: 'Show available commands', cls: 'terminal__text-muted' },
        ],
      },
      {
        parts: [
          { text: '  neofetch      ', cls: '' },
          { text: 'Show system and environment info', cls: 'terminal__text-muted' },
        ],
      },
      {
        parts: [
          { text: '  projects      ', cls: '' },
          { text: 'List portfolio projects', cls: 'terminal__text-muted' },
        ],
      },
      {
        parts: [
          { text: '  search        ', cls: '' },
          { text: 'Search database (usage: search <query>)', cls: 'terminal__text-muted' },
        ],
      },
      {
        parts: [
          { text: '  skills        ', cls: '' },
          { text: 'Show core competencies & stack', cls: 'terminal__text-muted' },
        ],
      },
      {
        parts: [
          { text: '  socials       ', cls: '' },
          { text: 'Show social & portfolio links', cls: 'terminal__text-muted' },
        ],
      },
      {
        parts: [
          { text: '  whoami        ', cls: '' },
          { text: 'Display current user', cls: 'terminal__text-muted' },
        ],
      },
      { text: '' },
      {
        text: 'Tab completes, ↑↓ walks history, Ctrl+L clears.',
        class: 'terminal__line--muted',
      },
    ]);

    inputRef.current?.focus();
  }, [addLine, addKeyVal, addParts, showHelp]);

  const execute = async (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);
    addPromptEcho(trimmed);

    const tokens = trimmed.match(/(?:[^\s"']+|['"][^'"]*['"])+/g) || [];
    const commandName = tokens[0]?.toLowerCase() || '';
    const args = tokens.slice(1).map((arg) => arg.replace(/^['"]|['"]$/g, ''));

    const cmdDef = commands.current.get(commandName);
    if (cmdDef) {
      try {
        await cmdDef.handler(args);
      } catch (err: any) {
        addLine(`Error: ${err?.message || 'Execution error'}`, 'terminal__line--error');
      }
    } else {
      addLine(`bash: ${commandName}: command not found. Type "help" for available commands.`, 'terminal__line--error');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      execute(input);
      setInput('');
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(history[nextIdx] || '');
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0 || historyIdx === -1) return;
      if (historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx] || '');
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
      return;
    }

    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const current = input.toLowerCase().trim();
      if (!current) return;
      const keys = [...commands.current.keys()];
      const matches = keys.filter((k) => k.startsWith(current));
      if (matches.length === 1) {
        setInput(matches[0] + ' ');
      } else if (matches.length > 1) {
        addLine(matches.join('  '), 'terminal__line--muted');
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setLines([]);
    }
  };

  const focusInput = () => {
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && sel.toString().trim()) {
      return; // allow user to copy text without losing selection
    }
    inputRef.current?.focus();
  };

  return (
    <div className="terminal-page">
      {/* Reference Terminal Page Header */}
      <header className="terminal-page__head reveal">
        <h1 className="title title--h1 first-title title__separate terminal-page__title">
          Terminal<span className="title--tone">.</span>
        </h1>
        <p className="terminal-page__lead">
          Explore this portfolio from the command line.
        </p>
      </header>

      {/* Terminal Window matching exact Reference */}
      <div className="terminal reveal reveal-delay-1" onClick={focusInput}>
        {/* Terminal Title Bar */}
        <div className="terminal__bar">
          <span className="terminal__bar-path">~/portfolio</span>
          <span className="terminal__bar-keys" aria-hidden="true">
            <span className="terminal__bar-key">
              <kbd>Tab</kbd>complete
            </span>
            <span className="terminal__bar-key">
              <kbd>↑↓</kbd>history
            </span>
            <span className="terminal__bar-key">
              <kbd>Ctrl+L</kbd>clear
            </span>
          </span>
        </div>

        {/* Terminal Output */}
        <div
          className="terminal__output"
          ref={outputRef}
          role="log"
          aria-label="Terminal transcript"
        >
          {lines.map((line, idx) => (
            <div key={idx} className={`terminal__line ${line.class || ''}`}>
              {line.prompt ? (
                <span className="terminal__prompt">{line.prompt}</span>
              ) : line.parts ? (
                line.parts.map((part, pIdx) => (
                  <span key={pIdx} className={part.cls}>
                    {part.text}
                  </span>
                ))
              ) : (
                line.text
              )}
            </div>
          ))}
        </div>

        {/* Terminal Input Line */}
        <div className="terminal__input-line">
          <span className="terminal__prompt" aria-hidden="true">
            niraj@portfolio:~$
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal__input"
            type="text"
            aria-label="Terminal command"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};
