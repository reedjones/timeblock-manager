import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Task } from '../types';
import { Plus, Tag, Calendar as CalendarIcon } from 'lucide-react';
import { createDefaultTask } from '../utils/taskUtils';

export const TaskList: React.FC = () => {
  const { tasks, addTask } = useStore();
  const [newTask, setNewTask] = useState<Partial<Task>>(createDefaultTask({}));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(createDefaultTask(newTask));
    setNewTask(createDefaultTask({}));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Tag className="w-6 h-6 mr-2 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="space-y-4">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Task title"
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            placeholder="Description"
            className="w-full p-2 border rounded-lg"
          />
          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                priority: e.target.value as Task['priority'],
              })
            }
            className="w-full p-2 border rounded-lg"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-lg flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{task.title}</h3>
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
            <p className="text-gray-600 text-sm mb-2">{task.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
