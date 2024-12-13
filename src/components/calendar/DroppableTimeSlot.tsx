import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Task } from '../../types';
import { formatTimeSlot } from '../../utils/dateUtils';
import { ResizableTask } from './ResizableTask';
import { useStore } from '../../store/useStore';

interface Props {
  time: Date;
  interval: number;
  tasks: Task[];
}

export const DroppableTimeSlot: React.FC<Props> = ({ time, interval, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: time.toISOString(),
    data: { time, interval },
  });
  
  const { updateTask } = useStore();

  const handleResize = (taskId: string, newDuration: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const startTime = new Date(task.startTime!);
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + newDuration);
      
      updateTask({
        ...task,
        duration: newDuration,
        endTime: endTime.toISOString(),
      });
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex border-b border-gray-200 transition-colors ${
        isOver ? 'bg-indigo-50' : ''
      }`}
      style={{ height: `${interval}px` }}
    >
      <div className="w-20 pr-2 text-right text-sm text-gray-500 flex-shrink-0">
        {formatTimeSlot(time)}
      </div>
      <div className="flex-1 relative">
        {tasks.map((task) => (
          <ResizableTask
            key={task.id}
            task={task}
            interval={interval}
            onResize={(newDuration) => handleResize(task.id, newDuration)}
          />
        ))}
      </div>
    </div>
  );
};