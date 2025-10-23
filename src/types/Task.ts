export interface TaskData {
  title: string;
  description?: string;
  status?: "todo" | "in-progress" | "done";
  priority?: "low" | "medium" | "high";
  deadline?: string;
}

export interface Task extends TaskData {
  id: string;
}