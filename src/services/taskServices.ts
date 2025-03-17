import { supabase } from '../supaBaseClient';
import type { Task } from '../types/Task';  // ✅ Use type import to avoid circular issue

// Fetch tasks from Supabase
export const getTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) throw new Error(error.message);
  return data;
};

// Add a new task in Supabase
export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => { // ✅ Remove 'id' when inserting
  const { data, error } = await supabase.from('tasks').insert([task]).select().single();
  if (error) throw new Error(error.message);
  return data;
};

// Remove a task from Supabase
export const removeTask = async (id: string): Promise<void> => {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw new Error(error.message);
};
