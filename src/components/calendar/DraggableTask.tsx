import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../types';

interface Props {
  task: Task;
}

export const DraggableTask: React.FC<Props> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task,
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2 rounded-lg cursor-move border-l-4 ${
        task.isRecurring ? 'border-dashed' : ''
      }`}
      style={{
        ...style,
        backgroundColor: `${task.color}20`,
        borderLeftColor: task.color,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{task.title}</span>
        {task.isRecurring && (
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">Recurring</span>
        )}
      </div>
      {task.duration && (
        <div className="text-xs text-gray-600 mt-1">
          {Math.floor(task.duration / 60)}h {task.duration % 60}m
        </div>
      )}
    </div>
  );
};