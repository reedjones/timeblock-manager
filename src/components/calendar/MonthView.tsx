import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { useCalendarStore } from '../../store/useCalendarStore';
import { useStore } from '../../store/useStore';

export const MonthView: React.FC = () => {
  const { currentDate } = useCalendarStore();
  const { tasks } = useStore();
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="grid grid-cols-7 gap-1 h-[calc(100vh-12rem)] overflow-y-auto">
      {days.map((day) => (
        <div
          key={day.toISOString()}
          className={`border p-2 min-h-[100px] ${
            !isSameMonth(day, currentDate) ? 'bg-gray-50' : ''
          }`}
        >
          <div className="text-sm font-semibold mb-1">{format(day, 'd')}</div>
          <div className="space-y-1">
            {tasks
              .filter((task) => isSameDay(new Date(task.dueDate), day))
              .map((task) => (
                <div
                  key={task.id}
                  className="text-xs bg-indigo-100 border-l-2 border-indigo-600 p-1 rounded truncate"
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