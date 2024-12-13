import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useCalendarStore } from '../../store/useCalendarStore';
import { format, addDays, subDays, addWeeks, subWeeks, addMonths, subMonths } from 'date-fns';
import { CalendarView } from '../../types/calendar';

export const CalendarHeader: React.FC = () => {
  const { currentDate, view, setCurrentDate, setView } = useCalendarStore();

  const handleNavigate = (direction: 'prev' | 'next') => {
    const modifier = direction === 'prev' ? -1 : 1;
    switch (view) {
      case 'day':
        setCurrentDate(direction === 'prev' ? subDays(currentDate, 1) : addDays(currentDate, 1));
        break;
      case 'week':
        setCurrentDate(direction === 'prev' ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1));
        break;
      case 'month':
        setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
        break;
    }
  };

  const views: CalendarView[] = ['day', 'week', 'month'];

  return (
    <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <Calendar className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">
          {format(currentDate, view === 'day' ? 'MMMM d, yyyy' : view === 'week' ? "'Week of' MMMM d" : 'MMMM yyyy')}
        </h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex space-x-2">
          {views.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded ${
                view === v ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => handleNavigate('prev')}
            className="p-2 rounded hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 rounded hover:bg-gray-100"
          >
            Today
          </button>
          <button
            onClick={() => handleNavigate('next')}
            className="p-2 rounded hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};