import { Task } from '../types/Task';

const TASK_API_URL = '/api/tasks'; // replace with your actual API endpoint

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(TASK_API_URL);
  return response.json();
};

export const addTask = async (task: Task): Promise<Task> => {
  const response = await fetch(TASK_API_URL, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};

export const removeTask = async (id: string): Promise<void> => {
  await fetch(`${TASK_API_URL}/${id}`, { method: 'DELETE' });
};
