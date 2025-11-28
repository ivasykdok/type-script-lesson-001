import { User, UserCreationAttributes } from "../models/user.model";
import { Op } from "sequelize";

interface Filters {
  active?: boolean;
  lastLoginAt?: Date;
}

export const getAllUsers = async (filters?: Filters) => {
  const appliedFilters: Filters = {};

  if (filters?.active) {
    Object.assign(appliedFilters, { active: filters.active });
  }

  if (filters?.lastLoginAt) {
    Object.assign(appliedFilters, {
      lastLoginAt: {
        [Op.gte]: filters.lastLoginAt,
      },
    });
  }

  return await User.findAll({
    where: {
      [Op.and]: {
        ...appliedFilters,
      },
    },
    include: ["tasks"],
  });
};

export const addUser = async (data: UserCreationAttributes) => {
  return await User.create(data);
};

export const fetchUserById = async (id: number) => {
  const user = await User.findOne({
    where: { id },
    include: ["tasks"],
  });
  return user;
};

export const deleteUserData = async (id: number) => {
  const deletedRows = await User.destroy({ where: { id } });

  if (deletedRows === 0) {
    return null;
  }

  return true;
};

export const updateUserData = async (id: number, userData: Partial<User>) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  await user.update(userData, { where: { id } });
  return user;
};
