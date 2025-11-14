import { TaskController } from "./TaskController/TaskController.ts";
import type { Task, TaskData } from "./types/Task.ts";

const taskController = new TaskController();

const taskList = document.getElementById("taskList") as HTMLUListElement;
const taskForm = document.getElementById("taskForm") as HTMLFormElement;
const descr = document.querySelector(".descr") as HTMLFormElement;
const errorMessage = document.querySelector(".error-message") as HTMLElement;

async function renderTasks() {
  const tasks: Task[] = await taskController.getAllTasks();
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.classList.add("item");
    li.innerHTML = `<span>${task.title}</span><span>${task.status}</span><span>${task.priority}</span><span>${
      task.deadline ? new Date(task.deadline).toLocaleDateString() : "-"
    }</span><button class="remove">Remove</button>`;
    taskList.appendChild(li);
  });
}

function taskEvents() {
  const container = document.querySelector<HTMLElement>("#taskList");
  if (!container) return;

  container.addEventListener("click", async (evt) => {
    const target = evt.target as HTMLElement;
    const item = target.closest(".item") as HTMLElement | null;
    if (!item) return;
    const id = item.dataset.id;

    try {
      if (target.classList.contains("remove")) {
        if (!id) return;
        const deleted = await taskController.deleteTask(id);

        if (deleted) {
          descr.textContent = ``;
          errorMessage.textContent = "";
          renderTasks();
        } else {
          errorMessage.textContent = `Failed to delete task ${id}`;
          console.error("Failed to delete task", id);
        }
      } else {
        if (!id) return;
        const task: Task | null = await taskController.findTaskById(id);

        if (task) {
          descr.textContent = `${task.description}`;
          errorMessage.textContent = "";
        }
      }
    } catch (err) {
      console.error(err);
      errorMessage.textContent = "An error occurred while processing the task";
    }
  });
}
taskEvents();

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMessage.textContent = "";

  try {
    const data = Object.fromEntries(new FormData(taskForm));

    const newTask: TaskData = {
      title: data.title.toString(),
      description: data.description.toString() || "",
      status: data.status as TaskData["status"],
      priority: data.priority as TaskData["priority"],
      deadline: data.deadline
        ? new Date(data.deadline as string).toISOString()
        : undefined,
    };

    const createdTask = await taskController.createTask(newTask);

    if (createdTask) {
      await renderTasks();
      taskForm.reset();
    } else {
      errorMessage.textContent = "Failed to create task";
    }
  } catch (err) {
    console.error(err);
    errorMessage.textContent = "An error occurred while creating the task";
  }
});

await renderTasks();
