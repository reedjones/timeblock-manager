import React from 'react';
import { CalendarHeader } from './CalendarHeader';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { MonthView } from './MonthView';
import { useCalendarStore } from '../../store/useCalendarStore';

export const Calendar: React.FC = () => {
  const { view } = useCalendarStore();

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <CalendarHeader />
      <div className="p-4">
        {view === 'day' && <DayView />}
        {view === 'week' && <WeekView />}
        {view === 'month' && <MonthView />}
      </div>
    </div>
  );
};