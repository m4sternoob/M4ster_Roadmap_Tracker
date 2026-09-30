import { useState, useMemo } from 'react';
import { X, Filter } from 'lucide-react';
import type { Status, Priority, IssueType } from '@/types';
import { PRIORITIES, ISSUE_TYPES, STATUSES } from '@/types';
import { useProjectStore } from '@/store/projectStore';

interface ColumnFilterProps {
  status: Status;
}

const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

const TYPE_LABELS: Record<IssueType, string> = {
  epic: 'Epic',
  story: 'Story',
  task: 'Task',
  subtask: 'Subtask',
  bug: 'Bug',
};

export function ColumnFilter({ status }: ColumnFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<{
    priority: Priority[];
    type: IssueType[];
    assignee: string;
    labels: string[];
  }>({
    priority: [],
    type: [],
    assignee: '',
    labels: [],
  });

  const { searchIssues } = useProjectStore.getState();

  // Get unique assignees and labels for this column
  const columnIssues = useMemo(() => searchIssues({ status: [status] }), [searchIssues, status]);
  const assignees = useMemo(
    () => [...new Set(columnIssues.map((i) => i.assignee).filter(Boolean))] as string[],
    [columnIssues]
  );
  const allLabels = useMemo(
    () => [...new Set(columnIssues.flatMap((i) => i.labels))],
    [columnIssues]
  );

  const hasActiveFilters =
    filters.priority.length > 0 ||
    filters.type.length > 0 ||
    filters.assignee ||
    filters.labels.length > 0;

  const handlePriorityToggle = (p: Priority) => {
    setFilters((prev) => ({
      ...prev,
      priority: prev.priority.includes(p)
        ? prev.priority.filter((x) => x !== p)
        : [...prev.priority, p],
    }));
  };

  const handleTypeToggle = (t: IssueType) => {
    setFilters((prev) => ({
      ...prev,
      type: prev.type.includes(t) ? prev.type.filter((x) => x !== t) : [...prev.type, t],
    }));
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, assignee: e.target.value }));
  };

  const handleLabelToggle = (label: string) => {
    setFilters((prev) => ({
      ...prev,
      labels: prev.labels.includes(label)
        ? prev.labels.filter((x) => x !== label)
        : [...prev.labels, label],
    }));
  };

  const clearFilters = () => {
    setFilters({ priority: [], type: [], assignee: '', labels: [] });
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg text-slate-500 dark:text-dark-muted hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-dark-text transition-colors flex items-center gap-1.5 ${hasActiveFilters ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : ''}`}
        aria-label={`Filter ${status} column${hasActiveFilters ? ' (active)' : ''}`}
        title={`Filter ${STATUSES.find((s) => s.value === status)?.label} column${hasActiveFilters ? ' - active' : ''}`}
      >
        <Filter size={16} />
        {hasActiveFilters && <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />}
      </button>

      {/* Filter Dropdown */}
      {isOpen && (
        <div className="fixed z-50 mt-2 w-72 bg-white dark:bg-dark-card rounded-xl border border-slate-200 dark:border-dark-border shadow-xl animate-scale-in">
          <div className="p-3 border-b border-slate-200 dark:border-dark-border flex items-center justify-between">
            <h3 className="font-semibold text-sm">
              Filter {STATUSES.find((s) => s.value === status)?.label}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-3 space-y-4 max-h-[60vh] overflow-y-auto">
            {/* Priority */}
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-dark-muted mb-2">
                Priority
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PRIORITIES.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => handlePriorityToggle(p.value)}
                    className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                      filters.priority.includes(p.value)
                        ? `text-white`
                        : 'text-slate-600 dark:text-dark-muted hover:text-slate-900 dark:hover:text-dark-text'
                    }`}
                    style={{
                      backgroundColor: filters.priority.includes(p.value)
                        ? p.color
                        : p.color + '20',
                    }}
                  >
                    {PRIORITY_LABELS[p.value]}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-dark-muted mb-2">
                Type
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ISSUE_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => handleTypeToggle(t.value)}
                    className={`px-2 py-1 text-xs font-medium rounded-full transition-colors flex items-center gap-1 ${t.icon} ${filters.type.includes(t.value) ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-dark-muted hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                  >
                    {TYPE_LABELS[t.value]}
                  </button>
                ))}
              </div>
            </div>

            {/* Assignee */}
            {assignees.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-dark-muted mb-2">
                  Assignee
                </label>
                <select
                  value={filters.assignee}
                  onChange={handleAssigneeChange}
                  className="w-full px-2 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-dark-border rounded-lg text-inherit focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All assignees</option>
                  {assignees.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Labels */}
            {allLabels.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-dark-muted mb-2">
                  Labels
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                  {allLabels.map((label) => (
                    <button
                      key={label}
                      onClick={() => handleLabelToggle(label)}
                      className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                        filters.labels.includes(label)
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-dark-muted hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clear button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
