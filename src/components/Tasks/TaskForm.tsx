import React, { useState } from 'react';
import { Task } from '../../types/Task';  
import { supabase } from '../../supaBaseClient';  

interface TaskFormProps {
  onAddTask: (task: Task) => void;  
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState<string>('');  
  const [dueDate, setDueDate] = useState<string>('');     
  const [reminderTime, setReminderTime] = useState<string>('');  
  const [loading, setLoading] = useState<boolean>(false); // For loading state

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Task Data:', {
      name: taskName,
      completed: false,
      dueDate: dueDate || null,
      reminderTime: reminderTime || null,
    });
    
  
    const newTask = {
      name: taskName,
      completed: false,
      dueDate: dueDate || null,
      reminderTime: reminderTime || null, // Make sure this is in TIME format
    };
    
  
    try {
      // Insert task into Supabase
      const { data, error } = await supabase.from('tasks').insert([newTask]);
  
      if (error) {
        throw error;
      }
  
      if (data) {
        onAddTask(data[0]);  // Update state with the new task (data[0] is the first task in the array)
      }
  
      // Reset form
      setTaskName('');
      setDueDate('');
      setReminderTime('');
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-md">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="time"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full py-2 bg-[#001514] text-white font-semibold rounded-md hover:bg-[#A3320B] transition duration-200"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
