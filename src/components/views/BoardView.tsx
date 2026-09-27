import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Column } from '@/components/ui/Column';
import { STATUSES, type Status } from '@/types';
import { useProjectStore } from '@/store/projectStore';

export function BoardView({
  project,
  dragOverColumn,
  setDragOverColumn,
  onIssueClick,
}: {
  project: ReturnType<typeof useProjectStore.getState>['project'];
  dragOverColumn: Status | null;
  setDragOverColumn: (status: Status | null) => void;
  onIssueClick: (issue: any) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const columns = STATUSES.map((s) => s.value);

  const resolveStatus = (overId: string): Status | null => {
    if ((columns as string[]).includes(overId)) return overId as Status;
    const overIssue = project?.issues.find((i) => i.id === overId);
    return overIssue?.status ?? null;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDragOverColumn(null);
    const { active, over } = event;
    if (!over) return;

    const issueId = active.id as string;
    const newStatus = resolveStatus(over.id as string);
    const issue = project?.issues.find((i) => i.id === issueId);
    if (!issue || !newStatus || issue.status === newStatus) return;

    useProjectStore.getState().moveIssue(issueId, newStatus);
  };

  const columnIssues = columns.map((status) =>
    project?.issues
      .filter((i) => i.status === status)
      .sort((a, b) => {
        const priorityOrder = { critical: 3, high: 2, medium: 1, low: 0 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }) || []
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => setDragOverColumn(e.over ? resolveStatus(e.over.id as string) : null)}
    >
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1" style={{ minHeight: 'calc(100vh - 220px)' }}>
        {columns.map((status, index) => (
          <Column
            key={status}
            status={status}
            issues={columnIssues[index]}
            isDragOver={dragOverColumn === status}
            onIssueClick={onIssueClick}
          />
        ))}
      </div>
    </DndContext>
  );
}
