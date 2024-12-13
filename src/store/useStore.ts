import { create } from 'zustand';
import { TimeBlock, Task, Category } from '../types';
import { openDB } from 'idb';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Store {
  timeBlocks: TimeBlock[];
  tasks: Task[];
  categories: Category[];
  addTimeBlock: (block: TimeBlock) => void;
  updateTimeBlock: (block: TimeBlock) => void;
  deleteTimeBlock: (id: string) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  addCategory: (category: Category) => void;
}

const dbPromise = openDB('timeBlockDB', 1, {
  upgrade(db) {
    db.createObjectStore('timeBlocks', { keyPath: 'id' });
    db.createObjectStore('tasks', { keyPath: 'id' });
    db.createObjectStore('categories', { keyPath: 'id' });
  },
});

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      timeBlocks: [],
      tasks: [],
      categories: [],

      addTimeBlock: async (block) => {
        const db = await dbPromise;
        await db.put('timeBlocks', block);
        set((state) => ({ timeBlocks: [...state.timeBlocks, block] }));
      },

      updateTimeBlock: async (block) => {
        const db = await dbPromise;
        await db.put('timeBlocks', block);
        set((state) => ({
          timeBlocks: state.timeBlocks.map((b) => (b.id === block.id ? block : b)),
        }));
      },

      deleteTimeBlock: async (id) => {
        const db = await dbPromise;
        await db.delete('timeBlocks', id);
        set((state) => ({
          timeBlocks: state.timeBlocks.filter((block) => block.id !== id),
        }));
      },

      addTask: async (task) => {
        const db = await dbPromise;
        await db.put('tasks', task);
        set((state) => ({ tasks: [...state.tasks, task] }));
      },

      updateTask: async (task) => {
        const db = await dbPromise;
        await db.put('tasks', task);
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        }));
      },

      deleteTask: async (id) => {
        const db = await dbPromise;
        await db.delete('tasks', id);
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      addCategory: async (category) => {
        const db = await dbPromise;
        await db.put('categories', category);
        set((state) => ({ categories: [...state.categories, category] }));
      },
    }),
    {
      name: 'timeblock-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);