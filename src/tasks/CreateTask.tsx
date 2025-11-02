import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { type CreateTaskData, statuses, taskSchema } from "../types.tsx";

const CreateTask = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors, touchedFields },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: CreateTaskData) => {
    console.log(
      "%c data ",
      "color: white; background-color: #007acc; border-radius: 4px; font-weight: bold;",
      data,
    );
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
