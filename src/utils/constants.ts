export const SPRINT_STATUS_STYLES: Record<string, string> = {
  planning: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-dark-muted',
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  completed: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
};

export const EPIC_COLORS = [
  '#8b5cf6', '#0ea5e9', '#22c55e', '#f59e0b', '#ef4444',
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
];

export const PRIORITY_COLORS: Record<string, string> = {
  low: '#64748b',
  medium: '#0ea5e9',
  high: '#f59e0b',
  critical: '#ef4444',
};

export const STATUS_COLORS: Record<string, string> = {
  backlog: '#64748b',
  todo: '#0ea5e9',
  'in-progress': '#f59e0b',
  review: '#8b5cf6',
  done: '#22c55e',
  planning: '#64748b',
  active: '#22c55e',
  completed: '#0ea5e9',
};