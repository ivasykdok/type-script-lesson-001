import { useForm } from "react-hook-form";
import api from "../api/apiService.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import {
  type CreateTaskData,
  type CreateTaskPayload,
  statuses,
  priorities,
  taskSchema
} from "../types.tsx";

const CreateTask = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors, touchedFields },
  } = useForm<CreateTaskData>({
    mode: "onTouched",
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: "todo",
    },
  });

  const onSubmit = async (data: CreateTaskData) => {
    const payload: CreateTaskPayload = {
      ...data,
      createdAt: new Date().toISOString(),
      deadline: data.deadline ? new Date(data.deadline).toISOString() : null,
    };

    const result = await api.createTask(payload);

    if (result) {
      reset();
      navigate("/");
    }
  };

  return (
    <div className="create-task">
      <nav>
        <Link className="go-home" to="/">
          Home
        </Link>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="title">Create new task</h2>

        <div
          className={`wrap ${touchedFields.title && errors.title ? "error" : ""}`}
        >
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            {...register("title")}
          />
          {errors.title && (
            <div className="box-error">{errors.title.message}</div>
          )}
        </div>

        <div className="wrap">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            rows={5}
            {...register("description")}
          />
        </div>

        <div className="wrap">
          <label htmlFor="priorities">Priority:</label>
          <select id="priorities" {...register("priority")}>
            {priorities.map((priority, index) => (
              <option key={index} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <div className="wrap">
          <label htmlFor="statuses">Status:</label>
          <select id="statuses" {...register("status")}>
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="wrap">
          <label htmlFor="deadline">Deadline</label>
          <input
            id="deadline"
            type="date"
            {...register("deadline")}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <button className="save" type="submit" disabled={!isValid}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTask;