type Priority = "Low" | "Medium" | "High";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string; // "YYYY-MM-DD"
  completed: boolean;
};