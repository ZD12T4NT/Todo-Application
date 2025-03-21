import React from 'react';
import { Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
  onRemove: (id: string) => void;  // onRemove expects 'id', which is used correctly
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-white border rounded-lg shadow-md">
      <span>{task.name}</span>
      <button
        className="text-red-500"
        onClick={() => onRemove(task.id)}  // task.id used to remove task
      >
        Remove
      </button>
    </div>
  );
};

export default TaskItem;
