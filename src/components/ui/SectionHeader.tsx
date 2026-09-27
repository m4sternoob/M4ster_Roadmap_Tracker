import type { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  count?: number;
}

export function SectionHeader({ icon: Icon, title, subtitle, count }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center">
        <Icon size={18} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-dark-text">{title}</h2>
          {typeof count === 'number' && (
            <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-dark-muted">
              {count}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-500 dark:text-dark-muted">{subtitle}</p>}
      </div>
    </div>
  );
}