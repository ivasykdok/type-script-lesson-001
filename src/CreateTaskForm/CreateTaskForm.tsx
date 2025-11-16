import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { createTask, fetchAllTasks } from "../api/createTasksApi.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreateTaskData,
  statuses,
  type Task,
  taskSchema,
} from "../types/Types.tsx";

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
      deadline: data.deadline || undefined,
    });

    if (results.id) {
      await fetchTaskData();
      reset();
    }
  };

  return (
    <>
      <div className={"wrapper"}>
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

            <div
              className={`wrap ${touchedFields.deadline && errors.deadline ? "error" : ""}`}
            >
              <label htmlFor="deadline">Deadline</label>
              <input id="deadline" type="date" {...register("deadline")} />
              {errors.deadline && (
                <div className="box-error">{errors.deadline.message}</div>
              )}
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
