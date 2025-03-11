export interface Task {
    id: string;          // Unique identifier for the task
    name: string;        // Name of the task
    completed: boolean;  // Status of the task (completed or not)
    dueDate?: string;    // Optional due date for the task (ISO string format)
    reminderTime?: string; // Optional reminder time (ISO string format for reminder)
  }
  