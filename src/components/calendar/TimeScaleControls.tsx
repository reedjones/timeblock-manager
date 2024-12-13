import React from 'react';
import { Minus, Plus, Clock } from 'lucide-react';
import { useCalendarStore } from '../../store/useCalendarStore';

export const TimeScaleControls: React.FC = () => {
  const { timeScale, setTimeScale } = useCalendarStore();

  const handleIntervalChange = (delta: number) => {
    const newInterval = Math.max(5, Math.min(60, timeScale.interval + delta));
    setTimeScale({ ...timeScale, interval: newInterval });
  };

  const handleRangeChange = (startDelta: number, endDelta: number) => {
    const newStart = Math.max(0, Math.min(23, timeScale.start + startDelta));
    const newEnd = Math.max(0, Math.min(24, timeScale.end + endDelta));
    
    if (newEnd > newStart) {
      setTimeScale({ ...timeScale, start: newStart, end: newEnd });
    }
  };

  return (
    <div className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg">
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-2 text-gray-600" />
        <span className="text-sm font-medium">Interval:</span>
        <button
          onClick={() => handleIntervalChange(-5)}
          className="ml-2 p-1 rounded hover:bg-gray-200"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="mx-2 text-sm">{timeScale.interval}min</span>
        <button
          onClick={() => handleIntervalChange(5)}
          className="p-1 rounded hover:bg-gray-200"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center">
        <span className="text-sm font-medium">Range:</span>
        <select
          value={timeScale.start}
          onChange={(e) => handleRangeChange(parseInt(e.target.value) - timeScale.start, 0)}
          className="ml-2 text-sm border rounded p-1"
        >
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={i}>
              {i.toString().padStart(2, '0')}:00
            </option>
          ))}
        </select>
        <span className="mx-2">-</span>
        <select
          value={timeScale.end}
          onChange={(e) => handleRangeChange(0, parseInt(e.target.value) - timeScale.end)}
          className="text-sm border rounded p-1"
        >
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={i + 1}>
              {(i + 1).toString().padStart(2, '0')}:00
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};