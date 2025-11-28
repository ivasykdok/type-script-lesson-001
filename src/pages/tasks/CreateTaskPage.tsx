import {
  CreateTaskPayload,
  priorities,
  Priority,
  Status,
  statuses,
  TaskCreateData,
  taskCreateSchema,
} from "./types/Task";
import { taskApi } from "../../api/tasksApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const CreateTaskPage = () => {
  const [priority, setPriority] = useState<Priority>("low");
  const [status, setStatus] = useState<Status>("todo");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("userId");
  if (!userId) throw new Error("userId is required in query params");

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TaskCreateData>({
    mode: "onTouched",
    resolver: zodResolver(taskCreateSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: TaskCreateData) => {
    const payload: CreateTaskPayload = {
      ...data,
      userId,
      priority,
      status,
      deadline:
        data.deadline && data.deadline.trim() !== ""
          ? new Date(data.deadline + ":00").toISOString()
          : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newTask = await taskApi.createTaskData(payload);

    if (newTask) {
      reset();
      navigate(`/users/${userId}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Create Task</h1>

        {/* Title */}
        <div className="form-item-wrap">
          <label htmlFor="title">Title:</label>
          <input id="title" type="text" {...register("title")} />
          {errors.title && <div className="error">{errors.title.message}</div>}
        </div>

        {/* Description */}
        <div className="form-item-wrap">
          <label htmlFor="description">Description:</label>
          <textarea id="description" {...register("description")} />
          {errors.description && (
            <div className="error">{errors.description.message}</div>
          )}
        </div>

        {/* Priority */}
        <div className="form-item-wrap">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="form-item-wrap">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Deadline */}
        <div className="form-item-wrap">
          <label htmlFor="deadline">Deadline:</label>
          <input
            id="deadline"
            type="datetime-local"
            {...register("deadline")}
          />
          {errors.deadline && (
            <div className="error">{errors.deadline.message}</div>
          )}
        </div>

        <button type="submit" disabled={!isValid}>
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateTaskPage;
