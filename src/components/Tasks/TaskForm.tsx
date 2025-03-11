import React, { useState } from 'react';
import { Task } from '../../types/Task';

interface TaskFormProps {
  onAddTask: (task: Task) => void;  // Callback to handle adding the task
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState<string>('');    // For task name
  const [dueDate, setDueDate] = useState<string>('');       // For task due date (optional)
  const [reminderTime, setReminderTime] = useState<string>(''); // For task reminder (optional)

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new task object
    const newTask: Task = {
      id: Date.now().toString(),  // Generate a unique ID
      name: taskName,             // Task name from the input
      completed: false,           // Task is not completed initially
      dueDate: dueDate || undefined, // Optional due date
      reminderTime: reminderTime || undefined, // Optional reminder time
    };

    // Call the onAddTask prop to add the task
    onAddTask(newTask);

    // Reset the form fields
    setTaskName('');
    setDueDate('');
    setReminderTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-md">
      {/* Task Name */}
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      
      {/* Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Reminder Time */}
      <input
        type="time"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
