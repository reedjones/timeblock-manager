import React from 'react';
import { Task } from '../../types';

interface Props {
  task: Task;
  onResize: (newDuration: number) => void;
  interval: number;
}

export const ResizableTask: React.FC<Props> = ({ task, onResize, interval }) => {
  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent, edge: 'top' | 'bottom') => {
    e.stopPropagation();
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const startDuration = task.duration;
    
    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const deltaY = currentY - startY;
      const deltaMinutes = Math.round((deltaY / interval) * 30); // 30 minutes per interval height
      
      const newDuration = edge === 'bottom' 
        ? Math.max(30, Math.min(600, startDuration + deltaMinutes))
        : Math.max(30, Math.min(600, startDuration - deltaMinutes));
      
      onResize(newDuration);
    };
    
    const handleEnd = () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
    
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);
  };

  return (
    <div
      className="absolute left-0 right-0 group"
      style={{
        top: 0,
        height: `${(task.duration / interval) * 100}%`,
        backgroundColor: `${task.color}20`,
        borderLeft: `4px solid ${task.color}`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize opacity-0 group-hover:opacity-100 bg-gray-400"
        onMouseDown={(e) => handleResizeStart(e, 'top')}
        onTouchStart={(e) => handleResizeStart(e, 'top')}
      />
      <div className="p-1 text-sm">
        <div className="font-medium">{task.title}</div>
        <div className="text-xs text-gray-600">
          {Math.floor(task.duration / 60)}h {task.duration % 60}m
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize opacity-0 group-hover:opacity-100 bg-gray-400"
        onMouseDown={(e) => handleResizeStart(e, 'bottom')}
        onTouchStart={(e) => handleResizeStart(e, 'bottom')}
      />
    </div>
  );
};