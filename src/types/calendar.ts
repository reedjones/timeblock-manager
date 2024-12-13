export type CalendarView = 'day' | 'week' | 'month';

export interface TimeRange {
  start: Date;
  end: Date;
}

export interface CalendarState {
  currentDate: Date;
  view: CalendarView;
  selectedTimeRange: TimeRange | null;
}

export interface TimeSlot {
  id: string;
  start: Date;
  end: Date;
  isOccupied: boolean;
}