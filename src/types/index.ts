export interface TimeBlock {
  id: string;
  title: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  category: string;
  color: string;
  isRecurring: boolean;
  recurringDays?: number[]; // 0-6 for days of week
}

export interface Task {
  id: string;
  title: string;
  description: string;
  tags: string[];
  startTime?: string;
  endTime?: string;
  duration: number; // in minutes
  color: string;
  isRecurring: boolean;
  recurringDays?: number[];
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dueDate?: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface TimeScale {
  interval: number; // minutes per interval
  start: number; // hour to start display (0-23)
  end: number; // hour to end display (0-23)
}