import { Task } from '../types';

export const DEFAULT_TASK_DURATION = 30; // minutes
export const DEFAULT_COLORS = [
  '#4f46e5', // indigo
  '#0891b2', // cyan
  '#059669', // emerald
  '#d97706', // amber
  '#dc2626', // red
  '#7c3aed', // violet
];

export const createDefaultTask = (partial: Partial<Task>): Task => ({
  id: crypto.randomUUID(),
  title: '',
  description: '',
  tags: [],
  duration: DEFAULT_TASK_DURATION,
  color: DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
  isRecurring: false,
  priority: 'medium',
  dueDate: partial.dueDate || new Date(),
  completed: false,
  ...partial,
});
