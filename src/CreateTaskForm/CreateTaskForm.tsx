import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  createTask,
  fetchAllTasks,
  type Task,
} from "../api/createTasksApi.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  createdAt: z.string().optional(),
});

export type CreateTaskData = z.infer<typeof taskSchema>;

const CreateTaskForm = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateTaskData>({
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
    });

    if (results.id) {
      await fetchTaskData();
    }

    console.log(
      "%c tasks ",
      "color: white; background-color: #007acc; border-radius: 4px; font-weight: bold;",
      tasks,
    );
  };

  return (
    <>
      <div className="wrapper">
        <div className="insert_data">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="wrap">
              <label htmlFor="title">Title:</label>
              <input
                id={"title"}
                type="text"
                {...register("title", { required: "Field is required" })}
              />
              <div>{errors.title?.message}</div>
            </div>

            <div className="wrap">
              <label htmlFor="description">Description:</label>
              <textarea id={"description"} {...register("description")} />
            </div>

            <button type="submit" disabled={!isValid}>
              Create
            </button>
          </form>
        </div>
        <ul className="list">
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default CreateTaskForm;
