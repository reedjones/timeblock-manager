import React from 'react';
import { useStore } from '../store/useStore';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { format } from 'date-fns';
import { Clock, Calendar } from 'lucide-react';

export const TimeBlockGrid: React.FC = () => {
  const { timeBlocks, tasks, updateTask } = useStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      updateTask({
        ...tasks.find((t) => t.id === active.id)!,
        blockId: over.id as string,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Time Blocks</h2>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid gap-4">
          {timeBlocks.map((block) => (
            <div
              key={block.id}
              className="p-4 rounded-lg border-2"
              style={{ borderColor: block.color }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{block.title}</h3>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>
                    {format(new Date(`2024-01-01T${block.startTime}`), 'h:mm a')} -{' '}
                    {format(new Date(`2024-01-01T${block.endTime}`), 'h:mm a')}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {tasks
                  .filter((task) => task.blockId === block.id)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-gray-50 p-2 rounded flex items-center justify-between"
                    >
                      <span>{task.title}</span>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          task.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
};