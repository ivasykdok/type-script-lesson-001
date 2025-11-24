import { User } from "../models/user.model.js";
import { Op } from "sequelize";

interface Filters {
  active?: boolean | undefined;
  lastLoginAt?: Date | undefined;
}

export const fetchAllUsers = async (filters?: Filters) => {
  const appliedFilters = {};

  if (filters?.lastLoginAt) {
    const lastLoginAt = new Date(filters.lastLoginAt);

    Object.assign(appliedFilters, {
      lastLoginAt: {
        [Op.gte]: lastLoginAt,
      },
    });
  }

  if (filters?.active) {
    Object.assign(appliedFilters, { active: filters.active });
  }

  const users = await User.findAll({
    where: {
      [Op.and]: {
        ...appliedFilters,
      },
    },

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
