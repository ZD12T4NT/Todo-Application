import React, { useState } from 'react';
import { Task } from '../../types/Task';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface TaskFormProps {
  onAddTask: (task: Task) => void;  // Callback to handle adding the task
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState<string>('');    // For task name
  const [dueDate, setDueDate] = useState<string>('');       // For task due date (optional)
  const [reminderTime, setReminderTime] = useState<string>(''); // For task reminder (optional)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Create a new task object (without ID, since Firestore generates it)
    const newTask: Omit<Task, "id"> = {
      name: taskName,
      completed: false,
      dueDate: dueDate || undefined,
      reminderTime: reminderTime || undefined,
    };
  
    try {
      // Add task to Firestore and get the auto-generated ID
      const docRef = await addDoc(collection(db, "tasks"), newTask);
  
      // Call onAddTask to update state with Firestore ID
      onAddTask({ id: docRef.id, ...newTask });
  
      // Reset the form fields
      setTaskName('');
      setDueDate('');
      setReminderTime('');
    } catch (error) {
      console.error("Error adding task:", error);
    }
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
