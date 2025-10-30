import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "../api/usersApi.tsx";
import { useNavigate } from "react-router-dom";

const userSchema = z.object({
  firstName: z.string().min(1, "Firs name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email").min(1, "Email is required"),
});

export type CreateUserData = z.infer<typeof userSchema>;

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateUserData>({
    mode: "onTouched",
    resolver: zodResolver(userSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: CreateUserData) => {
    try {
      const user = await createUser(data);

      navigate(`/users/${user.id}`)
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <h1>Create User</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="wrap">
          <label htmlFor="firstName"></label>
          <input
            id={"firstName"}
            type="text"
            {...register("firstName", { required: "Field is required" })}
          />
          <div>{errors.firstName?.message}</div>
        </div>

        <div className="wrap">
          <label htmlFor="lastName"></label>
          <input
            id={"lastName"}
            type="text"
            {...register("lastName", { required: "Field is required" })}
          />
          <div>{errors.lastName?.message}</div>
        </div>

        <div className="wrap">
          <label htmlFor="email"></label>
          <input
            id={"email"}
            type="text"
            {...register("email", { required: "Field is required" })}
          />
          <div>{errors.email?.message}</div>
        </div>

        <button type={"submit"} disabled={!isValid}>
          Create User
        </button>
      </form>
    </div>
  );
};
export default CreateUser;
