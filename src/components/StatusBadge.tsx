import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'green' | 'blue' | 'amber' | 'zinc' | 'purple';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = 'zinc',
  size = 'sm',
  pulse = false,
}) => {
  // Determine variant styling
  let colorClasses = 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60';
  let dotClasses = 'bg-zinc-400';

  if (variant === 'green' || status.includes('LIVE') || status === 'LEARNED' || status === 'Strong') {
    colorClasses = 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30';
    dotClasses = 'bg-emerald-400';
  } else if (variant === 'blue' || status === 'PRACTICED' || status === 'ONGOING' || status === 'Working Knowledge') {
    colorClasses = 'bg-sky-950/40 text-sky-300 border-sky-500/30';
    dotClasses = 'bg-sky-400';
  } else if (variant === 'amber' || status === 'BUILDING' || status === 'Learning') {
    colorClasses = 'bg-amber-950/40 text-amber-300 border-amber-500/30';
    dotClasses = 'bg-amber-400';
  } else if (variant === 'purple' || status === 'PLANNED' || status === 'COMING SOON') {
    colorClasses = 'bg-indigo-950/40 text-indigo-300 border-indigo-500/30';
    dotClasses = 'bg-indigo-400';
  }

  const sizeClasses = size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium border tracking-wide uppercase transition-colors ${colorClasses} ${sizeClasses}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClasses} ${
          pulse ? 'animate-pulse-subtle' : ''
        }`}
      />
      <span>{status}</span>
    </span>
  );
};
