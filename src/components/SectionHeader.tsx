import React from 'react';

interface SectionHeaderProps {
  index?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  badge?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  title,
  subtitle,
  align = 'left',
  badge,
}) => {
  return (
    <div className={`mb-10 md:mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <div className={`flex items-center gap-2 mb-2 font-mono text-xs text-sky-400 uppercase tracking-widest ${align === 'center' ? 'justify-center' : ''}`}>
        {index && <span>{index}</span>}
        {index && badge && <span>·</span>}
        {badge && <span className="text-zinc-400">{badge}</span>}
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
        {title}
        <span className="text-sky-400">.</span>
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
