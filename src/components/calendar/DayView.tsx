import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { addMinutes, startOfDay, setHours, setMinutes } from 'date-fns';
import { useStore } from '../../store/useStore';
import { useCalendarStore } from '../../store/useCalendarStore';
import { TimeScaleControls } from './TimeScaleControls';
import { DraggableTask } from './DraggableTask';
import { DroppableTimeSlot } from './DroppableTimeSlot';
import { createTimeSlotDate } from '../../utils/dateUtils';

export const DayView: React.FC = () => {
  const { currentDate, timeScale } = useCalendarStore();
  const { tasks, updateTask } = useStore();
  
  const startTime = setHours(setMinutes(startOfDay(currentDate), 0), timeScale.start);
  const slots = Math.floor((timeScale.end - timeScale.start) * 60 / timeScale.interval);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      const task = tasks.find(t => t.id === active.id);
      const dropTime = new Date(over.id);
      
      if (task && dropTime) {
        updateTask({
          ...task,
          startTime: dropTime.toISOString(),
          endTime: addMinutes(dropTime, task.duration).toISOString(),
        });
      }
    }
  };

  const getSlotTasks = (slotTime: Date) => {
    return tasks.filter(task => {
      if (!task.startTime) return false;
      const taskStart = new Date(task.startTime);
      return taskStart.getHours() === slotTime.getHours() && 
             taskStart.getMinutes() === slotTime.getMinutes();
    });
  };

  return (
    <div className="space-y-4">
      <TimeScaleControls />
      
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4">
          <div className="w-64 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Available Tasks</h3>
            <div className="space-y-2">
              {tasks
                .filter(task => !task.startTime || task.isRecurring)
                .map(task => (
                  <DraggableTask key={task.id} task={task} />
                ))}
            </div>
          </div>

          <div className="flex-1 h-[calc(100vh-16rem)] overflow-y-auto">
            {Array.from({ length: slots }, (_, index) => {
              const time = addMinutes(startTime, index * timeScale.interval);
              const slotTasks = getSlotTasks(time);

              return (
                <DroppableTimeSlot
                  key={time.toISOString()}
                  time={time}
                  interval={timeScale.interval}
                  tasks={slotTasks}
                />
              );
            })}
          </div>
        </div>
      </DndContext>
    </div>
  );
};