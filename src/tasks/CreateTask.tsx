import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { taskSchema } from "../types.tsx";

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

  return (
    <div className={"create-task"}>
      <nav>
        <Link className={"go-home"} to={"/"}>
          Home
        </Link>
      </nav>

      <form>
        <div className="wrap">
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
      </form>
    </div>
  );
};
export default CreateTask;
