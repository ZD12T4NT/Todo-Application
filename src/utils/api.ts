// api.ts
const BASE_URL = 'http://127.0.0.1:5000/api/auth/login';  // Replace with your actual API endpoint

// Helper function to handle GET requests
const fetchData = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

// Helper function to handle POST requests
const postData = async (url: string, data: object) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

// Example function to fetch tasks
export const getTasks = async () => {
  return fetchData('/tasks');  // Replace '/tasks' with the actual endpoint
};

// Example function to add a new task
export const addTask = async (taskData: object) => {
  return postData('/tasks', taskData);  // Replace '/tasks' with the actual endpoint
};

// Example function to delete a task
export const deleteTask = async (taskId: string) => {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  return await response.json();
};

// Example function to authenticate a user
export const authenticateUser = async (email: string, password: string) => {
  const data = { email, password };
  return postData('/auth/login', data);  // Replace '/auth/login' with your actual login endpoint
};
