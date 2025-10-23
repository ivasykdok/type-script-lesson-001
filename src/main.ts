import { TaskController } from "./TaskController/TaskController.ts";
import type { Task, TaskData } from "./types/Task.ts";

const taskController = new TaskController();

const taskList = document.getElementById("taskList") as HTMLUListElement;
const taskForm = document.getElementById("taskForm") as HTMLFormElement;
const descr = document.querySelector(".descr") as HTMLFormElement;

async function renderTasks() {
  const tasks: Task[] = await taskController.getAllTasks();
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.classList.add("item");
    li.innerHTML = `<span>${task.title}</span><span>${task.status}</span><span>${task.priority}</span><span>${
      task.deadline ? new Date(task.deadline).toLocaleDateString() : "-"
    }</span><button id="${task.id}" class="remove">Remove</button>`;
    taskList.appendChild(li);
  });
  initButtons();
  readInfoTask();
}

function initButtons() {
  const removes = document.querySelectorAll<HTMLButtonElement>(".remove");
  removes.forEach((remove) => {
    remove.addEventListener("click", async function (evt) {
      const target = evt.target as HTMLButtonElement;

      if (!target) return;

      const deleted = await taskController.deleteTask(this.id);

      if (deleted) {
        await renderTasks();
        descr.textContent = ``;
      } else {
        console.error("Failed to delete task", this.id);
      }
    });
  });
}
function readInfoTask() {
  const removes = document.querySelectorAll<HTMLButtonElement>(".item");
  removes.forEach(item => {
    item.addEventListener('click', async function() {
      const taskId = this.dataset.id;
      if (!taskId) return;
      
      const task : Task | null = await taskController.findTaskById(taskId);

      if(task) {
        descr.textContent = `${task.description}`;
      }
    })
  })
}

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(taskForm);
  const newTask: TaskData = {
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || "",
    status: formData.get("status") as TaskData["status"],
    priority: formData.get("priority") as TaskData["priority"],
    deadline: formData.get("deadline")
      ? new Date(formData.get("deadline") as string).toISOString()
      : undefined,
  };

  const createdTask = await taskController.createTask(newTask);
  if (createdTask) {
    await renderTasks();
    taskForm.reset();
  }
});

await renderTasks();
