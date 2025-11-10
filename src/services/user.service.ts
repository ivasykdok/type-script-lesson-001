import { User } from "../models/user.model.js";

export const fetchAllUsers = async () => {
  const users = await User.findAll({
    include: ["tasks"],
  });
  return users;
};

export const fetchUserById = async (id: number) => {
  const user = await User.findOne({
    where: { id },
    include: ["tasks"],
  });
  return user;
};

export const addUser = async (data: Partial<User>) => {
  const user = await User.create(data);
  return user;
};

export const updateUserData = async (id: number, userData: Partial<User>) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  await user.update(userData, { where: { id } });
  return user;
};

export const deleteUserData = async (id: number) => {
  const deletedRows = await User.destroy({ where: { id } });

  if (deletedRows === 0) {
    return null;
  }

  return true;
};
