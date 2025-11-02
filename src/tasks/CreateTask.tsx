import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import {
  type CreateTaskData,
  type CreateTaskPayload,
  statuses,
  taskSchema,
} from "../types.tsx";
import { ApiController } from "../api/apiController.tsx";

const CreateTask = () => {
  const navigate = useNavigate();
  const api = new ApiController();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors, touchedFields },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: CreateTaskData) => {
    const payload: CreateTaskPayload = {
      ...data,
      createdAt: new Date().toISOString(),
      deadline: data.deadline ? new Date(data.deadline).toISOString() : null,
    };
    const results = await api.createTask(payload);

    if (results) {
      reset();
      navigate("/");
    }
  };

  return (
    <div className={"create-task"}>
      <nav>
        <Link className={"go-home"} to={"/"}>
          Home
        </Link>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={"title"}>Create new task</h2>
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
          <textarea id={"description"} rows={5} {...register("description")} />
        </div>

        <div className="wrap">
          <label htmlFor="statuses">Status:</label>
          <select id="statuses" {...register("status")}>
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
          <label htmlFor="deadline">Deadline</label>
          <input
            id="deadline"
            type="date"
            {...register("deadline")}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <button className={"save"} type="submit" disabled={!isValid}>
          Create
        </button>
      </form>
    </div>
  );
};
export default CreateTask;
