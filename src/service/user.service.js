import { User } from "../models/user.model";
import { Op } from "sequelize";
export const getAllUsers = async (filters) => {
    const appliedFilters = {};
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
export const addUser = async (data) => {
    return await User.create(data);
};
export const fetchUserById = async (id) => {
    const user = await User.findOne({
        where: { id },
        include: ["tasks"],
    });
    return user;
};
export const deleteUserData = async (id) => {
    const deletedRows = await User.destroy({ where: { id } });
    if (deletedRows === 0) {
        return null;
    }
    return true;
};
export const updateUserData = async (id, userData) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error("User not found");
    }
    await user.update(userData, { where: { id } });
    return user;
};
//# sourceMappingURL=user.service.js.map