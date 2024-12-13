import { create } from 'zustand';
import { CalendarState, CalendarView, TimeScale } from '../types/calendar';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

interface CalendarStore extends CalendarState {
  timeScale: TimeScale;
  setTimeScale: (scale: TimeScale) => void;
  setCurrentDate: (date: Date) => void;
  setView: (view: CalendarView) => void;
  setSelectedTimeRange: (start: Date, end: Date) => void;
  getViewRange: () => { start: Date; end: Date };
}

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  currentDate: new Date(),
  view: 'day',
  selectedTimeRange: null,
  timeScale: {
    interval: 30,
    start: 0,
    end: 24,
  },

  setTimeScale: (scale) => set({ timeScale: scale }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setView: (view) => set({ view }),
  setSelectedTimeRange: (start, end) => set({ selectedTimeRange: { start, end } }),

  getViewRange: () => {
    const { currentDate, view } = get();
    switch (view) {
      case 'day':
        return {
          start: startOfDay(currentDate),
          end: endOfDay(currentDate),
        };
      case 'week':
        return {
          start: startOfWeek(currentDate),
          end: endOfWeek(currentDate),
        };
      case 'month':
        return {
          start: startOfMonth(currentDate),
          end: endOfMonth(currentDate),
        };
    }
  },
}));