import React from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { useCalendarStore } from '../../store/useCalendarStore';
import { useStore } from '../../store/useStore';

export const WeekView: React.FC = () => {
  const { currentDate } = useCalendarStore();
  const { tasks } = useStore();
  
  const weekStart = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="grid grid-cols-7 gap-4 h-[calc(100vh-12rem)] overflow-y-auto">
      {weekDays.map((day) => (
        <div key={day.toISOString()} className="border rounded-lg p-2">
          <div className="text-center font-semibold mb-2">
            {format(day, 'EEE d')}
          </div>
          <div className="space-y-2">
            {tasks
              .filter((task) => isSameDay(new Date(task.dueDate), day))
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-indigo-100 border-l-4 border-indigo-600 p-2 rounded"
                >
                  {task.title}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};