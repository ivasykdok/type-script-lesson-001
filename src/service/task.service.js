import { Task } from "../models/task.model";
export const addTask = async (data) => {
    return await Task.create(data);
};
export const getAllTasks = async () => {
    return await Task.findAll({});
};
export const fetchTaskById = async (id) => {
    return await Task.findOne({
        where: { id },
    });
};
export const deleteTaskData = async (id) => {
    const deletedRows = await Task.destroy({ where: { id } });
    if (deletedRows === 0) {
        return null;
    }
    return true;
};
export const updateTaskData = async (id, taskData) => {
    const task = await Task.findByPk(id);
    if (!task) {
        throw new Error("User not found");
    }
    await task.update(taskData, { where: { id } });
    return task;
};
//# sourceMappingURL=task.service.js.map