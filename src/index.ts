import { TaskService } from "./taskController/TaskService";
import { TaskController } from "./taskController/TaskController";
import { Bug } from "./taskController/Bug";
import { BaseTask } from "./taskController/BaseTask";
import { Epic } from "./taskController/Epic";
import { Story } from "./taskController/Story";
import { Subtask } from "./taskController/Subtask";

const taskService = new TaskService();
const taskController = new TaskController(taskService);

const newTask = taskController.createTask({
  title: "Learn TypeScript",
  description: "Complete TypeScript tutorial",
  status: "todo",
  priority: "medium",
  createdAt: new Date(),
  deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
});

console.log("New task created:", newTask);

if (newTask) {
  const taskById = taskController.getTaskById(newTask.id);
  console.log("Task by ID:", taskById);

  const info = taskController.getTaskInfo(newTask.id);
  console.log(info);
}

const filteredTasks = taskController.filterTasks({ status: "todo" });
console.log("Filtered tasks:", filteredTasks);

if (newTask) {
  const completedBeforeDeadline = taskController.isTaskCompletedBeforeDeadline(
    newTask.id,
  );
  console.log("Completed before deadline:", completedBeforeDeadline);
}

if (newTask) {
  const deleted = taskController.deleteTask(newTask.id);
  console.log("Deleted:", deleted);
}

const task1 = new BaseTask({ id: "1", title: "Learn TS" });
const bug1 = new Bug("high", { id: "2", title: "Login error" });
const epic = new Epic([task1, bug1], { id: "100", title: "Frontend Release" });

const story = new Story(13, {
  id: "st-001",
  title: "Implement user registration flow",
  description: "Allow users to sign up using email and password",
  priority: "high",
  deadline: new Date("2025-12-01"),
});
console.log(story.getTaskInfo());

const subtask = new Subtask("st-001", {
  id: "sub-001",
  title: "Create registration form UI",
  description: "Design and implement form for user registration",
  priority: "high",
  status: "in_progress",
});



console.log(subtask.getTaskInfo());
