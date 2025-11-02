import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  createTask,
  fetchAllTasks,
  statuses,
  type Task,
} from "../api/createTasksApi.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  taskStatus: z.enum(statuses).default("todo"),
  createdAt: z.string().optional(),
  deadline: z.string().nullable().optional(),
});

export type CreateTaskData = z.infer<typeof taskSchema>;

const CreateTaskForm = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors, touchedFields },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(taskSchema),
  });

  const fetchTaskData = async () => {
    const results = await fetchAllTasks();

    setTasks(results);
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  const onSubmit = async (data: CreateTaskData) => {
    const results = await createTask({
      ...data,
      createdAt: new Date().toISOString(),
      deadline: data.deadline ? new Date(data.deadline).toISOString() : null,
    });

    if (results.id) {
      await fetchTaskData();
      reset();
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="insert_data">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`wrap ${touchedFields.title && errors.title ? "error" : ""}`}
            >
              <label htmlFor="title">Title:</label>
              <input
                id={"title"}
                type="text"
                {...register("title", { required: "Field is required" })}
              />
              {errors.title && (
                <div className={"box-error"}>{errors.title?.message}</div>
              )}
            </div>

            <div className="wrap">
              <label htmlFor="description">Description:</label>
              <textarea id={"description"} {...register("description")} />
            </div>

            <div className="wrap">
              <label htmlFor="statuses"></label>
              <select id="statuses" {...register("taskStatus")}>
                {statuses.map((status, index) => {
                  return (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="wrap">
              <label htmlFor="deadline"></label>
              <input
                id="deadline"
                type="date"
                {...register("deadline")}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <button type="submit" disabled={!isValid}>
              Create
            </button>
          </form>
        </div>

        <h2 className="tasks-title">Tasks</h2>

        <ul className="list">
          <li className={"headline"}>
            <span>Created</span>
            <span>Title</span>
            <span>Description</span>
            <span>Deadline</span>
            <span>Status</span>
          </li>
          {tasks.map((task) => {
            const date = new Date(task.createdAt).toLocaleDateString("uk-UA");
            const deadline = task.deadline
              ? new Date(task.deadline).toLocaleDateString("uk-UA")
              : "—";
            return (
              <li key={task.id}>
                <span>{date}</span>
                <span>{task.title}</span>
                <span>{task.description}</span>
                <span>{deadline}</span>
                <span>{task.taskStatus}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default CreateTaskForm;
