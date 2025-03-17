import { supabase } from '../supaBaseClient';

export interface Task {
  id: string;
  name: string;
  completed: boolean;
  dueDate?: string;  
  reminderTime?: string;  
}

// Fetch tasks from Supabase
export const getTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) throw new Error(error.message);
  return data;
};

// Add a new task in Supabase
export const addTask = async (task: Task): Promise<Task> => {
  const { data, error } = await supabase.from('tasks').insert([task]).select();
  if (error) throw new Error(error.message);
  return data[0];
};

// Remove a task from Supabase
export const removeTask = async (id: string): Promise<void> => {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw new Error(error.message);
};

