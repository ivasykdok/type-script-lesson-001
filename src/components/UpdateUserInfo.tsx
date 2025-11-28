import {
  UserCreate,
  type UserCreateData,
  userCreateSchema,
} from "../pages/users/types/User";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userApi } from "../api/usersApi";
import React from "react";

type UpdateUserInfoProps = {
  data: UserCreate;
  setUpdate: (value: boolean) => void;
  setUser: React.Dispatch<React.SetStateAction<UserCreate | null>>;
};

const UpdateUserInfo = ({ data, setUpdate, setUser }: UpdateUserInfoProps) => {
  const id = data.id;

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<UserCreateData>({
    mode: "onTouched",
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    },
  });

  const onSubmit = async (formData: UserCreateData) => {
    try {
      const payload = {
        ...formData,
        createdAt: data.createdAt,
        updatedAt: new Date().toISOString(),
      };

      const updatedUser = await userApi.updateUserInfo(id, payload);

      if (updatedUser) {
        reset(updatedUser);
        setUpdate(false);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const closeUpdateHandler = () => {
    setUpdate(false);
  };

  return (
    <div>
      <h2>Update User Info</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="close" onClick={() => closeUpdateHandler()}>
          X
        </div>
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

export default UpdateUserInfo;
