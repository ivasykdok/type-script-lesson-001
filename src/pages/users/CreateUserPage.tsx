import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UserCreateData, userCreateSchema } from "./types/User";
import { useNavigate } from "react-router-dom";
import { userApi } from '../../api/usersApi'

const CreateUserPage = () => {
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<UserCreateData>({
    mode: "onTouched",
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = async (data: UserCreateData) => {
    const payload = { ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const newUser = await userApi.createUserData(payload);
    
    console.log(
      "%c newUser ",
      "color: white; background-color: #007acc; border-radius: 4px; font-weight: bold;",
      newUser
    );

    if (newUser) {
      reset();
      navigate("/users");
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>User Data</h2>

        <div className="form-item-wrap">
          <label htmlFor="firstName">First name:</label>
          <input id="firstName" type="text" {...register("firstName")} />
          {errors.firstName && (
            <div className="error">{errors.firstName.message}</div>
          )}
        </div>

        <div className="form-item-wrap">
          <label htmlFor="lastName">Last name:</label>
          <input id="lastName" type="text" {...register("lastName")} />
          {errors.lastName && (
            <div className="error">{errors.lastName.message}</div>
          )}
        </div>

        <div className="form-item-wrap">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && <div className="error">{errors.email.message}</div>}
        </div>

        <button type="submit" disabled={!isValid}>
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateUserPage;
